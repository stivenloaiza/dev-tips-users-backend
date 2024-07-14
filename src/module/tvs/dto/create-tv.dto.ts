import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { devLanguageType, languageType, seniorityType } from 'src/libs/enums';

export class CreateTvDto {
  @IsNotEmpty()
  @IsString()
  userId?: string;

  @IsNotEmpty()
  @IsString()
  communication?: string;

  @IsNotEmpty()
  @IsEnum(seniorityType)
  seniority: seniorityType;

  @IsNotEmpty()
  @IsEnum(devLanguageType)
  devLanguage: devLanguageType;

  @IsNotEmpty()
  @IsEnum(languageType)
  language: languageType;
}
