import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import validator from 'validator';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
    validate: (email: string) => {
      return validator.isEmail(email);
    },
  })
  email: string;

  @Prop({ required: true, select: false })
  passwordHash: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  contactPhone: string;

  @Prop({
    required: true,
    enum: ['client', 'admin', 'manager'],
    default: 'client',
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
