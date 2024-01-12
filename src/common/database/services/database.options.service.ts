import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { ENUM_APP_ENVIRONMENT } from 'src/app/constants/app.constant';

@Injectable()
export class DatabaseOptionsService {
  private readonly host: string;
  private readonly database: string;
  private readonly user: string;
  private readonly password: string;
  private readonly debug: boolean;
  private readonly options: string;
  private readonly env: string;

  constructor(private readonly configService: ConfigService) {
    this.env = this.configService.get<string>('app.env');
    this.host = this.configService.get<string>('database.host');
    this.database = this.configService.get<string>('database.name');
    this.user = this.configService.get<string>('database.user');
    this.password = this.configService.get<string>('database.password');
    this.debug = this.configService.get<boolean>('database.debug');

    this.options = this.configService.get<string>('database.options')
      ? `?${this.configService.get<string>('database.options')}`
      : '';
  }

  createOptions(): MongooseModuleOptions {
    let auth = '';
    let database = '';

    if (this.user && this.password) {
      auth = `${this.user}:${this.password}@`;
    }
    if (this.database) {
      database = `/${this.database}`;
    }

    let uri = `mongodb://${auth}${this.host}${database}`;

    if (this.env !== ENUM_APP_ENVIRONMENT.PRODUCTION) {
      mongoose.set('debug', this.debug);
    }

    const mongooseOptions: MongooseModuleOptions = {
      uri,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      autoCreate: true,
      // useMongoClient: true,
    };
    return mongooseOptions;
  }
}
