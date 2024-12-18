import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { UpdateProductDto } from './update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
  ) {}

  create(
    name: string,
    short_description: string | null,
    description: string,
    price: number,
    stock_quantity: number,
    category_id: number | null,
    image_url: string | null,
    status: string,
  ) {
    const product = this.repo.create({
      name,
      short_description,
      description,
      price,
      stock_quantity,
      category: category_id ? { category_id } : null, 
      image_url,
      status,
    });

    return this.repo.save(product);
  }

  findOne(product_id: number) {
    if (!product_id) {
      return null;
    }
    return this.repo.findOne({
      where: { product_id },
      relations: ['category'], 
    });
  }

  find() {
    return this.repo.find({
      relations: ['category'], 
    });
  }

  async update(product_id: number, body: Partial<UpdateProductDto>) {
    const product = await this.findOne(product_id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    Object.assign(product, body);
    return this.repo.save(product);
  }

  async remove(product_id: number) {
    const product = await this.findOne(product_id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.repo.remove(product);
    return { message: 'Product deleted successfully' };
  }
}
