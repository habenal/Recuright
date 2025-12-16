import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, ProfileDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.RECRUITER)
  getOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id/profile')
  @Roles(Role.CANDIDATE)
  updateProfile(@Param('id') id: string, @Body() dto: ProfileDto) {
    return this.usersService.updateProfile(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
