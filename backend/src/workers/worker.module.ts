import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { NotificationsProcessor } from './notifications.processor';
import { PaymentsProcessor } from './payment.processor';
import { NotificationsModule } from '../notifications/notifications.module';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    }),
    BullModule.registerQueue(
      { name: 'notifications' },
      { name: 'payments' },
    ),
    NotificationsModule,
    PaymentsModule,
  ],
  providers: [NotificationsProcessor, PaymentsProcessor],
})
export class WorkersModule { }
