import { Injectable } from '@nestjs/common';
import { fileToJson } from 'src/utils/file-to-json';
import { UpdateFileImportDto } from './dto/update-file-import.dto';
import { FileImport } from './entities/file-import.entity';
import { ImportersService } from './importers/importers.service';

@Injectable()
export class FileImportsService {
  constructor(private importersService: ImportersService) {}
  // TODO: Change entity to DTO
  // TODO: Change builder and importers to services
  async create(fileImport: FileImport) {
    try {
      const data = fileToJson(fileImport.filePath);
      const { type } = fileImport;

      // importer -> generate dto -> create entity -> save or update (by the service of each entity).

      return await this.importersService.import({ type, data });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  findAll() {
    return `This action returns all fileImports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileImport`;
  }

  update(id: number, updateFileImportDto: UpdateFileImportDto) {
    return `This action updates a #${id} fileImport`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileImport`;
  }
}
