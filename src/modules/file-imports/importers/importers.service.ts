import { Injectable } from '@nestjs/common';
import { FileImportTypesEnum } from '../constants/file-import-types.enum';
import { PeopleImporterService } from './people-importer/people-importer.service';

export type ImporterImportDto = {
  type: FileImportTypesEnum;
  data: Array<any>;
};

@Injectable()
export class ImportersService {
  // DOMAIN: Create entities, check if exists, save or update, check if are some error.

  constructor(private peopleImporterService: PeopleImporterService) {}

  async import({ type, data }: ImporterImportDto) {
    if (type == FileImportTypesEnum.PEOPLE) {
      return await this.importPeople(data);
    }
  }

  importPeople(data: any[]) {
    return this.peopleImporterService.import(data);
  }
}
