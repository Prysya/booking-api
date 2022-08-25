import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
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
  findById(@Param('id', new IdValidationPipe()) id: string) {
    return this.hotelRoomService.findById(id);
  }

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
    const test = await this.hotelRoomService.update(id, {
      ...createHotelRoomDto,
      images: images
        ? images.map((image) => '/public/hotel-rooms/' + image.filename)
        : [],
    });

    console.log(test);
    return test;
  }
}
