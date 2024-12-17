import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string; // User's name

  @IsOptional()
  @IsString()
  username: string; // User's username

  @IsOptional()
  @IsEmail()
  email: string; // User's email address

  @IsOptional()
  @IsString()
  password: string; // User's password

  @IsOptional()
  @IsString()
  role: string; // User's role (updated from "rule")
}
