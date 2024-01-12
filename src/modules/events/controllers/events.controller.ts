import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { FindAllEventsDto } from '../dto/find-all-events.dto';
import { Event } from '../entities/event.entity';
import { CustomGetResponse } from '../../../common/response/interfaces/custom-get-response.interface';
import { CustomGetPaginatedResponse } from 'src/common/response/interfaces/custom-get-paginated-response.interface';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return await this.eventsService.create(createEventDto);
  }

  @Get()
  async findAll(
    @Query() findAllEventsDto: FindAllEventsDto,
  ): Promise<CustomGetPaginatedResponse<Event[]>> {
    let { limit, page } = findAllEventsDto;

    limit = limit == 0 ? 10 : limit;

    page = page == 0 ? 1 : page;

    const events = await this.eventsService.findAll(findAllEventsDto);
    const count = await this.eventsService.count();

    const lastPage = Math.floor((count - 1) / limit) + 1;
    const nextPage = page + 1 <= lastPage ? page + 1 : null;

    return {
      data: events,
      nextPage,
      lastPage,
      limit,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CustomGetResponse<Event>> {
    const event = await this.eventsService.findOne(id);

    return {
      data: event,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
