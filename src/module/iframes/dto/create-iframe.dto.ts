import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { devLanguageType, langType, levelType } from 'src/libs/enums';

export class CreateIframeDto {
  @IsString()
  userId: string;

  @IsString()
  communication: string;

  @IsEnum(levelType)
  @IsNotEmpty()
  levels: levelType;

  @IsEnum(devLanguageType)
  @IsNotEmpty()
  technology: devLanguageType;

  @IsString()
  @IsNotEmpty()
  domains: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  typography: string;

  @IsEnum(langType)
  @IsNotEmpty()
  language: langType;
}
