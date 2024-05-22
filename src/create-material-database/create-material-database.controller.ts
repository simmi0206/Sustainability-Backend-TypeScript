import { Controller, Get } from '@nestjs/common';
import { CreateMaterialDatabaseService } from './create-material-database.service';

@Controller('createMaterialDatabase')
export class CreateMaterialDatabaseController {
  constructor(
    private readonly createMaterialDatabaseService: CreateMaterialDatabaseService,
  ) {}

  @Get()
  async createMaterials() {
    try {
      return await this.createMaterialDatabaseService.createMaterial();
    } catch (error) {
      return error;
    }
  }
}
