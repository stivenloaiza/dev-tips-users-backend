import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import {
  channelType,
  devLanguageType,
  languageType,
  seniorityType,
} from 'src/libs/enums';

export class CreateBotsSubscriptionDto {
  @IsString()
  userId?: string;

  @IsNotEmpty()
  @IsString()
  communication?: string;

  @IsString()
  @IsNotEmpty()
  frequency: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(channelType)
  channel: channelType;

  @IsEnum(seniorityType)
  @IsNotEmpty()
  level: seniorityType;

  @IsEnum(devLanguageType)
  @IsNotEmpty()
  devLanguage: devLanguageType;

  @IsEnum(languageType)
  @IsNotEmpty()
  language: languageType;
}
