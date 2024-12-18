import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Category } from '../category/category.entity'; 
  
  @Entity('product')
  export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    product_id: number; 
  
    @Column()
    name: string; 
  
    @Column({ nullable: true })
    short_description: string; 
  
    @Column({ nullable: true })
    description: string; 
  
    @Column('float')
    price: number; 
  
    @Column({ nullable: true })
    image_url: string; 
  
    @Column()
    stock_quantity: number; 
  
    @ManyToOne(() => Category, (category) => category.category_id, {
      nullable: true,
      onDelete: 'SET NULL', 
    })
    @JoinColumn({ name: 'category_id' })
    category: Category; 
  
    @Column()
    status: string; 
  }
  