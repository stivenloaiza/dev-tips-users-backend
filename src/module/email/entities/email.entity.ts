import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class EmailSubscription extends Document {
  @Prop()
  apikey: string;

  @Prop({required:true})
  frequency: string;

  @Prop({required:true})
  seniority: string;

  @Prop({required:true})
  devLanguage: string;

  @Prop({required:true})
  language: string

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

export const email = SchemaFactory.createForClass(EmailSubscription);
