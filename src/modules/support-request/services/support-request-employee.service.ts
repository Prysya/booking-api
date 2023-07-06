import {
  ISupportRequestEmployeeService,
  MarkMessagesAsReadDto,
  Message,
} from '../interfaces/support-request.interface';

import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MessageService } from '../../message/message.service';
import { SupportRequest } from '../schemas/support-request.schema';

@Injectable()
export class SupportRequestEmployeeService
  implements ISupportRequestEmployeeService
{
  constructor(
    @Inject() private SupportRequestModel: Model<SupportRequest>,
    private messageService: MessageService,
  ) {}
  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    await this.SupportRequestModel.updateMany(
      {
        user: params.user.toString(),
        createAt: { $gt: params.createdBefore },
        isActive: false,
      },
      { readAt: Date() },
    );
  }
  async getUnreadCount(supportRequest: ID): Promise<Message[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.messageService.unreadMessage(supportRequest.toString(), true);
  }
  async closeRequest(supportRequest: ID): Promise<void> {
    await this.SupportRequestModel.updateOne(
      { _id: supportRequest.toString() },
      { isActive: false },
    );
  }
}
