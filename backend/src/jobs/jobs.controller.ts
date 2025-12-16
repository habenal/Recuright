import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto, UpdateJobDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('jobs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Post()
  @Roles(Role.EMPLOYER)
  create(@Body() dto: CreateJobDto) {
    return this.jobsService.create(dto, 'employer-id'); // Replace with actual employerId from JWT
  }

  @Get()
  getAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.EMPLOYER)
  update(@Param('id') id: string, @Body() dto: UpdateJobDto) {
    return this.jobsService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.EMPLOYER)
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }
}
