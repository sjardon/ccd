import { Module } from '@nestjs/common';
import { PeopleModule } from 'src/modules/people/people.module';
import { PeopleImporterService } from './people-importer.service';

@Module({
  providers: [PeopleImporterService],
  exports: [PeopleImporterService],
  imports: [PeopleModule],
})
export class PeopleImporterModule {}
