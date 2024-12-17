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
import { UpdateOrderItemDto } from './update-orderitem.dto';
import { OrderItemService } from './orderitem.service';

@Controller('orderitem')
export class OrderItemController {
  constructor(
    private orderItemService: OrderItemService) {}

    @Post()
    async createOrderItem(
      @Body('quantity') quantity: number,
      @Body('subTotal') subTotal: number,
    ) {
      return this.orderItemService.create(quantity, subTotal);
    }

  @Get('/:orderitemId')
  async findOrderItem(@Param('orderitemId') orderitemId: number) {
    const orderitem = await this.orderItemService.findOne(orderitemId);
    if (!orderitem) {
      throw new NotFoundException('order item does not exists');
    }
    return orderitem;
  }

  @Get()
  findAllUsers() {
    return this.orderItemService.find();
  }

  @Delete('/:orderitemId')
  removeUser(@Param('orderitemId') orderitemId: string) {
    return this.orderItemService.remove(parseInt(orderitemId));
  }

  @Patch('/:orderitemId')
  updateUser(@Param('orderitemId') orderitemId: number, @Body() body: UpdateOrderItemDto) {
    return this.orderItemService.update(orderitemId, body);
  }
}
