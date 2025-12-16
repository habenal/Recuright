import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto, UpdateJobDto } from './dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateJobDto, employerId: string) {
    return this.prisma.job.create({
      data: { ...dto, employerId },
    });
  }

  async findAll() {
    return this.prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  async update(id: string, dto: UpdateJobDto) {
    const job = await this.findOne(id);
    return this.prisma.job.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.job.delete({ where: { id } });
  }
}
