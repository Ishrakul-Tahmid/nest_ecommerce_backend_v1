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
import { UpdateCartDto } from './update-cart.dto';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Create a new cart item
  @Post()
async createCart(
  @Body('user_id') user_id: number,
  @Body('product_id') product_id: number,
  @Body('quantity') quantity: number,
) {
  return this.cartService.create(user_id, product_id, quantity);
}


  // Find a cart item by its ID
  @Get('/:cart_id')
  async findCart(@Param('cart_id') cart_id: number) {
    const cart = await this.cartService.findOne(cart_id);
    if (!cart) {
      throw new NotFoundException('Cart item not found');
    }
    return cart;
  }

  // Get all cart items
  @Get()
  findAllCarts() {
    return this.cartService.find();
  }

  // Update a cart item
  @Patch('/update/:cart_id')
  async updateCart(
    @Param('cart_id') cart_id: number,
    @Body() body: UpdateCartDto,
  ) {
    return this.cartService.update(cart_id, body);
  }

  // Remove a cart item
  @Delete('/delete/:cart_id')
  async removeCart(@Param('cart_id') cart_id: number) {
    return this.cartService.remove(cart_id);
  }
}
