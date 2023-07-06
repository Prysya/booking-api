import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Message {
  @Prop({ required: true, ref: 'User', type: MongooseSchema.Types.ObjectId })
  author: ObjectId;

  @Prop({ required: true })
  sentAt: Date;

  @Prop({ required: true })
  text: string;

  @Prop()
  readAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
