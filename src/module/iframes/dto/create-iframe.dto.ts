import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { devLanguageType, languageType, seniorityType } from 'src/libs/enums';

export class CreateIframeDto {
  @IsString()
  userId?: string;

  @ApiProperty()
  @IsString()
  communication: string;

  @ApiProperty()
  @IsEnum(seniorityType)
  @IsNotEmpty()
  seniority: seniorityType;

  @ApiProperty()
  @IsEnum(devLanguageType)
  @IsNotEmpty()
  devLanguage: devLanguageType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  domains: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  typography: string;

  @ApiProperty()
  @IsEnum(languageType)
  @IsNotEmpty()
  language: languageType;
}
