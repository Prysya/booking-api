import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto, HotelParams } from './interfaces/hotel.interface';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { Roles } from '../users/enums/users.enum';
import { Auth } from '../../authentication/decorators/auth.decorator';
import JwtCheckGuard from '../../common/guards/jwt-check.guard';

@Controller()
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Auth([Roles.Admin])
  @Get('admin/hotels')
  async search(
    @Query('limit') limit: HotelParams['limit'],
    @Query('offset') offset: HotelParams['offset'],
  ) {
    return this.hotelsService.search({ limit, offset });
  }

  @UseGuards(JwtCheckGuard)
  @Get('common/hotels/:id')
  findById(@Param('id', new IdValidationPipe()) id: string) {
    return this.hotelsService.findById(id);
  }

  @Auth([Roles.Admin])
  @Post('admin/hotels')
  create(@Body() createHotelDto: Partial<CreateHotelDto>) {
    return this.hotelsService.create(createHotelDto);
  }

  @Auth([Roles.Admin])
  @Put('admin/hotels/:id')
  update(
    @Param('id', new IdValidationPipe()) id: string,
    @Body() createHotelRoomDto: Pick<CreateHotelDto, 'title' | 'description'>,
  ) {
    return this.hotelsService.update(id, createHotelRoomDto);
  }
}
