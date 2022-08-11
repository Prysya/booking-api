import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { HotelsService } from 'src/modules/hotels/hotels.service';
import { CreateHotelDto } from 'src/modules/hotels/dto/create-hotel.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation.pipe';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { createHotelSchema } from './/joi/createBook.schema';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly booksService: HotelsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.booksService.findAll();
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createHotelSchema))
  create(@Body() createBookDto: CreateHotelDto) {
    return this.booksService.create(createBookDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new IdValidationPipe()) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.delete(id);
  }
}
