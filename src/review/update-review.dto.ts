import { IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateReviewDto {
    @IsOptional()
    @IsNumber({}, { message: 'Rating must be a valid number' })
    rating?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Comment must not be an empty string' })
    comment?: string;
}
