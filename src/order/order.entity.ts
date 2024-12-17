import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
  import { User } from '../user/users.entity'; // Adjust this import based on your actual User entity path
  
  @Entity('order')
  export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    orderId: number; // Primary key for the order
  
    @ManyToOne(() => User, { nullable: false })  // Establish the relationship with the User entity
    @JoinColumn({ name: 'user_id' })  // Foreign key column for user
    user: User;  // Reference to User entity (you can access user properties like user.name, user.email, etc.)
  
    @CreateDateColumn()
    orderDate: Date;  // Automatically set to the current date/time when the order is created
  
    @Column('float')
    totalAmount: number;  // Total amount for the order
  
    @Column()
    orderStatus: string;  // Order status (Pending, Shipped, Delivered, Cancelled)
  }
  