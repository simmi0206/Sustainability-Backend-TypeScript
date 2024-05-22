import { Test, TestingModule } from '@nestjs/testing';
import { CreateMaterialDatabaseController } from './create-material-database.controller';
import { CreateMaterialDatabaseService } from './create-material-database.service';

describe('CreateMaterialDatabaseController', () => {
  let controller: CreateMaterialDatabaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateMaterialDatabaseController],
      providers: [CreateMaterialDatabaseService],
    }).compile();

    controller = module.get<CreateMaterialDatabaseController>(
      CreateMaterialDatabaseController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
