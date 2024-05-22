import { Module } from '@nestjs/common';
import { ImportEmissionFactorService } from './import-emission-factor.service';
import { ImportEmissionFactorController } from './import-emission-factor.controller';

@Module({
  controllers: [ImportEmissionFactorController],
  providers: [ImportEmissionFactorService]
})
export class ImportEmissionFactorModule {}
