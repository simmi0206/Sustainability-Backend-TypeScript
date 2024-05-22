import { Test, TestingModule } from '@nestjs/testing';
import { ImportMaterialController } from './import-material.controller';
import { ImportMaterialService } from './import-material.service';

describe('ImportMaterialController', () => {
  let controller: ImportMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportMaterialController],
      providers: [ImportMaterialService],
    }).compile();

    controller = module.get<ImportMaterialController>(ImportMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
