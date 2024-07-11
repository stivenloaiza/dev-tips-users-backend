import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class BotsSubscription extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true })
  frequency: string;

  @Prop({ required: true })
  channel: string;

  @Prop({ required: true })
  seniority: string;

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
