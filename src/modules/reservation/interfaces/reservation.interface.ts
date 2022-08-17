export interface CreateReservationDto {
  readonly userId: ID;
  readonly hotelId: ID;
  readonly roomId: ID;
  readonly dateStart: Date;
  readonly dateEnd: Date;
}

export interface IReservation extends CreateReservationDto {
  _id: ID;
}

export interface ReservationBody {
  hotelRoom: ID;
  startDate: Date;
  endDate: Date;
}

export interface ReservationSearchOptions {
  user: ID;
  dateStart: Date;
  dateEnd: Date;
}
export interface ReservationMethods {
  addReservation(data: CreateReservationDto): Promise<IReservation>;
  removeReservation(reservationId: ID, userId: ID): Promise<void>;
  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<IReservation>>;
}
