import { Test, TestingModule } from '@nestjs/testing';
import { GetRecommendationService } from './get-recommendation.service';

describe('GetRecommendationService', () => {
  let service: GetRecommendationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetRecommendationService],
    }).compile();

    service = module.get<GetRecommendationService>(GetRecommendationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
