import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validateEnv } from './config/env.validation';
import { LoggerModule } from 'nestjs-pino';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { AssessmentsModule } from './assessments/assessment.module';
import { JobsModule } from './jobs/jobs.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ApplicationsModule } from './applications/applications.module';
import { WorkersModule } from './workers/worker.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: validateEnv,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          level: config.get('LOG_LEVEL') || 'debug',
          transport: config.get('NODE_ENV') !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
        },
      }),
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    PaymentsModule,
    AssessmentsModule,
    JobsModule,
    NotificationsModule,
    ApplicationsModule,
    // WorkersModule,
  ],
  controllers: [HealthController],
})
export class AppModule { }
