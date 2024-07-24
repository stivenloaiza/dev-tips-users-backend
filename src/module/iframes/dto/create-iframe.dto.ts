import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { devLanguageType, languageType, seniorityType } from 'src/libs/enums';

export class CreateIframeDto {
  @ApiProperty({
    description: 'API key for the iframe subscription',
    example: '12345-abcdef-67890-ghijk',
  })
  @IsString()
  apikey: string;

  @ApiProperty({
    description: 'ID of the user associated with the iframe subscription',
    example: '60c72b2f9b1e8e2f88d9b123',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Type of ?',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Seniority level',
    enum: seniorityType,
    example: seniorityType.JUNIOR,
  })
  @IsEnum(seniorityType)
  @IsNotEmpty()
  level: seniorityType;

  @ApiProperty({
    description: 'Technology used',
    enum: devLanguageType,
    example: devLanguageType.JAVASCRIPT,
  })
  @IsEnum(devLanguageType)
  @IsNotEmpty()
  technology: devLanguageType;

  @ApiProperty({
    description: 'Domains associated with the iframe subscription',
    example: 'example.com',
  })
  @IsString()
  @IsNotEmpty()
  domains: string;

  @ApiProperty({
    description: 'Language',
    enum: languageType,
    example: languageType.ENGLISH,
  })
  @IsEnum(languageType)
  @IsNotEmpty()
  lang: languageType;

  @ApiProperty({
    description: 'Iframe content',
    example:
      '<iframe src="https://example.com/iframe" width="600" height="400"></iframe>',
  })
  iframe: any;
}
