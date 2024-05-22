import { Injectable } from '@nestjs/common';
import { MaterialDatabase } from '../utils/database/MaterialDatabase';

@Injectable()
export class CreateMaterialDatabaseService {
  async createMaterial() {
    const materialDatabase = new MaterialDatabase();
    return materialDatabase.createDatabase();
  }
}
