import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Model } from 'mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Person } from './entities/person.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel(Person.name, DATABASE_CONNECTION_NAME)
    private readonly personModel: Model<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    try {
      await this.validate(createPersonDto);

      const createdEvent = await this.personModel.create(createPersonDto);

      return createdEvent;
    } catch (error) {
      throw error;
    }
  }

  async validate(createPersonDto: CreatePersonDto) {
    try {
      const { email, idCard } = createPersonDto;

      const existsPerson = await this.personModel.exists({
        $or: [{ email }, { idCard }],
      });

      if (existsPerson) {
        throw new BadRequestException(`Person already exists`);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  upsert(createPersonDto: CreatePersonDto) {
    return 'This action adds or update a new person';
  }

  async findAll() {
    return await this.personModel.find();
  }

  async findOne(id: string) {
    try {
      const foundPerson = await this.personModel.findById(id).exec();

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
