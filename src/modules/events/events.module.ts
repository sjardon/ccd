import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { EventsController } from './controllers/events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema, Event } from './entities/event.entity';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import { PeriodsService } from './services/periods/periods.service';
import { PeopleModule } from '../people/people.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService, PeriodsService],
  imports: [
    MongooseModule.forFeature(
      [{ name: Event.name, schema: EventSchema }],
      DATABASE_CONNECTION_NAME,
    ),
    PeopleModule,
  ],
})
export class EventsModule {}
