import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsInt({ message: 'Category ID must be a valid integer' })
  @IsNotEmpty({ message: 'Category ID cannot be empty' })
  category_id?: number; 

  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name?: string; 

  @IsOptional()
  @IsInt({ message: 'Parent Category ID must be a valid integer' })
  @IsNotEmpty({ message: 'Parent Category ID cannot be empty' })
  parentCategory_id?: number | null;
}
