import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import {
  channelType,
  devLanguageType,
  languageType,
  seniorityType,
} from 'src/libs/enums';

export class CreateBotsSubscriptionDto {
  @ApiProperty({
    description: 'API key for the bots subscription',
    example: '12345-abcde',
  })
  @IsString()
  @IsNotEmpty()
  apikey: string;

  @ApiProperty({
    description: 'User ID for the bots subscription',
    example: 'user123',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Type of ?',
    example: '?',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'Frequency of the bots subscription',
    example: 'weekly',
  })
  @IsString()
  @IsNotEmpty()
  frequency: string;

  @ApiProperty({
    description: 'Channel type of the bots subscription',
    example: 'Telegram',
    enum: channelType,
  })
  @IsEnum(channelType)
  @IsNotEmpty()
  channelType: channelType;

  @ApiProperty({
    description: 'Seniority level of the bots subscription',
    example: 'junior',
    enum: seniorityType,
  })
  @IsEnum(seniorityType)
  @IsNotEmpty()
  level: seniorityType;

  @ApiProperty({
    description: 'Technology used in the bots subscription',
    example: 'TypeScript',
    enum: devLanguageType,
  })
  @IsEnum(devLanguageType)
  @IsNotEmpty()
  technology: devLanguageType;

  @ApiProperty({
    description: 'Language of the bots subscription',
    example: 'English',
    enum: languageType,
  })
  @IsEnum(languageType)
  @IsNotEmpty()
  lang: languageType;

  @ApiProperty({
    description: 'Channel ID for the bots subscription',
    example: 'channel123',
  })
  @IsString()
  @IsNotEmpty()
  channelId: string;
}