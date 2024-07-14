import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { devLanguageType, languageType, seniorityType } from 'src/libs/enums';

export class CreateTvDto {
  @IsNotEmpty()
  @IsString()
  userId?: string;

  @ApiProperty()
  @IsString()
  communication?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(seniorityType)
  seniority: seniorityType;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(devLanguageType)
  devLanguage: devLanguageType;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(languageType)
  language: languageType;
}
