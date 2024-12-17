import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  
  @Entity('categories')
  export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    category_id: number; // Primary Key
  
    @Column({ unique: true })
    name: string; // Required, Unique
  
    @ManyToOne(() => Category, (category) => category.category_id, { nullable: true })
    @JoinColumn({ name: 'parentCategory_id' })
    parentCategory_id: Category | null; // Foreign Key referencing category_id
  }
  