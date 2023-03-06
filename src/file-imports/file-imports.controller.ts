import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileImportsService } from './file-imports.service';
import { CreateFileImportDto } from './dto/create-file-import.dto';
import { UpdateFileImportDto } from './dto/update-file-import.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file-imports')
export class FileImportsController {
  constructor(private readonly fileImportsService: FileImportsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { dest: './files-to-import' }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFileImportDto: CreateFileImportDto,
  ) {
    return await this.fileImportsService.create({
      filePath: file.path,
      ...createFileImportDto,
    });
  }

  @Get()
  findAll() {
    return this.fileImportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileImportsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileImportDto: UpdateFileImportDto,
  ) {
    return this.fileImportsService.update(+id, updateFileImportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileImportsService.remove(+id);
  }
}
