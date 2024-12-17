import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../user/users.entity';  // Reference to buyer (User entity)
import { Product } from '../product/product.entity';  // Reference to Product entity

@Entity('review')
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn()
    reviewId: number;  // Primary key for Review

    @ManyToOne(() => Product, { nullable: false })
    @JoinColumn({ name: 'product_id' })  // Foreign key for Product
    product: Product;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })  // Foreign key for User (Buyer)
    user: User;

    @Column('float')
    rating: number;

    @Column()
    comment: string;

    @CreateDateColumn()
    reviewDate: Date;
}
