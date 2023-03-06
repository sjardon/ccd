import { Module } from '@nestjs/common';
import { FileImportsService } from './file-imports.service';
import { FileImportsController } from './file-imports.controller';
import { ImportersService } from './importers/importers.service';
import { PeopleImporterService } from './importers/people-importer/people-importer.service';

@Module({
  controllers: [FileImportsController],
  providers: [FileImportsService, ImportersService, PeopleImporterService]
})
export class FileImportsModule {}
