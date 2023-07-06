import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import * as moment from 'moment';
import { HotelRoomService } from '../hotel-room/hotel-room.service';
import { ReservationService } from './reservation.service';
import { ReservationBody } from './interfaces/reservation.interface';
import { IdValidationPipe } from '../../common/pipes/id-validation.pipe';
import { Auth } from '../../authentication/decorators/auth.decorator';
import { Roles } from '../users/enums/users.enum';
import { RequestWithUser } from '../../authentication/interfaces/request-with-user.intarface';
import { CreateSupportRequest } from './interfaces/support-request.interface';
import {SupportRequestService} from "./services/support-request.service";

@Controller('')
export class SupportRequestController {
  constructor(private readonly supportRequestService: SupportRequestService) {}

  @Auth([Roles.Client])
  @Post('client/support-requests')
  async addReservation(
    @Body() reservationBody: Pick<CreateSupportRequest, 'text'>,
    @Req() request: RequestWithUser,
  ) {
    return this.supportRequestService.sendMessage({
      author: request.user._id,
      createdAt: new Date(),
      message
    })
  }





  @Auth([Roles.Client])
  @Get('client/reservations')
  async getReservations(
    @Query('dateStart') dateStart: string,
    @Query('dateEnd') dateEnd: string,
    @Req() request: RequestWithUser,
  ) {
    const reservations = await this.reservationService.getReservations({
      user: request.user._id,
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
  deleteByClient(
    @Param('id', new IdValidationPipe()) id: ID,
    @Req() request: RequestWithUser,
  ) {
    return this.reservationService.removeReservation(id, request.user._id);
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
