import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto, PaymentType } from './dto';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2025-02-24.acacia',
    });
  }

  async createPayment(userId: string, dto: CreatePaymentDto) {
    // Create Stripe PaymentIntent if method is Stripe
    if (dto.method === 'STRIPE') {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(dto.amount * 100), // Stripe uses cents
        currency: dto.currency,
        metadata: { userId, type: dto.type },
      });

      await this.prisma.payment.create({
        data: {
          userId,
          amount: dto.amount,
          currency: dto.currency,
          type: dto.type,
          method: 'STRIPE',
          status: 'PENDING',
          transactionId: paymentIntent.id,
        },
      });

      return { client_secret: paymentIntent.client_secret };
    }

    // Telebirr integration placeholder
    if (dto.method === 'TELEBIRR') {
      // Normally, you would call Telebirr API here
      const transactionId = `TELEBIRR_${Date.now()}`;
      await this.prisma.payment.create({
        data: {
          userId,
          amount: dto.amount,
          currency: dto.currency,
          type: dto.type,
          method: 'TELEBIRR',
          status: 'PENDING',
          transactionId,
        },
      });

      return { transactionId, message: 'Telebirr integration pending' };
    }

    throw new BadRequestException('Unsupported payment method');
  }

  async getPayments(userId: string) {
    return this.prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async confirmPayment(transactionId: string, status: 'COMPLETED' | 'FAILED') {
    return this.prisma.payment.update({
      where: { transactionId },
      data: { status },
    });
  }
}
