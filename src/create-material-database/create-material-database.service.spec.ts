import { Test, TestingModule } from '@nestjs/testing';
import { CreateMaterialDatabaseService } from './create-material-database.service';

describe('CreateMaterialDatabaseService', () => {
  let service: CreateMaterialDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateMaterialDatabaseService],
    }).compile();

    service = module.get<CreateMaterialDatabaseService>(
      CreateMaterialDatabaseService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
