import { Injectable } from '@nestjs/common';
import { EmissionFactorDatabase } from '../utils/database/EmissionFactorDatabase';

@Injectable()
export class GetRecommendationService {
  async getRecommendation(materialId: string) {
    const emissionFactorDatabase = new EmissionFactorDatabase();
    return emissionFactorDatabase.getRecommendation(materialId);
  }
}
