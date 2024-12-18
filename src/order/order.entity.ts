import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
  import { User } from '../user/users.entity'; 
  
  @Entity('order')
  export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    orderId: number; 
  
    @ManyToOne(() => User, { nullable: false })  
    @JoinColumn({ name: 'user_id' })  
    user: User;  
  
    @CreateDateColumn()
    orderDate: Date; 
  
    @Column('float')
    totalAmount: number;  
  
    @Column()
    orderStatus: string;  
  }
  