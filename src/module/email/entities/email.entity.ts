import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { devLanguageType, languageType, seniorityType } from 'src/libs/enums';
import { frecuencyType } from 'src/libs/enums/frecuency.enum';
import { User } from 'src/module/users/entities/user.entity';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class EmailSubscription extends Document {
  @Prop()
  apikey?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop()
  type: string;

  @Prop({ required: true })
  frequency: frecuencyType;

  @Prop({ required: true, enum: seniorityType })
  level: seniorityType;

  @Prop({ required: true, enum: devLanguageType })
  technology: devLanguageType;

  @Prop({ required: true, enum: languageType })
  lang: languageType;

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

export const EmailSubscriptionSchema =
  SchemaFactory.createForClass(EmailSubscription);
