import { PeopleService } from './../../people/people.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '../entities/event.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import { plainToInstance } from 'class-transformer';
import { PeriodsService } from './periods/periods.service';
import { FindAllEventsDto } from '../dto/find-all-events.dto';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectModel(Event.name, DATABASE_CONNECTION_NAME)
    private readonly eventModel: Model<Event>,
    private readonly periodsService: PeriodsService,
    private readonly peopleService: PeopleService,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    try {
      // TODO: Categorize events
      // TODO: use real periods

      const eventToCreate = plainToInstance(CreateEventDto, createEventDto);

      await this.validate(eventToCreate);

      const createdEvent = await this.eventModel.create(eventToCreate);

      return createdEvent;
    } catch (error) {
      throw error;
    }
  }

  async validate(event: CreateEventDto) {
    // TODO: add logs

    try {
      const { period, centralizers } = event;

      this.periodsService.validate(period);

      for (const centralizerId of centralizers) {
        const centralizer = await this.peopleService.findOne(centralizerId);

        if (!centralizer) {
          throw new BadRequestException(
            `centralizerId [${centralizerId}] not found`,
          );
        }
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  async findAll(findAllEventsDto: FindAllEventsDto): Promise<Event[]> {
    // TODO: add sort key and filters

    let { limit, page } = findAllEventsDto;

    limit = limit == 0 ? 10 : limit;

    page = page == 0 ? 1 : page;

    try {
      return await this.eventModel
        .find()
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
    } catch (error) {
      const { message } = error as Error;
      this.logger.error(`Internal server error: ${message}`);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<Event> {
    try {
      return await this.eventModel.findById(id).exec();
    } catch (error) {
      const { message } = error as Error;
      this.logger.error(`Internal server error: ${message}`);
      throw new InternalServerErrorException();
    }
  }

  async count(): Promise<number> {
    try {
      return await this.eventModel.countDocuments().exec();
    } catch (error) {
      const { message } = error as Error;
      this.logger.error(`Internal server error: ${message}`);
      throw new InternalServerErrorException();
    }
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
