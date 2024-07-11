import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { channel, language, level, programmingLanguage } from 'src/libs/enums';
import { User } from 'src/users/entities/user.entity';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class BotsSubscription extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true })
  communication: string;

  @Prop({ required: true, enum: level })
  level: level;

  @Prop({ required: true, enum: programmingLanguage })
  programmingLanguage: programmingLanguage;

  @Prop({ required: true })
  frequency: string;

  @Prop({ required: true, enum: channel })
  channel: channel;

  @Prop({ required: true, enum: language })
  language: language;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  updatedBy?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  deletedBy?: string;
}

export const BotsSubscriptionSchema =
  SchemaFactory.createForClass(BotsSubscription);
