import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from './order.entity';
import { User } from '../user/users.entity';
import { UpdateOrderDto } from "./update-order.dto";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,  // Renamed to orderRepo for clarity
    @InjectRepository(User) private readonly userRepo: Repository<User>       // Renamed to userRepo for clarity
  ) {}

  // Create a new order
  async create(totalAmount: number, orderStatus: string, user_id: number) {
    // Correct the 'findOne' method to use 'where' for querying by user_id
    const user = await this.userRepo.findOne({ where: { user_id } }); // Find the user by ID
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Fix the repository reference to use orderRepo
    const order = this.orderRepo.create({ totalAmount, orderStatus, user });
    return this.orderRepo.save(order);
  }

  // Find an order by ID
  async findOne(orderId: number) {
    const order = await this.orderRepo.findOne({ where: { orderId } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  // Get all orders
  find() {
    return this.orderRepo.find();
  }

  // Update an existing order
  async update(orderId: number, body: Partial<UpdateOrderDto>) {
    const order = await this.findOne(orderId); 
    Object.assign(order, body);  // Update order with the provided data
    return this.orderRepo.save(order); 
  }

  // Remove an order
  async remove(orderId: number) {
    const order = await this.findOne(orderId);
    await this.orderRepo.remove(order);
    return { message: 'Order deleted successfully' };
  }
}
