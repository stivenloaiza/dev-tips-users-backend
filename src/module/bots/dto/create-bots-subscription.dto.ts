import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import {
  channelType,
  devLanguageType,
  languageType,
  seniorityType,
} from 'src/libs/enums';

export class CreateBotsSubscriptionDto {
  @IsString()
  @ApiProperty()
  apikey: string;

  @IsString()
  @ApiProperty()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;

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
  @IsString()
  @IsNotEmpty()
  channelId: channelType;


  @ApiProperty()
  @IsEnum(seniorityType)
  @IsNotEmpty()
  level: seniorityType;

  @ApiProperty()
  @IsEnum(devLanguageType)
  @IsNotEmpty()
  technology: devLanguageType;

  @ApiProperty()
  @IsEnum(languageType)
  @IsNotEmpty()
  lang: languageType;

}
