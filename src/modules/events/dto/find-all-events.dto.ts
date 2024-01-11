import { IsInt, IsOptional } from 'class-validator';

export class FindAllEventsDto {
  @IsOptional()
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @IsInt()
  limit?: number = 10;
}
