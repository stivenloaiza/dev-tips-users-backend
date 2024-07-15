import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { devLanguageType, languageType, seniorityType } from 'src/libs/enums';

export class CreateIframeDto {
  @ApiProperty()
  @IsString()
  apikey: string;

  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsEnum(seniorityType)
  @IsNotEmpty()
  levels: seniorityType;

  @ApiProperty()
  @IsEnum(devLanguageType)
  @IsNotEmpty()
  technology: devLanguageType;

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
  lang: languageType;
}