import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ required: true, ref: 'User' })
  userId: ID;

  @Prop({ required: true, ref: 'Hotel' })
  hotelId: ID;

  @Prop({ required: true, ref: 'HotelRoom' })
  roomId: ID;

  @Prop({ required: true })
  dateStart: Date;

  @Prop({ required: true })
  dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
