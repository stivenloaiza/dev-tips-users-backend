import { language, level, programmingLanguage } from 'src/libs/enums';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIframeDto {
  @IsString()
  userId?: string;

  @IsString()
  communication: string;

  @IsEnum(level)
  @IsNotEmpty()
  level: level;

  @IsEnum(programmingLanguage)
  @IsNotEmpty()
  programmingLanguage: programmingLanguage;

  @IsString()
  @IsNotEmpty()
  domains: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  typography: string;

  @IsEnum(language)
  @IsNotEmpty()
  language: language;

  @ApiProperty({ type: Date, default: null })
  deletedAt?: Date;

  @ApiProperty({ default: null })
  createdBy?: string;

  @ApiProperty({ default: null })
  updatedBy?: string;

  @ApiProperty({ default: null })
  deletedBy?: string;
}
