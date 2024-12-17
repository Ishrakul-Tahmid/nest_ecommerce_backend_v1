import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsInt()
  category_id?: number; // Optional category_id to update

  @IsOptional()
  @IsString()
  name?: string; // Optional name to update

  @IsOptional()
  @IsInt()
  parentCategory_id?: number | null; // Optional parentCategory_id to update (nullable)
}
