import { IsString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { devLanguageType, languageType, seniorityType } from 'src/libs/enums';

export class CreateTvDto {
  @IsNotEmpty()
  @IsString()
  userId?: string;

  @IsNotEmpty()
  @IsString()
  communication?: string;

  @IsNotEmpty()
  @IsEnum(seniorityType)
  seniority: seniorityType;

  @IsNotEmpty()
  @IsEnum(devLanguageType)
  devLanguage: devLanguageType;

  @IsNotEmpty()
  @IsEnum(languageType)
  language: languageType;

  @ApiProperty({ type: Date, default: null })
  deletedAt?: Date;

  @ApiProperty({ default: null })
  createdBy?: string;

  @ApiProperty({ default: null })
  updatedBy?: string;

  @ApiProperty({ default: null })
  deletedBy?: string;
}
