import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ unique: true })
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop([
    raw({
      id: { type: String },
      name: { type: String },
      quantity: { type: Number },
      unit: { type: String },
    }),
  ])
  input: Record<string, any>[];

  @Prop([
    raw({
      id: { type: String },
      name: { type: String },
      quantity: { type: Number },
      unit: { type: String },
    }),
  ])
  output: Record<string, any>[];

  @Prop([
    raw({
      id: { type: String },
      name: { type: String },
      quantity: { type: Number },
      unit: { type: String },
    }),
  ])
  emission: Record<string, any>[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
