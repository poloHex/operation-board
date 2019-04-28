/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WinstonLogger } from './core/logger.service';
import config from './config';

import * as compression from 'compression';

function initSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('Nest Node Starter API')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth('Authentication', 'header')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: console,
    logger: new WinstonLogger(),
    cors: true,
  });
  // app.enableCors();
  if (config.api.useSwagger) {
    initSwagger(app);
  }

  if (config.api.useCompression) {
    app.use(compression());
  }

  await app.listen(config.api.port);
}

bootstrap();
