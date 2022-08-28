import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Reservation {
  @Prop({ required: true, ref: 'User', type: MongooseSchema.Types.ObjectId })
  userId: ObjectId;

  @Prop({ required: true, ref: 'Hotel', type: MongooseSchema.Types.ObjectId })
  hotelId: ObjectId;

  @Prop({
    required: true,
    ref: 'HotelRoom',
    type: MongooseSchema.Types.ObjectId,
  })
  roomId: ObjectId;

  @Prop({ required: true })
  dateStart: Date;

  @Prop({ required: true })
  dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
