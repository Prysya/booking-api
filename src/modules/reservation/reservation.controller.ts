import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import * as moment from 'moment';
import { HotelRoomService } from '../hotel-room/hotel-room.service';
import { ReservationService } from './reservation.service';
import { ReservationBody } from './interfaces/reservation.interface';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { Auth } from '../../authentication/decorators/auth.decorator';
import { Roles } from '../users/enums/users.enum';

const USER_ID = '63088fe94374de6a254aece1';

@Controller('')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly hotelRoomService: HotelRoomService,
  ) {}

  @Auth([Roles.Client])
  @Post('client/reservations')
  async addReservation(@Body() reservationBody: ReservationBody) {
    const { hotel } = await this.hotelRoomService.findById(
      reservationBody.hotelRoom,
    );

    const reservation = await this.reservationService.addReservation({
      dateStart: moment(reservationBody.dateStart, 'DD.MM.YYYY').toDate(),
      dateEnd: moment(reservationBody.dateEnd, 'DD.MM.YYYY').toDate(),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      hotelId: typeof hotel === 'string' ? hotel : hotel._id,
      roomId: reservationBody.hotelRoom,
      userId: USER_ID,
    });

    return {
      startDate: moment(reservation.dateStart).format('DD.MM.YYYY'),
      endDate: moment(reservation.dateEnd).format('DD.MM.YYYY'),
      hotelRoom: reservation.roomId,
      hotel: reservation.hotelId,
      id: reservation._id,
    };
  }

  @Auth([Roles.Client])
  @Get('client/reservations')
  async getReservations(
    @Query('dateStart') dateStart: string,
    @Query('dateEnd') dateEnd: string,
  ) {
    const reservations = await this.reservationService.getReservations({
      user: USER_ID,
      ...(dateStart && {
        dateStart: moment(dateStart, 'DD.MM.YYYY').toDate(),
      }),
      ...(dateEnd && { dateStart: moment(dateEnd, 'DD.MM.YYYY').toDate() }),
    });

    return reservations.map((reservation) => ({
      startDate: moment(reservation.dateStart).format('DD.MM.YYYY'),
      endDate: moment(reservation.dateEnd).format('DD.MM.YYYY'),
      hotelRoom: reservation.roomId,
      hotel: reservation.hotelId,
      id: reservation._id,
    }));
  }

  @Auth([Roles.Client])
  @Delete('client/reservations/:id')
  deleteByClient(@Param('id', new IdValidationPipe()) id: ID) {
    return this.reservationService.removeReservation(id, USER_ID);
  }

  @Auth([Roles.Manager])
  @Get('manager/reservations/:userId')
  async getUserReservations(
    @Param('userId', new IdValidationPipe()) userId: ID,
    @Query('dateStart') dateStart: string,
    @Query('dateEnd') dateEnd: string,
  ) {
    const reservations = await this.reservationService.getReservations({
      ...(dateStart && {
        dateStart: moment(dateStart, 'DD.MM.YYYY').toDate(),
      }),
      ...(dateEnd && { dateStart: moment(dateEnd, 'DD.MM.YYYY').toDate() }),
      user: userId,
    });

    return reservations.map((reservation) => ({
      startDate: moment(reservation.dateStart).format('DD.MM.YYYY'),
      endDate: moment(reservation.dateEnd).format('DD.MM.YYYY'),
      hotelRoom: reservation.roomId,
      hotel: reservation.hotelId,
      id: reservation._id,
    }));
  }

  @Auth([Roles.Manager])
  @Delete('manager/reservations/:userId/:reservationId')
  deleteUserReservation(
    @Param('userId', new IdValidationPipe()) userId: ID,
    @Param('reservationId', new IdValidationPipe()) reservationId: ID,
  ) {
    return this.reservationService.removeReservation(reservationId, userId);
  }
}
