import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImportEmissionFactorModule } from './import-emission-factor/import-emission-factor.module';
import { GetRecommendationModule } from './get-recommendation/get-recommendation.module';
import { ImportMaterialModule } from './import-material/import-material.module';
import { CreateMaterialDatabaseModule } from './create-material-database/create-material-database.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { MaterialModule } from './material/material.module';

@Module({
  imports: [
    ImportEmissionFactorModule,
    GetRecommendationModule,
    ImportMaterialModule,
    CreateMaterialDatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ProductModule,
    MaterialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
