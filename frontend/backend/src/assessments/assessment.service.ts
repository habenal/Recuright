import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssessmentDto, UpdateScoreDto } from './dto';

@Injectable()
export class AssessmentsService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateAssessmentDto, candidateId: string) {
    return this.prisma.assessment.create({
      data: {
        ...dto,
        status: 'PENDING',
        title: dto.title!, // Assert title is present or ensure DTO requires it
        candidate: {
          connect: { id: candidateId },
        },
      },
    });
  }

  async getCandidateAssessments(candidateId: string) {
    return this.prisma.assessment.findMany({
      where: { candidateId },
      orderBy: { scheduledAt: 'asc' },
    });
  }

  async updateScore(assessmentId: string, dto: UpdateScoreDto) {
    const assessment = await this.prisma.assessment.findUnique({ where: { id: assessmentId } });
    if (!assessment) throw new NotFoundException('Assessment not found');

    return this.prisma.assessment.update({
      where: { id: assessmentId },
      data: { score: dto.score, status: 'COMPLETED' },
    });
  }

  async getAll() {
    return this.prisma.assessment.findMany();
  }
}
