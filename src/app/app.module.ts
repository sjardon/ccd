import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileImportsModule } from '../modules/file-imports/file-imports.module';
import { PeopleModule } from '../modules/people/people.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot('mongodb://localhost/nest'), //TODO: Set db env var from configService here
    FileImportsModule,
    PeopleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
