/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck(): string {
    return this.appService.getApiStatus();
  }
}
