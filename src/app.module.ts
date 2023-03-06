import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileImportsModule } from './file-imports/file-imports.module';
import { PeopleModule } from './people/people.module';

@Module({
  imports: [FileImportsModule, PeopleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
