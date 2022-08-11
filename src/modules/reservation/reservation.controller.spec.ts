import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from 'src/modules/reservation/reservation.controller';
import { ReservationService } from 'src/modules/reservation/reservation.service';

describe('ReservationController', () => {
  let controller: ReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [ReservationService],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
