import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from '../modules/people/people.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';
import { EventsModule } from 'src/modules/events/events.module';

@Module({
  imports: [CommonModule, ConfigModule, PeopleModule, EventsModule],
  exports: [CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
