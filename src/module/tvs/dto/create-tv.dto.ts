import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { devLanguageType, langType, levelType } from 'src/libs/enums';

export class CreateTvDto {
  @IsNotEmpty()
  @IsString()
  userId?: string;

  @IsNotEmpty()
  @IsString()
  communication?: string;

  @IsNotEmpty()
  @IsEnum(levelType)
  seniority: levelType;

  @IsNotEmpty()
  @IsEnum(devLanguageType)
  technology: devLanguageType;

  @IsNotEmpty()
  @IsEnum(langType)
  language: langType;
}
