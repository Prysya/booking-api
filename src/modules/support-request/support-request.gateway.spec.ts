import { Test, TestingModule } from '@nestjs/testing';
import { SupportRequestGateway } from 'src/modules/support-request/support-request.gateway';
import { SupportRequestService } from 'src/modules/support-request/support-request.service';

describe('SupportRequestGateway', () => {
  let gateway: SupportRequestGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupportRequestGateway, SupportRequestService],
    }).compile();

    gateway = module.get<SupportRequestGateway>(SupportRequestGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
