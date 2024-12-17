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
import { UpdateDeliveryDto } from './update-delivery.dto';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}

    @Post()
    async createDelivery(
      @Body('status') status: string) 
      {
      return this.deliveryService.create(status);
    }

  @Get('/:deliveryId')
  async findDelivery(@Param('deliveryId') deliveryId: number) {
    const delivery = await this.deliveryService.findOne(deliveryId);
    if (!delivery) {
      throw new NotFoundException('delivery not found');
    }
    return delivery;
  }

  @Get()
  findAllDelivery() {
    return this.deliveryService.find();
  }

  @Delete('/:deliveryId')
  removeDelivery(@Param('deliveryId') deliveryId: number) {
    return this.deliveryService.remove(deliveryId);
  }

  @Patch('/:deliveryId')
  updateUser(@Param('deliveryId') deliveryId: number, @Body() body: UpdateDeliveryDto) {
    return this.deliveryService.update(deliveryId, body);
  }
}
