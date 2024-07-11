import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { programmingLanguage, senority } from 'src/libs/enums';

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

  @IsEnum(senority)
  @IsNotEmpty()
  seniority: senority;

  @IsEnum(programmingLanguage)
  @IsNotEmpty()
  programmingLanguage: programmingLanguage;
}
