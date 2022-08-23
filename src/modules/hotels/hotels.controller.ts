import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto, HotelParams } from './interfaces/hotel.interface';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';

@Controller()
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get('admin/hotels')
  async search(
    @Query('limit') limit: HotelParams['limit'],
    @Query('offset') offset: HotelParams['offset'],
  ) {
    const hotels = await this.hotelsService.search({ limit, offset });
    return hotels.map(({ title, description, _id }) => ({
      id: _id,
      title,
      description,
    }));
  }

  @Get('common/hotels/:id')
  async findById(@Param('id', new IdValidationPipe()) id: string) {
    const hotel = await this.hotelsService.findById(id);
    return {
      id: hotel._id,
      title: hotel.title,
      description: hotel.description,
    };
  }

  @Post('admin/hotels')
  async create(@Body() createHotelDto: Partial<CreateHotelDto>) {
    const hotel = await this.hotelsService.create(createHotelDto);
    return {
      id: hotel._id,
      title: hotel.title,
      description: hotel.description,
    };
  }

  @Put('admin/hotels/:id')
  async update(
    @Param('id', new IdValidationPipe()) id: string,
    @Body() createHotelRoomDto: Pick<CreateHotelDto, 'title' | 'description'>,
  ) {
    const hotel = await this.hotelsService.update(id, createHotelRoomDto);
    return {
      id: hotel._id,
      title: hotel.title,
      description: hotel.description,
    };
  }
}
