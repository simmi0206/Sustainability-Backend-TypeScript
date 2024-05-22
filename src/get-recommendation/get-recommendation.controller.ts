import { Controller, Get, Param } from '@nestjs/common';
import { GetRecommendationService } from './get-recommendation.service';

@Controller('getRecommendation')
export class GetRecommendationController {
  constructor(
    private readonly getRecommendationService: GetRecommendationService,
  ) {}

  @Get(':materialId')
  async getQuotation(@Param('materialId') materialId: string) {
    try {
      return await this.getRecommendationService.getRecommendation(materialId);
    } catch (error) {
      return error;
    }
  }
}
