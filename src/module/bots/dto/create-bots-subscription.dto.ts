import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { devLanguageType, seniorityType } from 'src/libs/enums';

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
  @IsEnum(channel)
  channel: channel;

  @IsEnum(seniorityType)
  @IsNotEmpty()
  level: seniorityType;

  @IsEnum(devLanguageType)
  @IsNotEmpty()
  devLanguage: devLanguageType;

  @IsEnum(language)
  @IsNotEmpty()
  language: language;

  @ApiProperty({ type: Date, default: null })
  deletedAt?: Date;

  @ApiProperty({ default: null })
  createdBy?: string;

  @ApiProperty({ default: null })
  updatedBy?: string;

  @ApiProperty({ default: null })
  deletedBy?: string;
}
