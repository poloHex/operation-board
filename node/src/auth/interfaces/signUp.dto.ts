/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { ApiModelProperty } from '@nestjs/swagger';
import { Login } from './login.dto';

export class SignUp extends Login {
  @ApiModelProperty()
  fullName: string;

  @ApiModelProperty()
  confirmPassword: string;
}
