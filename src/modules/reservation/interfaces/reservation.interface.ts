export interface CreateReservationDto {
  user: ID;
  hotel: ID;
  room: ID;
  dateStart: Date;
  dateEnd: Date;
}

interface Reservation extends CreateReservationDto {
  _id: ID;
}

interface ReservationSearchOptions {
  user: ID;
  dateStart: Date;
  dateEnd: Date;
}
interface ReservationMethods {
  addReservation(data: CreateReservationDto): Promise<Reservation>;
  removeReservation(id: ID): Promise<void>;
  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<Reservation>>;
}
