import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Email extends Document {
  @Prop()
  apikey: string;

  @Prop()
  frequency: string;

  @Prop()
  seniority: string;

  @Prop()
  programmingLanguages: Object;

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

export const email = SchemaFactory.createForClass(Email);
