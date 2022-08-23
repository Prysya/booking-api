import { Injectable } from '@nestjs/common';
import type {
  CreateHotelRoomDto,
  IHotelRoom,
  IHotelRoomService,
  SearchRoomsParams,
} from './interfaces/hotel-room.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelRoom } from './schemas/hotel-room.schema';
import type { HotelRoomDocument } from './schemas/hotel-room.schema';
import { IHotel } from '../hotels/interfaces/hotel.interface';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private readonly hotelRoomModel: Model<HotelRoomDocument>,
  ) {}

  async create(
    data: Partial<CreateHotelRoomDto>,
  ): Promise<IHotelRoom & { hotel: IHotel }> {
    const hotelRoom = await this.hotelRoomModel.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.hotelRoomModel
      .find({ _id: hotelRoom._id })
      .select('-__v')
      .populate('hotel', '-__v')
      .exec();
  }

  findById(id: ID, isEnabled?: boolean): Promise<IHotelRoom> {
    return this.hotelRoomModel.findById(id).exec();
  }

  search(params: SearchRoomsParams): Promise<IHotelRoom[]> {
    return this.hotelRoomModel
      .find(
        { title: params.title },
        {},
        { limit: params.limit, skip: params.offset },
      )
      .exec();
  }

  update(id: ID, data: Partial<IHotelRoom>): Promise<IHotelRoom> {
    return this.hotelRoomModel
      .findByIdAndUpdate(
        id,
        {
          $push: { images: data.images },
          ...data,
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
      .populate('Hotel')
      .exec();
  }
}
