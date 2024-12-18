import { IsOptional, IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  orderId: number;

  @IsOptional()
  @IsNumber()
  buyerId: number;

  @IsOptional()
  @IsDate()
  orderDate: Date;

  @IsOptional()
  @IsNumber({}, { message: 'Total amount must be a valid number' })
  @IsNotEmpty({ message: 'Total amount cannot be empty' })
  totalAmount: number;

  @IsOptional()
  @IsString({ message: 'Order status must be a string' })
  @IsNotEmpty({ message: 'Order status cannot be empty' })
  orderStatus: string;
}
