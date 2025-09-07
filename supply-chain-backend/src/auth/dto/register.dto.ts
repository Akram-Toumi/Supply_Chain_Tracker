import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from '../../entities/user.entity';

export class RegisterDto {
  @IsNotEmpty() name: string;

  @IsEmail() email: string;

  @IsNotEmpty() @MinLength(6) password: string;

  @IsEnum(UserRole) role: string;
}
