import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  short_description: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  stock_quantity: number;

  @IsOptional()
  @IsNumber()
  category_id: number;

  @IsOptional()
  @IsString()
  image_url: string;

  @IsOptional()
  @IsString()
  status: string;
}
