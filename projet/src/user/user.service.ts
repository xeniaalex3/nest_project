import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany({
      include: {
        posts: true,
      },
    });
  }

  public async findOne(id: number): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });
  }

  public async create(userData: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.upsert({
      where: {
        email: userData.email,
      },
      update: {},
      create: {
        ...userData,
      },
    });
  }

  public async update(
    id: number,
    userDto: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...userDto,
      },
    });
  }

  public async remove(id: number): Promise<User> {
    return this.prismaService.user.delete({ where: { id } });
  }
}
