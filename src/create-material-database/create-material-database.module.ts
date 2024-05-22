import { Module } from '@nestjs/common';
import { CreateMaterialDatabaseService } from './create-material-database.service';
import { CreateMaterialDatabaseController } from './create-material-database.controller';

@Module({
  controllers: [CreateMaterialDatabaseController],
  providers: [CreateMaterialDatabaseService],
})
export class CreateMaterialDatabaseModule {}
