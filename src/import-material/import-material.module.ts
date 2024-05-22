import { Module } from '@nestjs/common';
import { ImportMaterialService } from './import-material.service';
import { ImportMaterialController } from './import-material.controller'; /**/

@Module({
  controllers: [ImportMaterialController],
  providers: [ImportMaterialService],
})
export class ImportMaterialModule {}
