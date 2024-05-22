import { Body, Controller, Post } from '@nestjs/common';
import { ImportEmissionFactorService } from './import-emission-factor.service';
import { EmissionFactor } from './dto/EmissionFactor';

@Controller('importEmissionFactor')
export class ImportEmissionFactorController {
  constructor(
    private readonly importEmissionFactorService: ImportEmissionFactorService,
  ) {}

  @Post()
  async importEmissionFactors(@Body() emissonFactors: Array<EmissionFactor>) {
    try {
      return await this.importEmissionFactorService.importEmissionFactors(
        emissonFactors,
      );
    } catch (error) {
      return error;
    }
  }
}
