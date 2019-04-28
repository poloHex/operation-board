/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WinstonModule } from 'nest-winston';
import config from './config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(config.db.url),
    WinstonModule.forRoot({
      level: config.logger.file.level,
    }),
    // MailerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
