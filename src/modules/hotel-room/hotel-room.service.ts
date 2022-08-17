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

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private readonly hotelRoomModel: Model<HotelRoomDocument>,
  ) {}

  create(data: Partial<CreateHotelRoomDto>): Promise<IHotelRoom> {
    return this.hotelRoomModel.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
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
