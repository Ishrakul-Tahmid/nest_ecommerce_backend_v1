import{
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
} from 'typeorm'

@Entity('delivery')
export class Delivery extends BaseEntity{
    @PrimaryGeneratedColumn()
    deliveryId: number;
    
    @PrimaryGeneratedColumn()
    orderId: number;

    @PrimaryGeneratedColumn()
    deliveryPersonId: number;

    @CreateDateColumn()
    pickupDate: Date;

    @CreateDateColumn()
    deliveryDate: Date;

    @Column()
    status: string;
}