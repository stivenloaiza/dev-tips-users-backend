import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { devLanguageType, languageType, seniorityType } from 'src/libs/enums';

export class CreateIframeDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsString()
  @IsNotEmpty()
  communication: string;

  @IsEnum(seniorityType)
  @IsNotEmpty()
  seniority: seniorityType;

  @IsEnum(devLanguageType)
  @IsNotEmpty()
  devLanguage: devLanguageType;

  @IsString()
  @IsNotEmpty()
  domains: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  typography: string;

  @IsEnum(languageType)
  @IsNotEmpty()
  language: languageType;
}
