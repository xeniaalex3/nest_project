import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @Post()
  public async create(
    @Body() createUserDto: Prisma.UserCreateInput,
  ): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(+id);
  }
}
