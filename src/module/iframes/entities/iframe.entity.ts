import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { devLanguageType, languageType, seniorityType } from 'src/libs/enums';
import { User } from 'src/module/users/entities/user.entity';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class IframeSuscription extends Document {
  @Prop({})
  apikey: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop()
  type: string;

  @Prop({ required: true, enum: seniorityType })
  level: seniorityType;

  @Prop({ required: true, enum: devLanguageType })
  technology: devLanguageType;

  /* @Prop({ type: String, required: true })
  domains: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  typography: string; */

  @Prop({ required: true, enum: languageType })
  lang: languageType;

  @Prop({ type: MongooseSchema.Types.Mixed, default: null })
  iframe: any;

  @Prop({ default: null })
  deletedAt?: Date;

  @Prop({ default: null })
  createdBy?: string;

  @Prop({ default: null })
  updatedBy?: string;

  @Prop({ default: null })
  deletedBy?: string;
}

export const IframeSchema = SchemaFactory.createForClass(IframeSuscription);
