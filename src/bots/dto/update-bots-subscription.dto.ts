import { IsString, IsOptional, IsObject, IsEnum } from 'class-validator';

export class UpdateBotsSubscriptionDto {
  @IsString()
  @IsOptional()
  frequency?: string;

  @IsString()
  @IsOptional()
  @IsEnum(['Telegram', 'Discord'])
  channel?: string;

  @IsString()
  @IsOptional()
  seniority?: string;

  @IsObject()
  @IsOptional()
  programmingLanguages?: Record<string, any>;

  @IsString()
  @IsOptional()
  updatedBy?: string;

  @IsString()
  @IsOptional()
  deletedBy?: string;
}
