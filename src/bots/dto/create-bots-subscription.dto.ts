import { IsString, IsNotEmpty, IsObject, IsOptional, IsEnum } from 'class-validator';

export class CreateBotsSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  frequency: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['Telegram', 'Discord'])
  channel: string;

  @IsString()
  @IsNotEmpty()
  seniority: string;

  @IsObject()
  @IsNotEmpty()
  programmingLanguages: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @IsString()
  @IsOptional()
  updatedBy?: string;

  @IsString()
  @IsOptional()
  deletedBy?: string;
}
