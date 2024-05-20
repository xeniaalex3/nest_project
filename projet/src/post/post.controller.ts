import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PrismaPost, Prisma } from '@prisma/client';
import { HttpExceptionFilter } from 'src/exceptions/http-exception';
import { FailedException } from 'src/exceptions/failed.exception';
import { QuotaInterceptor } from 'src/interceptor/quota.interceptor';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
@UseFilters(HttpExceptionFilter)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @UseInterceptors(QuotaInterceptor)
  async findAll(): Promise<PrismaPost[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PrismaPost> {
    return this.postService.findOne(+id);
  }

  @Post()
  create(@Body() dataPost: CreatePostDto): Promise<PrismaPost> {
    if (!dataPost.authorId) {
      throw new FailedException('AuthorID is required');
    }

    const postData: Prisma.PostCreateInput = {
      title: dataPost.title,
      comments: dataPost.comments,
      author: { connect: { id: dataPost.authorId } },
    };

    return this.postService.create(postData);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dataUpdate: UpdatePostDto,
  ): Promise<PrismaPost> {
    return this.postService.update(+id, dataUpdate);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<PrismaPost> {
    return this.postService.remove(+id);
  }
}
