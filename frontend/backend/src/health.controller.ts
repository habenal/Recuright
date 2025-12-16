import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import Redis from 'ioredis';

@Controller('health')
export class HealthController {
  private redis: Redis;
  constructor(private prisma: PrismaService) {
    this.redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
    // prevent unhandled Redis errors from crashing the process
    this.redis.on('error', (err) => {
      // keep minimal logging here; Nest pino logger will also capture if needed
      // eslint-disable-next-line no-console
      console.warn('Redis connection error:', err?.message ?? err);
    });
  }

  @Get('healthz')
  healthz() {
    return { ok: true };
  }

  @Get('readiness')
  async readiness() {
    const details: { db: boolean; redis: boolean; errors: string[] } = {
      db: true,
      redis: true,
      errors: [],
    };

    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch (e) {
      details.db = false;
      details.errors.push('db');
    }

    try {
      await this.redis.ping();
    } catch (e) {
      details.redis = false;
      details.errors.push('redis');
    }

    return { ok: details.db && details.redis, details };
  }
}
