import { Module } from '@nestjs/common';
import { GetRecommendationService } from './get-recommendation.service';
import { GetRecommendationController } from './get-recommendation.controller';

@Module({
  controllers: [GetRecommendationController],
  providers: [GetRecommendationService]
})
export class GetRecommendationModule {}
