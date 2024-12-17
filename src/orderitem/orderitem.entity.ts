import{
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
} from 'typeorm'

@Entity('orderitem')
export class OrderItem extends BaseEntity{
    @PrimaryGeneratedColumn()
    orderitemId: number;

    @PrimaryGeneratedColumn()
    orderId: number;

    @PrimaryGeneratedColumn()
    productId: number;

    @Column()
    quantity: number;

    @Column()
    subTotal: number;
}