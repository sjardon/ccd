import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EventCategoryEnum } from '../constants/event-category.enum';
import { Transform, Type } from 'class-transformer';
import { IsObjectIdString } from 'src/common/decorators/validation-decorators/is-object-id-string.decorator';

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
  @IsEnum(EventCategoryEnum)
  category: EventCategoryEnum;

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
  @IsObjectIdString({ each: true })
  centralizers: string[];
}
