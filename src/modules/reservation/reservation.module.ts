import { Module } from '@nestjs/common';
import { ReservationService } from 'src/modules/reservation/reservation.service';
import { ReservationController } from 'src/modules/reservation/reservation.controller';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
