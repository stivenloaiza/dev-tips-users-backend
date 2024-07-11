import { language, programmingLanguage, senority } from 'src/libs/enums';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateIframeDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsString()
  @IsNotEmpty()
  communication: string;

  @IsEnum(senority)
  @IsNotEmpty()
  seniority: senority;

  @IsEnum(programmingLanguage)
  @IsNotEmpty()
  programmingLanguage: programmingLanguage;

  @IsString()
  @IsNotEmpty()
  domains: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  typography: string;

  @IsEnum(language)
  @IsNotEmpty()
  language: language;
}
