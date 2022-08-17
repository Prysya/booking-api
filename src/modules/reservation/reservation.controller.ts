import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationBody } from './interfaces/reservation.interface';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('client/reservations')
  addReservation(@Body() reservationBody: ReservationBody) {
    return this.reservationService.addReservation({
      dateEnd: reservationBody.endDate,
      dateStart: reservationBody.startDate,
      hotelId: '',
      roomId: reservationBody.hotelRoom,
      userId: '',
    });
  }

  @Get('client/reservations')
  getReservations() {
    return this.reservationService.getReservations({
      dateEnd: new Date(),
      dateStart: new Date(),
      user: '',
    });
  }

  @Delete('client/reservations/:id')
  deleteByClient(@Param('id', new IdValidationPipe()) id: ID) {
    return this.reservationService.removeReservation(id, '');
  }

  @Get('manager/reservations/:userId')
  getUserReservations(@Param('userId', new IdValidationPipe()) userId: ID) {
    return this.reservationService.getReservations({
      dateEnd: new Date(),
      dateStart: new Date(),
      user: userId,
    });
  }

  @Delete('manager/reservations/:userId/:reservationId')
  deleteUserReservation(
    @Param('userId', new IdValidationPipe()) userId: ID,
    @Param('reservationId', new IdValidationPipe()) reservationId: ID,
  ) {
    return this.reservationService.removeReservation(reservationId, userId);
  }
}
