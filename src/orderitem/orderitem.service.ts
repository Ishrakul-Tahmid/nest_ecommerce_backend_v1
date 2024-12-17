import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItem } from './orderitem.entity'
import { UpdateOrderItemDto } from "./update-orderitem.dto";

@Injectable()
export class OrderItemService{
    constructor(@InjectRepository(OrderItem) private readonly repo: Repository<OrderItem>){}

    create(quantity: number, subTotal:number){
        const orderitem = this.repo.create({quantity, subTotal})

        return this.repo.save(orderitem);
    }

    findOne(orderitemId: number) {
        if (!orderitemId) {
          return null;
        }
        return this.repo.findOneBy({ orderitemId });
    }

    find() {
        return this.repo.find();
    }

    async update(orderitemId: number, body: Partial<UpdateOrderItemDto>) {
      const orderitem = await this.findOne(orderitemId); 
      if (!orderitem) {
          throw new NotFoundException('Order item does not found');
      }
      Object.assign(orderitem, body);
      return this.repo.save(orderitem);
  }
  

    async remove(orderitemId: number) {
        const orderitem = await this.findOne(orderitemId);
        if (!orderitem) {
          throw new NotFoundException('order item does not exoists')
        }
        return this.repo.remove(orderitem);
    }
}