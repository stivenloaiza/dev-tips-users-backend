import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  channelType,
  devLanguageType,
  seniorityType,
} from '../../../libs/enums/index';
import { frecuencyType } from '../../../libs/enums/frecuency.enum';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class BotsSubscription extends Document {
  @Prop({})
  apikey: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({})
  type: string;

  @Prop({ required: true })
  frequency: frecuencyType;

  @Prop({ required: true, enum: channelType })
  channelType: channelType;

  @Prop({ required: true, enum: seniorityType })
  level: seniorityType;

  @Prop({ enum: devLanguageType, required: true })
  technology: devLanguageType;

  @Prop({ required: true })
  lang: string;

  @Prop({ required: true })
  channelId: string;

  @Prop({ default: null })
  deletedAt?: Date;

  @Prop({ default: null })
  createdBy?: string;

  @Prop({ default: null })
  updatedBy?: string;

  @Prop({ default: null })
  deletedBy?: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const BotsSubscriptionSchema =
  SchemaFactory.createForClass(BotsSubscription);
