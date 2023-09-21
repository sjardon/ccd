import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EventTypesEnum } from '../constants/event-types.enum';
import { Transform, Type } from 'class-transformer';

export class CreatePeriodDto {
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  startTime: Date;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  endTime: Date;
}

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(EventTypesEnum)
  type: EventTypesEnum;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreatePeriodDto)
  period: CreatePeriodDto;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  place: string;

  @IsArray()
  @IsString({ each: true })
  centralizers: string[];
}
