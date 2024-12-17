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

  // Create a new product
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
      category: category_id ? { category_id } : null, // Handle category relation
      image_url,
      status,
    });

    return this.repo.save(product);
  }

  // Find a product by its ID
  findOne(product_id: number) {
    if (!product_id) {
      return null;
    }
    return this.repo.findOne({
      where: { product_id },
      relations: ['category'], // Include related category data
    });
  }

  // Get all products
  find() {
    return this.repo.find({
      relations: ['category'], // Include related category data
    });
  }

  // Update an existing product
  async update(product_id: number, body: Partial<UpdateProductDto>) {
    const product = await this.findOne(product_id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    Object.assign(product, body);
    return this.repo.save(product);
  }

  // Delete a product
  async remove(product_id: number) {
    const product = await this.findOne(product_id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.repo.remove(product);
    return { message: 'Product deleted successfully' };
  }
}
