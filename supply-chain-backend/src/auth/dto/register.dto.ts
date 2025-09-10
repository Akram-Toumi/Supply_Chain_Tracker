import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { User } from '../../users/user.entity';

export class RegisterDto {
  @IsNotEmpty() name: string;

  @IsEmail() email: string;

  @IsNotEmpty() @MinLength(6) password: string;

  @IsEnum(User) role: string;
}
