import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto, UpdateStatusDto, ApplicationStatus } from './dto';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async apply(userId: string, dto: CreateApplicationDto) {
    const job = await this.prisma.job.findUnique({ where: { id: dto.jobId } });
    if (!job) throw new NotFoundException('Job not found');

    return this.prisma.application.create({
      data: {
        candidateId: userId,
        jobId: dto.jobId,
        coverLetter: dto.coverLetter,
        status: ApplicationStatus.APPLIED,
      },
    });
  }

  async getApplications(userId: string) {
    return this.prisma.application.findMany({
      where: { candidateId: userId },
      include: { job: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(applicationId: string, dto: UpdateStatusDto) {
    const app = await this.prisma.application.findUnique({ where: { id: applicationId } });
    if (!app) throw new NotFoundException('Application not found');

    return this.prisma.application.update({
      where: { id: applicationId },
      data: { status: dto.status },
    });
  }

  async getByJob(jobId: string) {
    return this.prisma.application.findMany({
      where: { jobId },
      include: { candidate: true },
    });
  }
}
