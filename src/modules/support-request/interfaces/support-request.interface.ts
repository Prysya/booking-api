export interface CreateMessageDto {
  author: ID;
  sentAt: Date;
  text: string;
  readAt?: Date;
}

export interface CreateSupportRequestDto {
  user: ID;
  createdAt: Date;
  messages: Message[];
  isActive?: boolean;
}

export interface ISupportRequest extends CreateSupportRequestDto {
  _id: ID;
}

export interface Message extends CreateMessageDto {
  _id: ID;
}

export interface CreateSupportRequest {
  user: ID;
  text: string;
}

export interface SendMessageDto {
  author: ID;
  supportRequest: ID;
  text: string;
}
export interface MarkMessagesAsReadDto {
  user: ID;
  supportRequest: ID;
  createdBefore: Date;
}

export interface GetChatListParams {
  user: ID | null;
  isActive: boolean;
}

export interface ISupportRequestService {
  findSupportRequests(params: GetChatListParams): Promise<ISupportRequest[]>;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(supportRequest: ID): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: ISupportRequest, message: Message) => void,
  ): () => void;
}

export interface ISupportRequestClientService {
  createSupportRequest(data: CreateSupportRequest): Promise<ISupportRequest>;
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: ID): Promise<Message[]>;
}

export interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: ID): Promise<Message[]>;
  closeRequest(supportRequest: ID): Promise<void>;
}
