import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { devLanguageType, languageType, seniorityType } from 'src/libs/enums';

export class CreateEmailDto {
  @IsString()
  readonly apikey?: string;

  @IsString()
  userId?: string;

  @IsString()
  communication: string;

  @IsString()
  @IsNotEmpty()
   frequency: string;

  @IsEnum(seniorityType)
  @IsNotEmpty()
  seniority: seniorityType;

  @IsEnum(devLanguageType)
  @IsNotEmpty()
  devLanguage: devLanguageType;

  @IsEnum(languageType)
  @IsNotEmpty()
  language: languageType;
}
