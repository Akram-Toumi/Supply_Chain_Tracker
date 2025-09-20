import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  batchNumber: string;

  @IsOptional()
  currentLocation?: string;
}
