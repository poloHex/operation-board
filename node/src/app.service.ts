/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiStatus(): string {
    return 'API is up and running!';
  }
}
