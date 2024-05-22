import { Test, TestingModule } from '@nestjs/testing';
import { ImportMaterialService } from './import-material.service';

describe('ImportMaterialService', () => {
  let service: ImportMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportMaterialService],
    }).compile();

    service = module.get<ImportMaterialService>(ImportMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
