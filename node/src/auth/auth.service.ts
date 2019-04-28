/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.dto';
import { User, UserDto } from '../user/user.schema';
import { CryptoService } from './crypto.service';
import config from '../config';
import { SignUp } from './interfaces/signUp.dto';
import { ResetPassword } from './interfaces/reset-password.dto';
import { EmailService } from '../core/email.service';
import { Token } from './interfaces/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  private getTokenPayload(user: User | UserDto): JwtPayload {
    return {
      email: user.email,
      role: user.role,
      id: user.id,
    };
  }

  public async signUp(userDto: SignUp): Promise<Token> {

    return await this.userService.findByEmail(userDto.email)
      .then(existingUser => {
        if (existingUser && existingUser.id) {
          throw new Error('User with this email already exists');
        }
        const password = this.cryptoService.hashPassword(userDto.password);
        const user = {
          email: userDto.email,
          login: userDto.fullName,
          password: password.hash,
          salt: password.salt,
          role: 'user',
        };

        const expiresIn = config.auth.jwt.ttl;
        return this.userService.create(user)
          .then(newUser => {
            const token = this.jwtService.sign(this.getTokenPayload(newUser), { expiresIn });
            return { token };
          });
      });
  }

  public async signIn(user): Promise<Token> {
    const expiresIn = config.auth.jwt.ttl;
    const token = this.jwtService.sign(this.getTokenPayload(user), { expiresIn });
    return { token };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findByEmail(payload.email);
  }

  // used in local auth strategy
  public async logIn(email, password) {
    return await this.userService.findByEmail(email)
      .then( user => {
        if (user && user.id) {
          return this.cryptoService.checkPassword(user.password, user.salt, password)
            ? Promise.resolve(user)
            : Promise.reject(new UnauthorizedException('Invalid username or password'));
        } else {
         return Promise.reject(new UnauthorizedException('Invalid username or password'));
        }
      })
      .catch(err => Promise.reject(err));
  }

  public async resetPassword(resetPassword: ResetPassword) {
    if (resetPassword.password.length < 6) {
      throw new Error('Password should be longer than 6 characters');
    }

    if (resetPassword.password !== resetPassword.confirmPassword) {
      throw new Error('Password and its confirmation do not match.');
    }

    if (!resetPassword.reset_password_token) {
      throw new Error('Reset password token is missing or invalid');
    }

    const tokenContent = this.cryptoService.decipherResetPasswordToken(resetPassword.reset_password_token);
    if (new Date().getTime() > tokenContent.valid) {
      throw new Error('Reset password token has expired.');
    }

    const password = this.cryptoService.hashPassword(resetPassword.password);
    return this.userService.changePassword(tokenContent.id, password.salt, password.hash);
  }

  public async requestPassword(email: string) {
    await this.userService.findByEmail(email)
      .then(user => {
        if (user && user.id) {
          const resetPasswordToken = this.cryptoService.generateResetPasswordToken(user.id);
          return this.emailService.sendResetPasswordEmail(
            email, `${user.firstName} ${user.lastName}`, resetPasswordToken);
        }
        throw new Error('There is no such email in the system');
      });
  }
}
