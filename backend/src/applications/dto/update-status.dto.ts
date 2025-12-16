import { IsEnum } from 'class-validator';

export enum ApplicationStatus {
  APPLIED = 'APPLIED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  SHORTLISTED = 'SHORTLISTED',
  INTERVIEW = 'INTERVIEW',
  OFFER = 'OFFER',
  REJECTED = 'REJECTED',
}

export class UpdateStatusDto {
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}
