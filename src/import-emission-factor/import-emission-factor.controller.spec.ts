import { Test, TestingModule } from '@nestjs/testing';
import { ImportEmissionFactorController } from './import-emission-factor.controller';
import { ImportEmissionFactorService } from './import-emission-factor.service';

describe('ImportEmissionFactorController', () => {
  let controller: ImportEmissionFactorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportEmissionFactorController],
      providers: [ImportEmissionFactorService],
    }).compile();

    controller = module.get<ImportEmissionFactorController>(ImportEmissionFactorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
