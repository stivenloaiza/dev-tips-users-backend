import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { language, programmingLanguage, senority } from 'src/libs/enums';
import { User } from 'src/users/entities/user.entity';


@Schema({ timestamps: true })
export class IframeSuscription extends Document {

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: User;

    @Prop({ required: true })
    communication: string;

    @Prop({ required: true, enum: senority })
    seniority: senority;

    @Prop({ required: true, enum: programmingLanguage })
    programmingLanguage: programmingLanguage;

    @Prop({ type: String, required: true })
    domains: string;

    @Prop({ required: true })
    color: string;

    @Prop({ required: true })
    typography: string;

    @Prop({ required: true, enum: language })
    language: language;
}

export const IframeSchema = SchemaFactory.createForClass(IframeSuscription);
