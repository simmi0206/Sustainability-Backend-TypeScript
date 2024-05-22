import { Body, Controller, Post } from '@nestjs/common';
import { ImportMaterialService } from './import-material.service';
import { Material } from '../material/dto/Material.';

@Controller('importMaterial')
export class ImportMaterialController {
  constructor(private readonly importMaterialService: ImportMaterialService) {}

  @Post()
  async importMaterials(@Body() materials: Array<Material>) {
    try {
      return await this.importMaterialService.importMaterial(materials);
    } catch (error) {
      return error;
    }
  }
}
