import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCategoryDto } from './update-category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Create a new category
  @Post('/categories')
  async createCategory(
    @Body('name') name: string,  // Adjusted to match entity field
    @Body('parentCategory_id') parentCategory_id: number | null, // Adjusted to match entity field
  ) {
    return this.categoryService.create(name, parentCategory_id);
  }

  // Find a category by its ID
  @Get('/:category_id')
  async findCategory(@Param('category_id') category_id: number) {
    const category = await this.categoryService.findOne(category_id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  // Get all categories
  @Get()
  findAllCategory() {
    return this.categoryService.find();
  }

  // Delete a category
  @Delete('/delete/:category_id')
  removeCategory(@Param('category_id') category_id: number) {
    return this.categoryService.remove(category_id);
  }

  // Update a category
  @Patch('/update/:category_id')
  updateCategory(
    @Param('category_id') category_id: number,
    @Body() body: UpdateCategoryDto,
  ) {
    return this.categoryService.update(category_id, body);
  }
}
