import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from './schemas/hotel.schema';
import type {
  CreateHotelDto,
  HotelParams,
  IHotel,
  IHotelService,
} from './interfaces/hotel.interface';

@Injectable()
export class HotelsService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name) private readonly hotelModel: Model<HotelDocument>,
  ) {}

  create(data: Partial<CreateHotelDto>): Promise<IHotel> {
    return this.hotelModel.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  findById(id: ID): Promise<IHotel> {
    return this.hotelModel.findById(id).exec();
  }

  search(params: HotelParams): Promise<IHotel[]> {
    return this.hotelModel
      .find({}, {}, { limit: params.limit, skip: params.offset })
      .exec();
  }

  update(id: ID, data: Partial<CreateHotelDto>): Promise<IHotel> {
    return this.hotelModel
      .findByIdAndUpdate(
        id,
        {
          ...data,
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
      .exec();
  }
}
