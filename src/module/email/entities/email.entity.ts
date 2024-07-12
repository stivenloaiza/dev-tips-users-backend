import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { devLanguageType, languageType, seniorityType } from 'src/libs/enums';
import { frecuencyType } from 'src/libs/enums/frecuency.enum';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class EmailSubscription extends Document {
  @Prop()
  apikey: string;

  @Prop()
  userId: string;

  @Prop({required:true})
  frequency: frecuencyType;

  @Prop({required:true})
  seniority: seniorityType;

  @Prop({required:true})
  devLanguage: devLanguageType;

  @Prop({required:true})
  language: languageType;

  @Prop()
  createdAt: Date;

  @Prop()
  ubdatedAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop()
  createdBy?: string;

  @Prop()
  updatedBy?: string;

  @Prop()
  deletedBy?: string;
}

export const EmailSubscriptionSchema = SchemaFactory.createForClass(EmailSubscription);
