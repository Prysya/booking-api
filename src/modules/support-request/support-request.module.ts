import { Module } from '@nestjs/common';
import { SupportRequestGateway } from 'src/modules/support-request/support-request.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SupportRequest,
  SupportRequestSchema,
} from './schemas/support-request.schema';
import { MessageSchema, Message } from '../message/schemas/message.schema';
import { SupportRequestController } from './support-request.controller';
import { SupportRequestService } from './services/support-request.service';
import { SupportRequestClientService } from './services/support-request-client.service';
import { SupportRequestEmployeeService } from './services/support-request-employee.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [SupportRequestController],
  providers: [
    SupportRequestGateway,
    SupportRequestService,
    SupportRequestClientService,
    SupportRequestEmployeeService,
  ],
})
export class SupportRequestModule {}
