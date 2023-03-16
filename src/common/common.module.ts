import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import configs from 'src/configs';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseOptionsService } from 'src/common/database/services/database.options.service';
import { DatabaseOptionsModule } from 'src/common/database/database.options.module';
import {
  APP_LANGUAGE,
  ENUM_APP_ENVIRONMENT,
} from 'src/app/constants/app.constant';
import { ENUM_MESSAGE_LANGUAGE } from './message/constants/message.constant';
import { DATABASE_CONNECTION_NAME } from './database/constants/database.constant';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
      validationSchema: Joi.object({
        APP_NAME: Joi.string().required(),
        APP_ENV: Joi.string()
          .valid(...Object.values(ENUM_APP_ENVIRONMENT))
          .default('development')
          .required(),
        APP_LANGUAGE: Joi.string()
          .valid(...Object.values(ENUM_MESSAGE_LANGUAGE))
          .default(APP_LANGUAGE)
          .required(),

        DATABASE_HOST: Joi.string()
          .default('mongodb://localhost:27017')
          .required(),
        DATABASE_NAME: Joi.string().default('ack').required(),
        DATABASE_USER: Joi.string().allow(null, '').optional(),
        DATABASE_PASSWORD: Joi.string().allow(null, '').optional(),
        DATABASE_DEBUG: Joi.boolean().default(false).required(),
        DATABASE_OPTIONS: Joi.string().allow(null, '').optional(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    MongooseModule.forRootAsync({
      connectionName: DATABASE_CONNECTION_NAME,
      imports: [DatabaseOptionsModule],
      inject: [DatabaseOptionsService],
      useFactory: (databaseOptionsService: DatabaseOptionsService) =>
        databaseOptionsService.createOptions(),
    }),
  ],
})
export class CommonModule {}
