export class CreateProductDto {
  id: string;
  name: string;
  description: string;
  image: string;
  input: ComponentObject[];
  output: ComponentObject[];
  emission: ComponentObject[];
}

class ComponentObject {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}
