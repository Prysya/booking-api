import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsService } from 'src/modules/hotels/hotels.service';
import { HotelsController } from 'src/modules/hotels/hotels.controller';
import { Hotel, HotelSchema } from 'src/modules/hotels/schemas/hotel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
  ],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}
