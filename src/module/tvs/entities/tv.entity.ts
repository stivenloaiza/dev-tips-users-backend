import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { devLanguageType, languageType, seniorityType } from 'src/libs/enums';
import { User } from 'src/module/users/entities/user.entity';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class TvSuscription extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true })
  communication: string;

  @Prop({ required: true, enum: seniorityType })
  seniority: seniorityType;

  @Prop({ required: true, enum: devLanguageType })
  programmingLanguage: devLanguageType;

  @Prop({ required: true, enum: languageType })
  language: languageType;

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
