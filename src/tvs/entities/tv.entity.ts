import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { language, level, programmingLanguage } from 'src/libs/enums';
import { User } from 'src/users/entities/user.entity';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class TvSuscription extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ default: null })
  communication: string;

  @Prop({ required: true, enum: level })
  level: level;

  @Prop({ required: true, enum: programmingLanguage })
  programmingLanguage: programmingLanguage;

  @Prop({ required: true, enum: language })
  language: language;

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
