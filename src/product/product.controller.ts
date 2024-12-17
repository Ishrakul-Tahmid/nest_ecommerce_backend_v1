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
import { UpdateProductDto } from './update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Create a new product
  @Post()
  async createProduct(
    @Body('name') name: string,
    @Body('short_description') short_description: string | null,
    @Body('description') description: string,
    @Body('price') price: number,
    @Body('stock_quantity') stock_quantity: number,
    @Body('category_id') category_id: number | null,
    @Body('image_url') image_url: string | null,
    @Body('status') status: string,
  ) {
    return this.productService.create(
      name,
      short_description,
      description,
      price,
      stock_quantity,
      category_id,
      image_url,
      status,
    );
  }

  // Find a product by ID
  @Get('/:product_id')
  async findProduct(@Param('product_id') product_id: number) {
    const product = await this.productService.findOne(product_id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  // Get all products
  @Get()
  findAllProducts() {
    return this.productService.find();
  }

  // Delete a product
  @Delete('/delete/:product_id')
  async removeProduct(@Param('product_id') product_id: number) {
    return this.productService.remove(product_id);
  }

  // Update a product
  @Patch('/update/:product_id')
  async updateProduct(
    @Param('product_id') product_id: number,
    @Body() body: UpdateProductDto,
  ) {
    return this.productService.update(product_id, body);
  }
}
