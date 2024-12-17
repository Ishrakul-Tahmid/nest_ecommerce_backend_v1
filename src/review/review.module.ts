import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review } from './review.entity';
import { User } from '../user/users.entity';
import { Product } from '../product/product.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
    imports: [TypeOrmModule.forFeature([Review, User, Product]), ProductModule],
    controllers: [ReviewController],
    providers: [ReviewService],
})
export class ReviewModule {}
