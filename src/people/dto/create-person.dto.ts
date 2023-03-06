import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SexTypesEnum } from '../../file-imports/enums/sex-types.enum';
import { EcclesiasticalStatesTypesEnum } from '../../file-imports/enums/ecclesiastical-states-types.enum';
import { MaritalStatusesTypesEnum } from '../../file-imports/enums/marital-statuses-types.enum';

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
  ecclesiasticalState: string;

  @IsString()
  diocese: string;

  @IsString()
  religiousStudies: string;

  @IsString()
  otherRelgiousGroups: string;

  @IsString()
  otherSocialAction: string;
}
