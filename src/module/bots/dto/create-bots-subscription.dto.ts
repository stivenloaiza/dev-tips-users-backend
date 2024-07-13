import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import {
  channelType,
  devLanguageType,
  langType,
  levelType,
} from 'src/libs/enums';

export class CreateBotsSubscriptionDto {
  @IsString()
  userId?: string;

  @IsNotEmpty()
  @IsString()
  typeSubscription?: string;

  @IsString()
  @IsNotEmpty()
  frequency: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(channelType)
  channel: channelType;

  @IsEnum(levelType)
  @IsNotEmpty()
  levels: levelType;

  @IsEnum(devLanguageType)
  @IsNotEmpty()
  technology: devLanguageType;

  @IsEnum(langType)
  @IsNotEmpty()
  lang: langType;
}
