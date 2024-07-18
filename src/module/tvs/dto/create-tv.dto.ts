import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { devLanguageType, languageType, seniorityType } from 'src/libs/enums';

export class CreateTvDto {
  @IsString()
  apikey: string;

  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(seniorityType)
  level: seniorityType;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(devLanguageType)
  technology: devLanguageType;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(languageType)
  lang: languageType;
}
