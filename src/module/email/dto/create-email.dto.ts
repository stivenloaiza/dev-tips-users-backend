import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { devLanguageType, languageType, seniorityType } from 'src/libs/enums';

export class CreateEmailDto {
  @IsString()
  readonly apikey?: string;

  @IsString()
  userId?: string;

  @ApiProperty()
  @IsString()
  communication?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  frequency: string;

  @ApiProperty()
  @IsEnum(seniorityType)
  @IsNotEmpty()
  seniority: seniorityType;

  @ApiProperty()
  @IsEnum(devLanguageType)
  @IsNotEmpty()
  devLanguage: devLanguageType;

  @ApiProperty()
  @IsEnum(languageType)
  @IsNotEmpty()
  language: languageType;
}
