import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  CreateSupportRequestDto,
  ISupportRequestClientService,
  MarkMessagesAsReadDto,
} from '../interfaces/support-request.interface';
import {
  SupportRequest,
  SupportRequestSchema,
} from '../schemas/support-request.schema';
import { Message } from '../../message/schemas/message.schema';
import { MessageService } from '../../message/message.service';

@Injectable()
export class SupportRequestClientService
  implements ISupportRequestClientService
{
  constructor(
    @Inject(SupportRequestSchema)
    private SupportRequestModel: Model<SupportRequest>,
    private messageService: MessageService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async createSupportRequest(
    data: CreateSupportRequestDto,
  ): Promise<SupportRequest> {
    return this.SupportRequestModel.create(data);
  }

  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    const Messages = await this.SupportRequestModel.updateMany(
      {
        user: { $ne: params.user.toString() },
        createAt: { $gt: params.createdBefore },
        isActive: false,
      },
      { readAt: Date() },
    );
    return Messages;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async getUnreadCount(supportRequest: ID): Promise<Message[]> {
    const Messages = await this.messageService.unreadMessage(
      supportRequest.toString(),
    );

    return Messages;
  }
}
