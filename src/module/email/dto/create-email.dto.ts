import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { devLanguageType, langType, levelType } from 'src/libs/enums';

export class CreateEmailDto {
  @IsString()
  readonly apikey?: string;

  @IsString()
  userId?: string;

  @IsString()
  typeSubscription: string;

  @IsString()
  @IsNotEmpty()
  frequency: string;

  @IsEnum(levelType)
  @IsNotEmpty()
  levels: levelType;

  @IsEnum(devLanguageType)
  @IsNotEmpty()
  technology: devLanguageType;

  @IsEnum(langType)
  @IsNotEmpty()
  lang: langType;
}
