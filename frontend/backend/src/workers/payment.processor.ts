import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PaymentsService } from '../payments/payments.service';

@Processor('payments')
export class PaymentsProcessor extends WorkerHost {
  constructor(private paymentsService: PaymentsService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'verify-payment':
        return this.handleVerifyPayment(job);
      default:
        throw new Error(`Unknown job name: ${job.name}`);
    }
  }

  async handleVerifyPayment(job: Job) {
    const { transactionId } = job.data;
    // Here you would verify the payment with Stripe or Telebirr
    // For example, call PaymentsService.confirmPayment
    await this.paymentsService.confirmPayment(transactionId, 'COMPLETED');
  }
}
