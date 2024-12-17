import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { UpdateReviewDto } from './update-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  async createReview(
      @Body('productId') productId: number,
      @Body('userId') userId: number,   // Added userId here
      @Body('rating') rating: number,
      @Body('comment') comment: string
  ) {
      return this.reviewService.create(productId, userId, rating, comment);
  }

  @Get('/:reviewId')
  async findReview(@Param('reviewId') reviewId: number) {
      const review = await this.reviewService.findOne(reviewId);
      if (!review) {
          throw new NotFoundException('Review not found');
      }
      return review;
  }

  @Get()
  findAllReviews() {
      return this.reviewService.find();
  }

  @Patch('/update/:reviewId')
  updateReview(@Param('reviewId') reviewId: number, @Body() body: UpdateReviewDto) {
      return this.reviewService.update(reviewId, body);
  }

  @Delete('/delete/:reviewId')
  removeReview(@Param('reviewId') reviewId: number) {
      return this.reviewService.remove(reviewId);
  }
}
