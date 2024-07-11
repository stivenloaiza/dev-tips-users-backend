import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { level, programmingLanguage } from 'src/libs/enums';

export class CreateBotsSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  frequency: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['Telegram', 'Discord'])
  channel: string;

  @IsEnum(level)
  @IsNotEmpty()
  level: level;

  @IsEnum(programmingLanguage)
  @IsNotEmpty()
  programmingLanguage: programmingLanguage;

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
