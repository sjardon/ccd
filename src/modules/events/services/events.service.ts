import { PeopleService } from './../../people/people.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '../entities/event.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import { plainToClass, plainToInstance } from 'class-transformer';
import { PeriodsService } from './periods/periods.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name, DATABASE_CONNECTION_NAME)
    private readonly eventModel: Model<Event>,
    private readonly periodsService: PeriodsService,
    private readonly peopleService: PeopleService,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    try {
      const eventToCreate = plainToInstance(CreateEventDto, createEventDto);

      await this.validate(eventToCreate);

      const createdEvent = await this.eventModel.create(eventToCreate);

      return createdEvent;
    } catch (error) {
      throw error;
    }
  }

  async validate(event: CreateEventDto) {
    try {
      const { period, centralizers } = event;

      this.periodsService.validate(period);

      for (let centralizerId of centralizers) {
        const centralizer = await this.peopleService.findOne(centralizerId);
        throw new BadRequestException(
          `centralizerId [${centralizerId}] not found`,
        );
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all events`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
