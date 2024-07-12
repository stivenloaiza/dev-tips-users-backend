import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { devLanguageType, languageType, seniorityType } from 'src/libs/enums';
import { User } from 'src/module/users/entities/user.entity';

@Schema({ timestamps: true })
export class IframeSuscription extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true })
  communication: string;

  @Prop({ required: true, enum: seniorityType })
  seniority: seniorityType;

  @Prop({ required: true, enum: devLanguageType })
  devLanguage: devLanguageType;

  @Prop({ type: String, required: true })
  domains: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  typography: string;

  @Prop({ required: true, enum: languageType })
  language: languageType;
}

export const IframeSchema = SchemaFactory.createForClass(IframeSuscription);
