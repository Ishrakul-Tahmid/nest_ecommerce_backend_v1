import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Category } from '../category/category.entity'; // Assuming Category entity exists
  
  @Entity('product')
  export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    product_id: number; // Primary key for product
  
    @Column()
    name: string; // Required field for product name
  
    @Column({ nullable: true })
    short_description: string; // Optional short description
  
    @Column({ nullable: true })
    description: string; // Optional detailed description
  
    @Column('float')
    price: number; // Required field for price
  
    @Column({ nullable: true })
    image_url: string; // Optional image URL
  
    @Column()
    stock_quantity: number; // Integer field for stock quantity
  
    @ManyToOne(() => Category, (category) => category.category_id, {
      nullable: true,
      onDelete: 'SET NULL', // If category is deleted, set the category_id to null
    })
    @JoinColumn({ name: 'category_id' })
    category: Category; // Foreign key to the Category table
  
    @Column()
    status: string; // Status of the product (e.g., "active", "inactive")
  }
  