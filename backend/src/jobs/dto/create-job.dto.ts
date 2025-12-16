import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

export enum JobType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  INTERNSHIP = 'INTERNSHIP',
}

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(JobType)
  type: JobType;

  @IsOptional()
  @IsString()
  department?: string;
}
