import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
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
  nickname: string;

  @IsString()
  identityCardType: string;

  @IsString()
  @Type(() => String)
  identityCard: string;

  @IsEnum(SexTypesEnum)
  sex: SexTypesEnum;

  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @IsEnum(MaritalStatusesTypesEnum)
  maritalStatus: string;

  @IsString()
  nationality: string;

  @ValidateNested()
  @Type(() => CreateStreetAddressDto)
  address: CreateStreetAddressDto;

  @IsString()
  @Type(() => String)
  phoneNumber: string;

  @IsString()
  studiesAchieved: string;

  @IsString()
  work: string;

  @IsString()
  ecclesiasticalStatus: string;

  @IsString()
  diocese: string;

  @IsString()
  religiousStudies: string;

  @IsString()
  otherRelgiousGroups: string;

  @IsString()
  otherSocialAction: string;
}
