import { IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrderItemDto {
  @IsOptional()
  @IsNumber({}, { message: 'Quantity must be a valid number' })
  @IsNotEmpty({ message: 'Quantity cannot be empty' })
  quantity: number;

  @IsOptional()
  @IsNumber({}, { message: 'SubTotal must be a valid number' })
  @IsNotEmpty({ message: 'SubTotal cannot be empty' })
  subTotal: number;
}
