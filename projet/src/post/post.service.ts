import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Post[]> {
    return this.prismaService.post.findMany();
  }

  async findOne(id: number): Promise<Post | null> {
    return this.prismaService.post.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    // Ajuste para 'PostsCreateInput'
    return this.prismaService.post.create({ data });
  }

  async update(id: number, data: Prisma.PostUpdateInput): Promise<Post> {
    // Ajuste para 'PostsUpdateInput'
    return this.prismaService.post.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Post> {
    return this.prismaService.post.delete({ where: { id } });
  }
}
