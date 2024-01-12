import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { MaritalStatusesTypesEnum } from '../constants/marital-statuses-types.enum';
import { SexTypesEnum } from '../constants/sex-types.enum';

export class CreateStreetAddressDto {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  @Type(() => String)
  postCode: string;

  @IsString()
  country: string;
}

export class CreatePersonDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  @IsOptional()
  nickname: string;

  @IsString()
  idCardType: string;

  @IsString()
  @Type(() => String)
  idCard: string;

  @IsEnum(SexTypesEnum)
  @IsOptional()
  sex: SexTypesEnum;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  birthDate: Date;

  @IsEnum(MaritalStatusesTypesEnum)
  @IsOptional()
  maritalStatus: MaritalStatusesTypesEnum;

  @IsString()
  @IsOptional()
  nationality: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateStreetAddressDto)
  address: CreateStreetAddressDto;

  @IsString()
  @Type(() => String)
  phoneNumber: string;

  @IsOptional()
  @IsString()
  studiesAchieved: string;

  @IsOptional()
  @IsString()
  work: string;

  @IsOptional()
  @IsString()
  ecclesiasticalStatus: string;

  @IsOptional()
  @IsString()
  diocese: string;

  @IsOptional()
  @IsString()
  religiousStudies: string;

  @IsOptional()
  @IsString()
  otherRelgiousGroups: string;

  @IsOptional()
  @IsString()
  otherSocialAction: string;
}
