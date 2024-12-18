import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from './category.entity';
import { UpdateCategoryDto } from "./update-category.dto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly repo: Repository<Category>,
  ) {}

  async create(name: string, parentCategory_id: number | null) {
    let parentCategory: Category | null = null;

    if (parentCategory_id) {
      parentCategory = await this.repo.findOne({ where: { category_id: parentCategory_id } });
      if (!parentCategory) {
        throw new NotFoundException('Parent category not found');
      }
    }

    const category = this.repo.create({ name, parentCategory_id: parentCategory });
    return this.repo.save(category);
  }

  findOne(category_id: number) {
    if (!category_id) {
      return null;
    }
    return this.repo.findOne({ where: { category_id } });
  }

  find() {
    return this.repo.find();
  }

  async update(category_id: number, body: Partial<UpdateCategoryDto>) {
    const category = await this.findOne(category_id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (body.parentCategory_id) {
      const parentCategory = await this.repo.findOne({ where: { category_id: body.parentCategory_id } });
      if (parentCategory) {
        category.parentCategory_id = parentCategory;
      } else {
        throw new NotFoundException('Parent category not found');
      }
    }

    Object.assign(category, body);
    return this.repo.save(category);
  }

  async remove(category_id: number) {
    const category = await this.findOne(category_id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    await this.repo.remove(category);
    return { message: 'Category deleted successfully' };
  }
}
