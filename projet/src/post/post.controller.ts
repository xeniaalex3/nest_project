import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PrismaPost, Prisma } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(): Promise<PrismaPost[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PrismaPost> {
    return this.postService.findOne(+id);
  }

  @Post()
  create(@Body() data: Prisma.PostCreateInput): Promise<PrismaPost> {
    return this.postService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.PostUpdateInput,
  ): Promise<PrismaPost> {
    return this.postService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<PrismaPost> {
    return this.postService.remove(+id);
  }

  // @Get('user/:userId')
  // async getPostByUserId(
  //   @Param('userId') userId: number,
  // ): Promise<PrismaPost[]> {
  //   return this.postService.getPostByUserId(userId);
  // }
}
