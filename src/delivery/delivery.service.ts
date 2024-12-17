import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Delivery } from './delivery.entity'
import { UpdateDeliveryDto } from "./update-delivery.dto";

@Injectable()
export class DeliveryService{
    constructor(@InjectRepository(Delivery) private readonly repo: Repository<Delivery>){}

    create(status: string){
        const delivery = this.repo.create({status})

        return this.repo.save(delivery);
    }

    findOne(deliveryId: number) {
        if (!deliveryId) {
          return null;
        }
        return this.repo.findOneBy({ deliveryId });
    }

    find() {
        return this.repo.find();
    }

    async update(deliveryId: number, body: Partial<UpdateDeliveryDto>) {
      const delivery = await this.findOne(deliveryId); 
      if (!delivery) {
          throw new NotFoundException('Delivery does not submitted');
      }
      Object.assign(delivery, body);
      return this.repo.save(delivery);
  }
  

    async remove(deliveryId: number) {
        const delivery = await this.findOne(deliveryId);
        if (!delivery) {
          throw new NotFoundException('delivery not found');
        }
        return this.repo.remove(delivery);
    }
}