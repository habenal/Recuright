import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '@prisma/client';

class ProfileDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @ValidateNested()
  @Type(() => ProfileDto)
  profile: ProfileDto;
}
