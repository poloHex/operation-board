/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDto } from './user.schema';
import { Address, AddressDto } from './address.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  public async create(user: any): Promise<UserDto> {
    const createdUser = new this.userModel(user);
    return await createdUser.save()
      .then(result => UserService.mapUserToDto(result));
  }

  public async findById(id: string): Promise<UserDto> {
    return await this.userModel.findById(id).exec()
      .then(user => UserService.mapUserToDto(user));
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email }).exec()
      .then((user: any) => UserService.mapUser(user));
  }

  public async edit(id: string, user: User): Promise<UserDto> {
    return await this.userModel.updateOne(
      { _id: id }, user, { upsert: true  }).exec()
      .then(() => UserService.mapUserToDto(user)); // mongoose will not return updated object
  }

  public async delete(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id }).exec();
  }

  public async findAll(): Promise<UserDto[]> {
    return await this.userModel.find().exec()
      .then((result: any) => result.map(u => UserService.mapUserToDto(u)));
  }

  public async changePassword(id: string, salt: string, password: string): Promise<void> {
    await this.userModel.updateOne({ _id: id }, { $set: { salt, password } });
  }

  // for internal usage only
  private static mapUser(user: User): User | undefined {
    if (user) {
      user.id = user._id;
    }
    return user;
  }

  private static mapUserToDto(user: User): UserDto | undefined {
    return user ? {
      id: user._id || user.id,
      login: user.login,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      role: user.role,
      address: UserService.mapAddressToDto(user.address),
    } : undefined;
  }

  private static mapAddressToDto(address: Address): AddressDto {
    return address ? {
      city: address.city,
      street: address.street,
      zipCode: address.zipCode,
    } : {
      city: '',
      street: '',
      zipCode: '',
    };
  }
}
