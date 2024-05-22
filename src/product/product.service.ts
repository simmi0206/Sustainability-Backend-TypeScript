import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import { MaterialDatabase } from '../utils/database/MaterialDatabase';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    createProductDto.id = crypto.randomUUID();
    createProductDto.output[0].id = createProductDto.id;

    // Get Emissions for each input
    createProductDto.emission = await this.getEmission(createProductDto);

    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  findAll() {
    return this.productModel.find().exec();
  }

  findOne(id: string) {
    return this.productModel.findOne({ id: id });
    // return `This action returns a #${id} product`;
  }

  async update(materialId: string, updatedProduct: CreateProductDto) {
    console.log(updatedProduct);
    // Get Emissions for each input
    console.log(updatedProduct);
    updatedProduct.emission = await this.getEmission(updatedProduct);

    const updatedProductModel = new this.productModel(updatedProduct);
    console.log(updatedProduct);
    console.log(updatedProductModel);
    return this.productModel.findOneAndUpdate(
      { id: materialId },
      updatedProduct,
      { returnDocument: 'after' },
    );
  }

  remove(id: string) {
    return this.productModel.deleteOne({ id: id });
  }

  async calculateEmission(materialId: string, quantity: number) {
    // Import material Data
    const materialDatabase = new MaterialDatabase();
    const material = await materialDatabase.getMaterial(materialId);

    // Find Emissions and Aggregate
    console.log(material);
    const co2Emission: number =
      (material.properties.co2Emission as number) * quantity;
    const noxEmission: number =
      (material.properties.noxEmission as number) * quantity;

    // Return the answer
    return { co2Emission, noxEmission };
  }

  private async getEmission(createProductDto: CreateProductDto) {
    const totalEmissions = await Promise.all(
      createProductDto.input.map(
        async (inputItem) =>
          await this.calculateEmission(inputItem.id, inputItem.quantity),
      ),
    );
    const reducedTotalEmission = totalEmissions.reduce(
      (currentItem, reducedItem) => {
        reducedItem.co2Emission += currentItem.co2Emission;
        reducedItem.noxEmission += currentItem.noxEmission;
        return reducedItem;
      },
    );
    // Add Emissions to createProductDto
    const emissions = [
      {
        id: '642cae32-57ea-4df1-8b24-7d9895d4beff',
        name: 'Carbon Dioxide',
        quantity: reducedTotalEmission.co2Emission,
        unit: 'KG',
      },
      {
        id: '46ae3095-e7e5-4c1d-8ff3-1668bf21c645',
        name: 'Nitrogen Dioxide',
        quantity: reducedTotalEmission.noxEmission,
        unit: 'KG',
      },
    ];
    return emissions.filter((emission) => emission.quantity > 0);
  }
}
