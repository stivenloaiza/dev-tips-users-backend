import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import {
  devLanguageType,
  languageType,
  seniorityType,
} from '../../../libs/enums';

export class CreateTvDto {
  @ApiProperty({ description: 'API key for the TV subscription' })
  @IsString()
  apikey: string;

  @ApiProperty({ description: 'User ID associated with the TV subscription' })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Type of subscription',
    example: 'tv',
    default: 'tv',
  })
  @IsString()
  @IsNotEmpty()
  type: string = 'tv';

  @ApiProperty({ description: 'Seniority level of the TV subscription' })
  @IsNotEmpty()
  @IsEnum(seniorityType)
  level: seniorityType;

  @ApiProperty({
    description: 'Technology associated with the TV subscription',
  })
  @IsNotEmpty()
  @IsEnum(devLanguageType)
  technology: devLanguageType;

  @ApiProperty({ description: 'Language of the TV subscription' })
  @IsNotEmpty()
  @IsEnum(languageType)
  lang: languageType;
}
