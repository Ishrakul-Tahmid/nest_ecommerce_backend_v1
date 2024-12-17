import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateReviewDto {
    @IsOptional()
    @IsNumber()
    rating?: number;

    @IsOptional()
    @IsString()
    comment?: string;
}