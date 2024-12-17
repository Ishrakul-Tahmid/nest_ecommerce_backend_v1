import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    Column,
  } from 'typeorm';
  import { User } from '../user/users.entity';
  import { Product } from '../product/product.entity';
  
  @Entity('cart')
  export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn()
    cart_id: number;
  
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' }) // Foreign key referencing Users table
    user: User;
  
    @ManyToOne(() => Product, { nullable: false })
    @JoinColumn({ name: 'product_id' }) // Foreign key referencing Products table
    product: Product;
  
    @Column({ type: 'int', nullable: false })
    quantity: number;
  }
  