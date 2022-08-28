import { Injectable } from '@nestjs/common';
import { find } from 'rxjs';
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

const POPULATE_HOTEL_SELECT = 'title description _id';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private readonly hotelRoomModel: Model<HotelRoomDocument>,
  ) {}

  async create(data: Partial<CreateHotelRoomDto>): Promise<IHotelRoom> {
    const hotelRoom = await this.hotelRoomModel.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.hotelRoomModel
      .findOne({ _id: hotelRoom._id })
      .select('title description images hotel')
      .populate('hotel', POPULATE_HOTEL_SELECT)
      .exec();
  }

  findById(id: ID, isEnabled?: boolean): Promise<IHotelRoom> {
    return this.hotelRoomModel
      .findById(id)
      .select('title description images hotel')
      .populate('hotel', POPULATE_HOTEL_SELECT)
      .exec();
  }

  search(params: SearchRoomsParams): Promise<IHotelRoom[]> {
    return this.hotelRoomModel
      .find(
        { ...(Boolean(params.title) && { hotel: params.title }) },
        {},
        { limit: params.limit, skip: params.offset },
      )
      .select('title images hotel')
      .populate('hotel', POPULATE_HOTEL_SELECT)
      .exec();
  }

  update(id: ID, data: Partial<IHotelRoom>): Promise<IHotelRoom> {
    const dataWithoutImages = JSON.parse(JSON.stringify(data));
    delete dataWithoutImages.images;

    return this.hotelRoomModel
      .findOneAndUpdate(
        { _id: id },
        {
          $addToSet: { images: { $each: data.images } },
          $set: {
            ...dataWithoutImages,
            updatedAt: new Date(),
          },
        },
        {
          new: true,
        },
      )
      .select('title description images hotel')
      .populate('hotel', POPULATE_HOTEL_SELECT)
      .exec();
  }
}
