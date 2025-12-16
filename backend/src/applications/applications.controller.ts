import { Controller, Post, Get, Patch, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto, UpdateStatusDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('applications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  // Candidate applies for a job
  @Post()
  @Roles(Role.CANDIDATE)
  apply(@Req() req, @Body() dto: CreateApplicationDto) {
    return this.applicationsService.apply(req.user.userId, dto);
  }

  // Candidate views their applications
  @Get()
  @Roles(Role.CANDIDATE)
  getMyApplications(@Req() req) {
    return this.applicationsService.getApplications(req.user.userId);
  }

  // Recruiter/Employer updates status
  @Patch(':id/status')
  @Roles(Role.EMPLOYER, Role.RECRUITER)
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.applicationsService.updateStatus(id, dto);
  }

  // Employer views all applications for a job
  @Get('job/:jobId')
  @Roles(Role.EMPLOYER)
  getByJob(@Param('jobId') jobId: string) {
    return this.applicationsService.getByJob(jobId);
  }
}
