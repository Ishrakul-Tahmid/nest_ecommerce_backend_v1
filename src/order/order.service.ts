import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from './order.entity';
import { User } from '../user/users.entity';
import { UpdateOrderDto } from "./update-order.dto";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,  
    @InjectRepository(User) private readonly userRepo: Repository<User>      
  ) {}

  async create(totalAmount: number, orderStatus: string, user_id: number) {
 
    const user = await this.userRepo.findOne({ where: { user_id } }); 
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const order = this.orderRepo.create({ totalAmount, orderStatus, user });
    return this.orderRepo.save(order);
  }

  async findOne(orderId: number) {
    const order = await this.orderRepo.findOne({ where: { orderId } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  find() {
    return this.orderRepo.find();
  }

  async update(orderId: number, body: Partial<UpdateOrderDto>) {
    const order = await this.findOne(orderId); 
    Object.assign(order, body);  
    return this.orderRepo.save(order); 
  }

  async remove(orderId: number) {
    const order = await this.findOne(orderId);
    await this.orderRepo.remove(order);
    return { message: 'Order deleted successfully' };
  }
}
