import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { devLanguageType, seniorityType } from 'src/libs/enums';

export class CreateBotsSubscriptionDto {
  @IsNotEmpty()
  @IsString()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  frequency: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['Telegram', 'Discord'])
  channel: string;

  @IsEnum(seniorityType)
  @IsNotEmpty()
  level: seniorityType;

  @IsEnum(devLanguageType)
  @IsNotEmpty()
  devLanguage: devLanguageType;

  @IsString()
  @IsNotEmpty()
  createdBy?: string;

  @IsString()
  @IsOptional()
  updatedBy?: string;

  @IsString()
  @IsOptional()
  deletedBy?: string;
}
