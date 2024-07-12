import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { channelType, seniorityType } from 'src/libs/enums';
import { frecuencyType } from 'src/libs/enums/frecuency.enum';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class BotsSubscription extends Document {

  @Prop({ required: true })
  communication: string;

  @Prop({ required: true })
  frequency: frecuencyType;

  @Prop({ required: true, enum: channelType })
  channel: channelType;

  @Prop({ required: true, enum: seniorityType })
  seniority: seniorityType;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  programmingLanguages: Record<string, any>;

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
