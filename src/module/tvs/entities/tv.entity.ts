import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  devLanguageType,
  languageType,
  seniorityType,
} from '../../../libs/enums';
import { User } from '../../users/entities/user.entity';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class TvSuscription extends Document {
  @Prop()
  apikey: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({})
  type: string;

  @Prop({ required: true, enum: seniorityType })
  level: seniorityType;

  @Prop({ required: true, enum: devLanguageType })
  technology: devLanguageType;

  @Prop({ required: true, enum: languageType })
  lang: languageType;

  @Prop({ default: null })
  deletedAt?: Date;

  @Prop({ default: null })
  createdBy?: string;

  @Prop({ default: null })
  updatedBy?: string;

  @Prop({ default: null })
  deletedBy?: string;
}

export const TvSchema = SchemaFactory.createForClass(TvSuscription);
