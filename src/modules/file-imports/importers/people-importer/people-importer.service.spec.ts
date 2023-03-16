import { Test, TestingModule } from '@nestjs/testing';
import { PeopleImporterService } from './people-importer.service';

describe('PeopleImporterService', () => {
  let service: PeopleImporterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeopleImporterService],
    }).compile();

    service = module.get<PeopleImporterService>(PeopleImporterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
