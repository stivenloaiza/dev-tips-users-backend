import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { devLanguageType, langType, levelType } from 'src/libs/enums';
import { User } from 'src/module/users/entities/user.entity';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class IframeSuscription extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ default: null })
  communication: string;

  @Prop({ required: true, enum: levelType })
  levels: levelType;

  @Prop({ required: true, enum: devLanguageType })
  technology: devLanguageType;

  @Prop({ type: String, required: true })
  domains: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  typography: string;

  @Prop({ required: true, enum: langType })
  lang: langType;

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
