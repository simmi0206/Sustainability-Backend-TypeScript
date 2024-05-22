import { Injectable } from '@nestjs/common';
import { Material } from './dto/Material.';
import { MaterialDatabase } from '../utils/database/MaterialDatabase';
import { CreateMaterialDto } from './dto/create-material.dto';

@Injectable()
export class MaterialService {
  create(materials: Array<Material>) {
    const materialDatabase = new MaterialDatabase();
    return materialDatabase.importMaterial(materials);
  }

  findAll() {
    const materialDatabase = new MaterialDatabase();
    return materialDatabase.getMultipleMaterial(800);
  }

  findOne(id: string) {
    const materialDatabase = new MaterialDatabase();
    return materialDatabase.getMaterial(id);
  }

  async getRecommendation(materialId: string) {
    const materialDatabase = new MaterialDatabase();
    return materialDatabase.getRecommendation(materialId);
  }

  update(s: string, updateMaterialDto: CreateMaterialDto) {
    return `This action updates a #${id} material`;
  }

  remove(id: number) {
    return `This action removes a #${id} material`;
  }
}
