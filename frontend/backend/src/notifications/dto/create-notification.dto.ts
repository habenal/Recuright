import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export enum NotificationType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  recipient: string; // email or phone

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsEnum(NotificationType)
  type: NotificationType;
}
