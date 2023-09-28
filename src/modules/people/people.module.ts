import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from './entities/person.entity';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';

@Module({
  controllers: [PeopleController],
  providers: [PeopleService],
  exports: [PeopleService],
  imports: [
    MongooseModule.forFeature(
      [{ name: Person.name, schema: PersonSchema }],
      DATABASE_CONNECTION_NAME,
    ),
  ],
})
export class PeopleModule {}
