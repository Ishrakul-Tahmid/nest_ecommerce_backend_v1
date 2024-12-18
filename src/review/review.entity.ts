import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../user/users.entity';  
import { Product } from '../product/product.entity';  

@Entity('review')
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn()
    reviewId: number;  

    @ManyToOne(() => Product, { nullable: false })
    @JoinColumn({ name: 'product_id' }) 
    product: Product;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' }) 
    user: User;

    @Column('float')
    rating: number;

    @Column()
    comment: string;

    @CreateDateColumn()
    reviewDate: Date;
}
