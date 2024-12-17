import { IsOptional, IsNumber, IsDate } from 'class-validator';

export class UpdateCartDto {
  @IsOptional()
  @IsNumber()
  cartId: number; // Optional: Cart ID for updating purposes

  @IsOptional()
  @IsNumber()
  buyerId: number; // Optional: Buyer/User ID

  @IsOptional()
  @IsDate()
  createDate: Date; // Optional: Creation date
}
