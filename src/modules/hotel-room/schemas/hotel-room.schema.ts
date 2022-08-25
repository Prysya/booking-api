import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type HotelRoomDocument = HotelRoom & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class HotelRoom {
  @Prop({ ref: 'Hotel', type: MongooseSchema.Types.ObjectId })
  hotel: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({
    default: [],
    validate: (array: string[]) => {
      return array.length <= 10;
    },
  })
  images: string[];

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ default: true })
  isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
