import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { HotelRoomService } from './hotel-room.service';
import type {
  CreateHotelRoomDto,
  SearchRoomsParams,
} from './interfaces/hotel-room.interface';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { FilesInterceptor } from '@nestjs/platform-express';
import { filterImageFiles, generateFileName } from './utils/hotel-room.utils';
import { Roles } from '../users/enums/users.enum';
import { Auth } from '../../authentication/decorators/auth.decorator';
import { User } from '../users/decorators/user.decorator';
import { CreateUserDto } from '../users/interfaces/users.interface';
import JwtCheckGuard from '../../common/guards/jwt-check.guard';

@Controller()
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Get('common/hotel-rooms')
  search(
    @Query('limit') limit: SearchRoomsParams['limit'],
    @Query('offset') offset: SearchRoomsParams['offset'],
    @Query('hotel') hotel: ID,
  ) {
    console.log(hotel);
    return this.hotelRoomService.search({ limit, offset, title: hotel });
  }

  @Auth([Roles.Admin])
  @Post('admin/hotel-rooms')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './public/hotel-rooms',
        filename: generateFileName,
      }),
      fileFilter: filterImageFiles,
    }),
  )
  create(
    @Body() createHotelRoomDto: Partial<CreateHotelRoomDto>,
    @UploadedFiles() images?: Array<Express.Multer.File>,
  ) {
    return this.hotelRoomService.create({
      ...createHotelRoomDto,
      images: images
        ? images.map((image) => '/public/hotel-rooms/' + image.filename)
        : [],
    });
  }

  @Get('common/hotel-rooms/:id')
  @UseGuards(JwtCheckGuard)
  findById(
    @Param('id', new IdValidationPipe()) id: string,
    @User() user: CreateUserDto,
  ) {
    console.log('++++++++++++++++++');
    console.log({ user });
    console.log('++++++++++++++++++');
    return this.hotelRoomService.findById(id);
  }

  @Auth([Roles.Admin])
  @Put('admin/hotel-rooms/:id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './public/hotel-rooms',
        filename: generateFileName,
      }),
      fileFilter: filterImageFiles,
    }),
  )
  async update(
    @Param('id', new IdValidationPipe()) id: string,
    @Body() createHotelRoomDto: Partial<CreateHotelRoomDto>,
    @UploadedFiles() images?: Array<Express.Multer.File>,
  ) {
    return this.hotelRoomService.update(id, {
      ...createHotelRoomDto,
      images: images
        ? images.map((image) => '/public/hotel-rooms/' + image.filename)
        : [],
    });
  }
}
