/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { Schema, Document } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export const AddressSchema = new Schema({
  city: String,
  street: String,
  zipCode: String,
});

export interface Address extends Document {
  city: string;
  street: string;
  zipCode: string;
}

export class AddressDto {
  @ApiModelProperty()
  city: string;

  @ApiModelProperty()
  street: string;

  @ApiModelProperty()
  zipCode: string;
}
