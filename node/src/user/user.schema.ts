/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { Schema, Document } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';
import { Address, AddressDto, AddressSchema } from './address.schema';

export const UserSchema = new Schema({
  password: String,
  salt: String,
  login: String,
  email: String,
  age: Number,
  firstName: String,
  lastName: String,
  address: AddressSchema,
  role: {
    type: String,
    enum: ['admin', 'user'],
  },
});

export interface User extends Document {
  id?: string;
  password?: string;
  salt?: string;

  login: string;
  email: string;
  age?: number;
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'user';
  address?: Address;
}

// used as controller output or DTO class to make swagger documentation working
export class UserDto {
  id?: string;

  @ApiModelProperty()
  login: string;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  age?: number;

  @ApiModelProperty()
  firstName?: string;

  @ApiModelProperty()
  lastName?: string;

  @ApiModelProperty()
  role: 'admin' | 'user';

  @ApiModelProperty()
  address?: AddressDto;
}
