import { Module } from '@nestjs/common';
import { SupportRequestService } from 'src/modules/support-request/support-request.service';
import { SupportRequestGateway } from 'src/modules/support-request/support-request.gateway';

@Module({
  providers: [SupportRequestGateway, SupportRequestService],
})
export class SupportRequestModule {}
