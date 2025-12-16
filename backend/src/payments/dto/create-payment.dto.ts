import { IsNumber, IsNotEmpty, IsString, IsEnum } from 'class-validator';

export enum PaymentType {
  REGISTRATION = 'REGISTRATION',
  CV_SERVICE = 'CV_SERVICE',
}

export class CreatePaymentDto {
  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsEnum(PaymentType)
  type: PaymentType;

  @IsString()
  @IsNotEmpty()
  method: string; // "stripe" or "telebirr"
}
