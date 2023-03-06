import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, validateSync } from 'class-validator';
import { CreatePersonDto } from 'src/people/dto/create-person.dto';

const mapToPersonDto = {
  email: (data) => data[1],
  name: (data) => data[2],
  surname: (data) => data[3],
  nickname: (data) => data[4],
  sex: (data) => data[5],
  identityCardType: (data) => data[6],
  identityCard: (data) => data[7],
  birthDate: (data) => data[9],
  maritalStatus: (data) => data[10],
  nationality: (data) => data[11],
  address: (data) => {
    return {
      address: data['12'],
      postCode: data['13'],
      city: data['14'],
      state: data['15'],
      country: data['16'],
    };
  },
  phoneNumber: (data) => data['17'],
  studiesAchieved: (data) => data['18'],
  work: (data) => data['19'],
  ecclesiasticalState: (data) => data['21'],
  diocese: (data) => data['22'],
  religiousStudies: (data) => data['23'],
  otherRelgiousGroups: (data) => data['24'],
  otherSocialAction: (data) => data['25'],
};

@Injectable()
export class PeopleImporterService {
  async import(importPeopleDto: any[]) {
    try {
      const createPeopleDtoArray = importPeopleDto.map((person) =>
        this.mapImportedToDto(person),
      );

      await this.validateCreatePeopleDtoArray(createPeopleDtoArray);

      return createPeopleDtoArray;
    } catch (error) {
      throw error;
    }
  }

  private mapImportedToDto(person: any): CreatePersonDto {
    const mappedObject = {};

    for (const key in mapToPersonDto) {
      mappedObject[key] = mapToPersonDto[key](person);
    }

    return plainToInstance(CreatePersonDto, mappedObject);
  }

  private async validateCreatePeopleDtoArray(
    createPeopleDtoArray: CreatePersonDto[],
  ) {
    const validationErrors = [];

    for (const createPeopleDto of createPeopleDtoArray) {
      const currentValidationErrors = await validate(createPeopleDto, {
        validationError: { target: false },
      });

      if (currentValidationErrors.length > 0) {
        validationErrors.push(currentValidationErrors);
      }
    }

    if (validationErrors.length > 0) {
      throw validationErrors;
    }
  }
}
