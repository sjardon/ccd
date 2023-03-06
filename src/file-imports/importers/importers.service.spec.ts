import { Test, TestingModule } from '@nestjs/testing';
import { ImportersService } from './importers.service';

describe('ImportersService', () => {
  let service: ImportersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportersService],
    }).compile();

    service = module.get<ImportersService>(ImportersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
