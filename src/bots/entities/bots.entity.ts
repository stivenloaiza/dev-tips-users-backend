import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class BotsSubscription extends Document {
  @Prop({ required: true })
  frequency: string;

  @Prop({ required: true })
  channel: string;

  @Prop({ required: true })
  seniority: string;

  @Prop({ type: Object, required: true })
  programmingLanguages: Record<string, any>;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop()
  deletedBy: string;
}

export const BotsSubscriptionSchema = SchemaFactory.createForClass(BotsSubscription);
