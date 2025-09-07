import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTrackingDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  status: string;

  @IsOptional()
  location?: string;

  @IsOptional()
  notes?: string;
}
