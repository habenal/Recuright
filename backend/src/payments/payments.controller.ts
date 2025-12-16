import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post()
  createPayment(@Req() req, @Body() dto: CreatePaymentDto) {
    return this.paymentsService.createPayment(req.user.userId, dto);
  }

  @Get()
  getMyPayments(@Req() req) {
    return this.paymentsService.getPayments(req.user.userId);
  }
}
