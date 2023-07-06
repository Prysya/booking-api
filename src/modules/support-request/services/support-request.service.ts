import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  GetChatListParams,
  SendMessageDto,
} from '../interfaces/support-request.interface';
import { SupportRequest } from '../schemas/support-request.schema';
import { Message } from '../../message/schemas/message.schema';

interface ISupportRequestService {
  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(supportRequest: ID): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void;
}

@Injectable()
export class SupportRequestService implements ISupportRequestService {
  constructor(
    @Inject() private supportRequestModel: Model<SupportRequest>,
    @Inject() private messageModel: Model<Message>,
  ) {}

  async findSupportRequests(
    params: GetChatListParams,
  ): Promise<SupportRequest[]> {
    return this.supportRequestModel.find({
      user: params.user.toString(),
      isActive: true,
    });
  }

  async sendMessage(data: SendMessageDto): Promise<Message> {
    const message = await this.messageModel.create({
      author: data.author.toString(),
      createAt: Date(),
      text: data.text,
    });

    await this.supportRequestModel.updateOne(
      { id: data.supportRequest.toString() },
      { $push: { messages: message } },
    );

    return message;
  }

  async getMessages(supportRequest: ID): Promise<Message[]> {
    try {
      const request = await this.supportRequestModel.findOne({
        id: supportRequest.toString(),
      });

      return request.messages;
    } catch (err) {
      return [];
    }
  }

  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void {
    throw new Error('Method not implemented.');
  }
}
