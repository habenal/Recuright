import { Controller, Post, Get, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { AssessmentsService } from './assessment.service';
import { CreateAssessmentDto, UpdateScoreDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('assessments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AssessmentsController {
  constructor(private assessmentsService: AssessmentsService) {}

  @Post()
  @Roles(Role.RECRUITER, Role.ADMIN)
  create(@Req() req, @Body() dto: CreateAssessmentDto) {
    return this.assessmentsService.create(dto, req.user.userId);
  }

  @Get('me')
  @Roles(Role.CANDIDATE)
  getMyAssessments(@Req() req) {
    return this.assessmentsService.getCandidateAssessments(req.user.userId);
  }

  @Patch(':id/score')
  @Roles(Role.RECRUITER, Role.ADMIN)
  updateScore(@Param('id') id: string, @Body() dto: UpdateScoreDto) {
    return this.assessmentsService.updateScore(id, dto);
  }

  @Get()
  @Roles(Role.RECRUITER, Role.ADMIN)
  getAll() {
    return this.assessmentsService.getAll();
  }
}
