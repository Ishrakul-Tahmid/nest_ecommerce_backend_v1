import { IsOptional, IsNumber, IsDate, IsNotEmpty } from 'class-validator';

export class UpdateCartDto {
  @IsOptional()
  @IsNumber({}, { message: 'Cart ID must be a number' })
  @IsNotEmpty({ message: 'Cart ID cannot be empty' })
  cartId: number; 

  @IsOptional()
  @IsNumber({}, { message: 'Buyer ID must be a number' })
  @IsNotEmpty({ message: 'Buyer ID cannot be empty' })
  buyerId: number; 

  @IsOptional()
  @IsDate({ message: 'Create date must be a valid date' })
  @IsNotEmpty({ message: 'Create date cannot be empty' })
  createDate: Date; 
}
