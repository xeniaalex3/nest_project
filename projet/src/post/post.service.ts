import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Pos, Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Posts[]> {
    return this.prismaService.post.findMany();
  }

  async findOne(id: number): Promise<Posts | null> {
    return this.prismaService.post.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.PostCreateInput): Promise<Posts> {
    return this.prismaService.post.create({ data });
  }

  async update(id: number, data: Prisma.PostUpdateInput): Promise<Posts> {
    return this.prismaService.post.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Posts> {
    return this.prismaService.post.delete({ where: { id } });
  }

  async getCommentsByUserId(userId: number): Promise<Posts[]> {
    return this.prismaService.post.findMany({ where: { authorId: userId } });
  }
}
