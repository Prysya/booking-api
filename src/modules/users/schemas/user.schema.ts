import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import validator from 'validator';
import { Roles } from '../enums/users.enum';

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
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  contactPhone: string;

  @Prop({
    required: true,
    enum: Roles,
    default: 'client',
  })
  role: Roles;
}

export const UserSchema = SchemaFactory.createForClass(User);
