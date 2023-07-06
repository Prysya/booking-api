import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';
import { Message, MessageSchema } from '../../message/schemas/message.schema';

export type SupportRequestDocument = SupportRequest & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class SupportRequest {
  @Prop({ required: true, ref: 'User', type: MongooseSchema.Types.ObjectId })
  user: ObjectId;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Message' })
  messages: Message[];

  @Prop()
  isActive: boolean;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
