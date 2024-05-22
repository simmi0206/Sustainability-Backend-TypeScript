import { Injectable } from '@nestjs/common';
import { EmissionFactor } from './dto/EmissionFactor';
import { EmissionFactorDatabase } from '../utils/database/EmissionFactorDatabase';

@Injectable()
export class ImportEmissionFactorService {
  async importEmissionFactors(emissionFactors: Array<EmissionFactor>) {
    const emissionFactorDatabase = new EmissionFactorDatabase();
    return emissionFactorDatabase.importEmissionFactor(emissionFactors);
  }
}
