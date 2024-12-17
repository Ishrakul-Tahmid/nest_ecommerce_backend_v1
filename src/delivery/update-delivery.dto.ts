import { IsString } from 'class-validator';

export class UpdateDeliveryDto {
    deliveryId: number;
    
    orderId: number;

    deliveryPersonId: number;

    pickupDate: Date;

    deliveryDate: Date;

    @IsString()
    status: string;
}
