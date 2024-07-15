import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import {
  channelType,
  devLanguageType,
  languageType,
  seniorityType,
} from 'src/libs/enums';

export class CreateBotsSubscriptionDto {
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  typeSubscription: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  frequency: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(channelType)
  channel: channelType;

  @ApiProperty()
  @IsEnum(seniorityType)
  @IsNotEmpty()
  level: seniorityType;

  @ApiProperty()
  @IsEnum(devLanguageType)
  @IsNotEmpty()
  devLanguage: devLanguageType;

  @ApiProperty()
  @IsEnum(languageType)
  @IsNotEmpty()
  language: languageType;
}
