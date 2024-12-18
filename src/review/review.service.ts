import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from './review.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/users.entity'; 
import { UpdateReviewDto } from "./update-review.dto";

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review) private readonly reviewRepo: Repository<Review>,
        @InjectRepository(Product) private readonly productRepo: Repository<Product>,
        @InjectRepository(User) private readonly userRepo: Repository<User> 
    ) {}

    async create(product_id: number, user_id: number, rating: number, comment: string) {
        const product = await this.productRepo.findOne({ where: { product_id: product_id } });
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const user = await this.userRepo.findOne({ where: { user_id: user_id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        
        const review = this.reviewRepo.create({
            product,
            user, 
            rating,
            comment,
        });

        return this.reviewRepo.save(review);
    }

    async findOne(reviewId: number) {
        const review = await this.reviewRepo.findOne({
            where: { reviewId },
            relations: ['product', 'user'], 
        });
        if (!review) {
            throw new NotFoundException('Review not found');
        }
        return review;
    }

    find() {
        return this.reviewRepo.find({ relations: ['product', 'user'] });
    }

    async update(reviewId: number, body: Partial<UpdateReviewDto>) {
        const review = await this.findOne(reviewId);
        if (!review) {
            throw new NotFoundException('Review not found');
        }
        Object.assign(review, body);
        return this.reviewRepo.save(review);
    }

    async remove(reviewId: number) {
        const review = await this.findOne(reviewId);
        return this.reviewRepo.remove(review);
    }
}
