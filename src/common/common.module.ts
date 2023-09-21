import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configs from 'src/configs';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseOptionsService } from 'src/common/database/services/database.options.service';
import { DatabaseOptionsModule } from 'src/common/database/database.options.module';
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
