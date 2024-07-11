import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { language, level, programmingLanguage } from 'src/libs/enums';

export class CreateTvDto {
  @IsNotEmpty()
  @IsString()
  userId?: string;

  @IsNotEmpty()
  @IsString()
  communication?: string;

  @IsNotEmpty()
  @IsEnum(level)
  level: level;

  @IsNotEmpty()
  @IsEnum(programmingLanguage)
  programmingLanguage: programmingLanguage;

  @IsNotEmpty()
  @IsEnum(language)
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
