import { Person } from 'src/people/entities/person.entity';
import { Importer } from '../importer.interface';

export class PersonImporter implements Importer {
  import(peopleToImportDto): Person[] {
    return [new Person()];
  }
}
