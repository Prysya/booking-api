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
import { HotelRoomService } from './hotel-room.service';
import {
  CreateHotelRoomDto,
  SearchRoomsParams,
} from './interfaces/hotel-room.interface';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { FilesInterceptor } from '@nestjs/platform-express';

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
    return this.hotelRoomService.search({ limit, offset, title: '' });
  }

  @Get('common/hotel-rooms/:id')
  findById(@Param('id', new IdValidationPipe()) id: string) {
    return this.hotelRoomService.findById(id);
  }

  @Post('admin/hotel-rooms')
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() createHotelRoomDto: Partial<CreateHotelRoomDto>,
  ) {
    return this.hotelRoomService.create({
      ...createHotelRoomDto,
      images: images.map((image) => image.path),
    });
  }

  @Put('admin/hotel-rooms/:id')
  @UseInterceptors(FilesInterceptor('files'))
  update(
    @Param('id', new IdValidationPipe()) id: string,
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() createHotelRoomDto: Partial<CreateHotelRoomDto>,
  ) {
    return this.hotelRoomService.update(id, {
      ...createHotelRoomDto,
      images: images.map((image) => image.path),
    });
  }
}
