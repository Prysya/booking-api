import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
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

  addReservation(data: CreateReservationDto): Promise<IReservation> {
    return this.reservationModel.create(data);
  }

  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<IReservation>> {
    return this.reservationModel.find(filter).exec();
  }

  async removeReservation(id: ID, userId: ID): Promise<void> {
    try {
      await this.reservationModel.deleteOne({ _id: id, userId });
    } catch (err) {
      throw err;
    }
  }
}
