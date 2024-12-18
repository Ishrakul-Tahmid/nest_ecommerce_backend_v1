import { 
  IsEmail, 
  IsString, 
  IsNotEmpty, 
  MinLength, 
  Matches, 
  IsOptional 
} from 'class-validator';
 
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Name must not be empty' })
  @MinLength(1, { message: 'Name must not be an empty string' })
  name?: string;
 
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Username must not be empty' })
  @MinLength(1, { message: 'Username must not be an empty string' })
  username?: string;
 
  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email must not be empty' })
  email?: string;
 
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Password must not be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, { 
    message: 'Password must include at least 1 uppercase and 1 lowercase letter' 
  })
  password?: string;
 
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Role must not be empty' })
  @MinLength(1, { message: 'Role must not be an empty string' })
  role?: string;
}
