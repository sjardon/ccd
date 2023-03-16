import { Module } from '@nestjs/common';
import { ImportersService } from './importers.service';
import { PeopleImporterModule } from './people-importer/people-importer.module';

@Module({
  providers: [ImportersService],
  imports: [PeopleImporterModule],
  exports: [ImportersService],
})
export class ImportersModule {}
