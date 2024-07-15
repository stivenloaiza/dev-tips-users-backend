import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { channelType, seniorityType } from 'src/libs/enums';
import { frecuencyType } from 'src/libs/enums/frecuency.enum';
import { User } from 'src/module/users/entities/user.entity';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class BotsSubscription extends Document {
  @Prop()
  apikey: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  frequency: frecuencyType;

  @Prop({ required: true, enum: channelType })
  channel: channelType;

  @Prop({ required: true, enum: seniorityType })
  levels: seniorityType;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  technology: Record<string, any>;

  @Prop({ required: true })
  lang: string;

  @Prop({ default: null })
  deletedAt?: Date;

  @Prop({ default: null })
  createdBy?: string;

  @Prop({ default: null })
  updatedBy?: string;

  @Prop({ default: null })
  deletedBy?: string;
}

export const BotsSubscriptionSchema = SchemaFactory.createForClass(BotsSubscription);
