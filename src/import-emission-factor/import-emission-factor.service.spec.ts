import { Test, TestingModule } from '@nestjs/testing';
import { ImportEmissionFactorService } from './import-emission-factor.service';

describe('ImportEmissionFactorService', () => {
  let service: ImportEmissionFactorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportEmissionFactorService],
    }).compile();

    service = module.get<ImportEmissionFactorService>(ImportEmissionFactorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
