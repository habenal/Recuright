import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createLogger } from '../shared/logger';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }
  private logger = createLogger(process.env.NODE_ENV);
  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.info('Prisma connected');
    } catch (err) {
      this.logger.warn('Prisma connection failed — continuing without DB for now');
      this.logger.debug(err as any);
    }
  }
  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.info('Prisma disconnected');
    } catch (err) {
      this.logger.warn('Error disconnecting Prisma');
    }
  }
}
