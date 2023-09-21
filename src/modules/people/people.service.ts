import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Model } from 'mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Person } from './entities/person.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel(Event.name, DATABASE_CONNECTION_NAME)
    private readonly personModel: Model<Person>,
  ) {}

  create(createPersonDto: CreatePersonDto) {
    return 'This action adds a new person';
  }

  upsert(createPersonDto: CreatePersonDto) {
    return 'This action adds or update a new person';
  }

  findAll() {
    return `This action returns all people`;
  }

  async findOne(id: string) {
    try {
      const foundPerson = await this.personModel.findById(id).exec();
      console.log(foundPerson);
      return foundPerson;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
