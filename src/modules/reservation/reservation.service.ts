import { Model } from 'mongoose';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  CreateReservationDto,
  IReservation,
  ReservationMethods,
  ReservationSearchOptions,
} from './interfaces/reservation.interface';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReservationService implements ReservationMethods {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<ReservationDocument>,
  ) {}

  async addReservation(data: CreateReservationDto): Promise<IReservation> {
    const reservation = await this.reservationModel.create(data);

    return this.reservationModel
      .findOne({ _id: reservation._id })
      .select('dateStart dateEnd roomId hotelId _id')
      .populate('roomId', 'title description images -_id')
      .populate('hotelId', 'title description -_id')
      .exec();
  }

  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<IReservation>> {
    return this.reservationModel
      .find({
        userId: filter.user,
        ...(filter.dateStart && { dateStart: { $gte: filter.dateStart } }),
        ...(filter.dateEnd && { dateEnd: { $gte: filter.dateEnd } }),
      })
      .select('dateStart dateEnd roomId hotelId _id')
      .populate('roomId', 'title description images -_id')
      .populate('hotelId', 'title description -_id')
      .exec();
  }

  async removeReservation(id: ID, userId: ID): Promise<void> {
    const reservation = await this.reservationModel.findOne(
      { _id: id },
      'userId',
    );

    if (reservation === null) {
      throw new BadRequestException('Бронь с указанным id не существует');
    }

    if (reservation.userId !== userId) {
      throw new ForbiddenException(
        'id текущего пользователя не совпадает с id пользователя в брони',
      );
    }

    await this.reservationModel
      .deleteOne({ _id: id })
      .populate('roomId')
      .populate('hotelId')
      .populate('userId');
  }
}
