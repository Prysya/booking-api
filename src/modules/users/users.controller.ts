import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto, SearchUserParams } from './interfaces/users.interface';
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

  @Get('admin/users/')
  async getAllUsers(
    @Query('limit') limit?: SearchUserParams['limit'],
    @Query('offset') offset?: SearchUserParams['offset'],
    @Query('email') email?: SearchUserParams['email'],
    @Query('name') name?: SearchUserParams['name'],
    @Query('contactPhone') contactPhone?: SearchUserParams['contactPhone'],
  ) {
    return this.userService.findAll({
      limit,
      offset,
      email: email ?? '',
      name: name ?? '',
      contactPhone: contactPhone ?? '',
    });
  }

  @Get('manager/users/')
  async getAllUsersManager(
    @Query('limit') limit?: SearchUserParams['limit'],
    @Query('offset') offset?: SearchUserParams['offset'],
    @Query('email') email?: SearchUserParams['email'],
    @Query('name') name?: SearchUserParams['name'],
    @Query('contactPhone') contactPhone?: SearchUserParams['contactPhone'],
  ) {
    return this.userService.findAll({
      limit,
      offset,
      email: email ?? '',
      name: name ?? '',
      contactPhone: contactPhone ?? '',
    });
  }
}
