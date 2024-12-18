import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Short description must be a string' })
  @IsNotEmpty({ message: 'Short description cannot be empty' })
  short_description: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  @IsNotEmpty({ message: 'Price cannot be empty' })
  price: number;

  @IsOptional()
  @IsNumber({}, { message: 'Stock quantity must be a number' })
  @IsNotEmpty({ message: 'Stock quantity cannot be empty' })
  stock_quantity: number;

  @IsOptional()
  @IsNumber({}, { message: 'Category ID must be a number' })
  @IsNotEmpty({ message: 'Category ID cannot be empty' })
  category_id: number;

  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  @IsNotEmpty({ message: 'Image URL cannot be empty' })
  image_url: string;

  @IsOptional()
  @IsString({ message: 'Status must be a string' })
  @IsNotEmpty({ message: 'Status cannot be empty' })
  status: string;
}
