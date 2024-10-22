import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../../../libs/enums/index';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, enum: UserRole })
  role: UserRole;

  @Prop({
    required: function () {
      return this.role === UserRole.COMPANY;
    },
  })
  managerName?: string;

  @Prop({
    required: function () {
      return this.role === UserRole.COMPANY;
    },
  })
  managerEmail?: string;

  @Prop({
    required: function () {
      return this.role === UserRole.COMPANY;
    },
  })
  managerPhone?: string;

  @Prop({ required: true })
  subscriptions: string[] = [];

  @Prop({ default: null })
  deletedAt?: Date;

  @Prop({ default: null })
  createdBy?: string;

  @Prop({ default: null })
  updatedBy?: string;

  @Prop({ default: null })
  deletedBy?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
