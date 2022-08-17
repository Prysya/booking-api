import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto, HotelParams } from './interfaces/hotel.interface';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';

@Controller()
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get('admin/hotels')
  search(
    @Query('limit') limit: HotelParams['limit'],
    @Query('offset') offset: HotelParams['offset'],
  ) {
    return this.hotelsService.search({ limit, offset });
  }

  @Get('common/hotels/:id')
  findById(@Param('id', new IdValidationPipe()) id: string) {
    return this.hotelsService.findById(id);
  }

  @Post('admin/hotels')
  create(@Body() createHotelDto: Partial<CreateHotelDto>) {
    return this.hotelsService.create(createHotelDto);
  }

  @Put('admin/hotels/:id')
  update(
    @Param('id', new IdValidationPipe()) id: string,
    @Body() createHotelRoomDto: Pick<CreateHotelDto, 'title' | 'description'>,
  ) {
    return this.hotelsService.update(id, createHotelRoomDto);
  }
}
