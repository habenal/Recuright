import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (config: ConfigService) => ({ connection: { url: config.get('REDIS_URL') } }),
      inject: [ConfigService]
    })
  ]
})
export class SharedModule {}
