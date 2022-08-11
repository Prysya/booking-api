import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateHotelDto } from 'src/modules/hotels/dto/create-hotel.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Model } from 'mongoose';
import { Hotel, BookDocument } from 'src/modules/hotels/schemas/hotel.schema';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async create(createBookDto: CreateHotelDto): Promise<Hotel> {
    const createdBook = await this.bookModel.create(createBookDto);

    return createdBook;
  }

  async findAll(): Promise<Hotel[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Hotel> {
    return this.bookModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Hotel> {
    return this.bookModel.findOneAndUpdate({ _id: id }, updateBookDto, {
      lean: true,
      returnDocument: 'after',
    });
  }

  async delete(id: string) {
    const deletedBook = await this.bookModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedBook;
  }
}
