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
    category_id: number; 
  
    @Column({ unique: true })
    name: string; 
  
    @ManyToOne(() => Category, (category) => category.category_id, { nullable: true })
    @JoinColumn({ name: 'parentCategory_id' })
    parentCategory_id: Category | null; 
  }
  