import { Test, TestingModule } from '@nestjs/testing';
import { GetRecommendationController } from './get-recommendation.controller';
import { GetRecommendationService } from './get-recommendation.service';

describe('GetRecommendationController', () => {
  let controller: GetRecommendationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetRecommendationController],
      providers: [GetRecommendationService],
    }).compile();

    controller = module.get<GetRecommendationController>(GetRecommendationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
