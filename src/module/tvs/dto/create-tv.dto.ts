import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { devLanguageType, languageType, seniorityType } from 'src/libs/enums';

export class CreateTvDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(seniorityType)
  levels: seniorityType;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(devLanguageType)
  technology: devLanguageType;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(languageType)
  lang: languageType;
}
