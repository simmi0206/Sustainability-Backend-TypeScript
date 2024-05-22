export interface EmissionFactor {
  id: string;
  source: string;
  unit: string;
  quantity: number;
  factor: number;
  country: string;
  region: string;
  footprintUnit: string;
  greenScore: number;
}
