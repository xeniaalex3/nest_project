import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, PostModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
