/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the project root for license information on type of purchased license.
 */

import * as dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });

export default {
  api: {
    port: process.env.PORT,
    root: process.env.API_ROOT,
    useSwagger: process.env.USE_SWAGGER && process.env.USE_SWAGGER.toLowerCase() === 'true' || false,
    useCompression: process.env.USE_COMPRESSION && process.env.USE_COMPRESSION.toLowerCase() === 'true' || false,
  },

  frontEnd: {
    domain: process.env.FRONTEND_DOMAIN,
  },

  auth: {
    jwt: {
      secret: process.env.AUTH_JWT_SECRET,
      ttl: process.env.AUTH_TTL || '1d',
    },
    password: {
      secret: process.env.AUTH_RESET_SECRET,
      ttl: process.env.AUTH_RESET_TTL || '1d',
    },
  },

  db: {
    url: process.env.MONGO_DB_URL,
    name: process.env.MONGO_DB_NAME,
  },

  logger: {
    console: {
      level: process.env.LOGGER_LEVEL || 'debug',
    },
    file: {
      logDir: process.env.LOGGER_DIR || 'logs',
      logFile: process.env.LOGGER_FILE || 'bundle_node.log',
      level: process.env.LOGGER_LEVEL || 'debug',
      maxsize: process.env.LOGGER_MAX_SIZE ? parseInt(process.env.LOGGER_MAX_SIZE, 10) : 1024 * 1024 * 10, // 10MB
      maxFiles: process.env.LOGGER_MAX_FILES ? parseInt(process.env.LOGGER_MAX_FILES, 10) : 5,
    },
  },
};
