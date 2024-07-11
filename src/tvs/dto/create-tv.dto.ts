import { IsString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { language, level, programmingLanguage } from 'src/libs/enums';

export class CreateTvDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  communication: string;

  @IsNotEmpty()
  @IsEnum(level)
  level: level;

  @IsNotEmpty()
  @IsEnum(programmingLanguage)
  programmingLanguage: programmingLanguage;

  @IsNotEmpty()
  @IsEnum(language)
  language: language;

  @IsOptional()
  @IsString()
  createdBy?: string;
}
