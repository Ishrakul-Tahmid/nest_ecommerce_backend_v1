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
import { UpdateOrderDto } from './update-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
  ) {}

  @Post()
  async createOrder(
      @Body('totalAmount') totalAmount: number,
      @Body('orderStatus') orderStatus: string,
      @Body('userId') userId: number
  ) {
      return this.orderService.create(totalAmount, orderStatus, userId);
  }

  // Find an order by ID
  @Get('/:orderId')
  async findOrder(@Param('orderId') orderId: number) {
    const order = await this.orderService.findOne(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  // Get all orders
  @Get()
  findAllOrders() {
    return this.orderService.find();
  }

  // Remove an order
  @Delete('/delete/:orderId')
  removeOrder(@Param('orderId') orderId: number) {
    return this.orderService.remove(orderId);
  }

  // Update an order
  @Patch('/update/:orderId')
  updateOrder(@Param('orderId') orderId: number, @Body() body: UpdateOrderDto) {
    return this.orderService.update(orderId, body);
  }
}
