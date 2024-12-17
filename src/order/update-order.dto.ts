import { IsOptional } from 'class-validator';

export class UpdateOrderDto {
  orderId: number;

  buyerId: number;

  orderDate:Date;

  @IsOptional()
  totalAmount:number; 

  @IsOptional()
  orderStatus: string;

}
