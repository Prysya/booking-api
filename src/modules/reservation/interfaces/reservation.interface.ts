import { IHotelRoom } from '../../hotel-room/interfaces/hotel-room.interface';
import { IHotel } from '../../hotels/interfaces/hotel.interface';
import { IUser } from '../../users/interfaces/users.interface';

export interface CreateReservationDto {
  readonly userId: ID | IUser;
  readonly hotelId: ID | IHotel;
  readonly roomId: ID | IHotelRoom;
  readonly dateStart: Date;
  readonly dateEnd: Date;
}

export interface IReservation extends CreateReservationDto {
  _id: ID;
}

export type ReservationBody = {
  hotelRoom: ID;
} & Pick<CreateReservationDto, 'dateStart' | 'dateEnd'>;

export type ReservationSearchOptions = {
  user: ID;
} & Partial<Pick<CreateReservationDto, 'dateStart' | 'dateEnd'>>;

export interface ReservationMethods {
  addReservation(data: CreateReservationDto): Promise<IReservation>;
  removeReservation(reservationId: ID, userId: ID): Promise<void>;
  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<IReservation>>;
}
