import { IsEmail, IsNotEmpty, IsEnum, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @IsEnum(Role)
  role?: Role;
}
