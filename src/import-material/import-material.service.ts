import { Injectable } from '@nestjs/common';
import { MaterialDatabase } from '../utils/database/MaterialDatabase';

@Injectable()
export class ImportMaterialService {
  async importMaterial(materials) {
    const materialDatabase = new MaterialDatabase();
    return materialDatabase.importMaterial(materials);
  }
}
