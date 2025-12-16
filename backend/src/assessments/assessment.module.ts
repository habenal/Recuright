import { Module } from '@nestjs/common';
import { AssessmentsService } from './assessment.service';
import { AssessmentsController } from './assessment.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AssessmentsService],
  controllers: [AssessmentsController],
})
export class AssessmentsModule {}
