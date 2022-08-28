import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './interfaces/users.interface';
import { UsersService } from './users.service';

@Controller('')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('admin/users')
  async createUserWithRole(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
