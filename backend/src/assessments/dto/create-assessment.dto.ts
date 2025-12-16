import { IsString, IsNotEmpty, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { AssessmentType } from '@prisma/client';

export class CreateAssessmentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(AssessmentType)
  @IsNotEmpty()
  type: AssessmentType;

  @IsDateString()
  @IsOptional()
  scheduledAt?: string;
}
