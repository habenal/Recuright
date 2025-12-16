import { Processor, WorkerHost } from '@nestjs/bullmq';
import { QueueEvents, Job } from 'bullmq';
import { NotificationsService } from '../notifications/notifications.service';

@Processor('notifications')
export class NotificationsProcessor extends WorkerHost {
  constructor(private notificationsService: NotificationsService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'send-notification':
        return this.handleSendNotification(job);
      default:
        throw new Error(`Unknown job name: ${job.name}`);
    }
  }

  async handleSendNotification(job: Job) {
    const { recipient, message, type } = job.data;
    await this.notificationsService.sendNotification({ recipient, message, type });
  }
}
