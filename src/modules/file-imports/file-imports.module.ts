import { Module } from '@nestjs/common';
import { FileImportsService } from './file-imports.service';
import { FileImportsController } from './file-imports.controller';
import { PeopleModule } from '../people/people.module';
import { ImportersModule } from './importers/importers.module';

@Module({
  controllers: [FileImportsController],
  providers: [FileImportsService],
  imports: [PeopleModule, ImportersModule],
})
export class FileImportsModule {}
