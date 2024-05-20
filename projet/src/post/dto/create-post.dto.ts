import { Prisma } from '@prisma/client';

export class CreatePostDto {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  title: string;
  authorId: number;
  comments: Prisma.InputJsonValue;
}
