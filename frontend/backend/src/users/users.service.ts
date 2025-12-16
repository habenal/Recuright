import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto, ProfileDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      include: { profile: true },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(userId: string, dto: ProfileDto) {
    return this.prisma.profile.upsert({
      where: { userId },
      update: { ...dto },
      create: { ...dto, userId },
    });
  }

  async deleteUser(userId: string) {
    await this.prisma.user.delete({ where: { id: userId } });
    return { message: 'User deleted successfully' };
  }
}
