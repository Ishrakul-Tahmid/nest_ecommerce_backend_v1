import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { UpdateCartDto } from './update-cart.dto';
import { User } from '../user/users.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly repo: Repository<Cart>,
  ) {}

  async create(user_id: number, product_id: number, quantity: number) {
    const cart = this.repo.create({
      user: { user_id } as User, 
      product: { product_id } as Product, 
      quantity,
    });
    return this.repo.save(cart);
  }

  findOne(cart_id: number) {
    if (!cart_id) {
      return null;
    }
    return this.repo.findOne({
      where: { cart_id },
      relations: ['user', 'product'],  
    });
  }

  find() {
    return this.repo.find({
      relations: ['user', 'product'], 
    });
  }

  async update(cart_id: number, body: Partial<UpdateCartDto>) {
    const cart = await this.findOne(cart_id);
    if (!cart) {
      throw new NotFoundException('Cart item not found');
    }
    Object.assign(cart, body);
    return this.repo.save(cart);
  }

  async remove(cart_id: number) {
    const cart = await this.findOne(cart_id);
    if (!cart) {
      throw new NotFoundException('Cart item not found');
    }
    await this.repo.remove(cart);
    return { message: 'Cart item deleted successfully' };
  }
}
