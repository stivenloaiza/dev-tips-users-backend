import { language, level, programmingLanguage } from 'src/libs/enums';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Types } from 'mongoose';

export class CreateIframeDto {
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  communication: string;

  @IsEnum(level)
  @IsNotEmpty()
  level: level;

  @IsEnum(programmingLanguage)
  @IsNotEmpty()
  programmingLanguage: programmingLanguage;

  @IsString()
  @IsNotEmpty()
  domains: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  typography: string;

  @IsEnum(language)
  @IsNotEmpty()
  language: language;
}
