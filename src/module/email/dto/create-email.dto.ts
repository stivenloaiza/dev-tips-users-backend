import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { devLanguageType, languageType, seniorityType } from 'src/libs/enums';

export class CreateEmailDto {
  @ApiProperty({
    example: '12345-abcdef-67890-ghijk',
    description:
      'The API key assigned to the user for authentication purposes.',
  })
  @IsString()
  apikey: string;

  @ApiProperty({
    example: 'user-12345',
    description: 'The unique identifier of the user.',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'email',
    description: 'The type of subscription',
  })
  @IsString()
  type: string;

  @ApiProperty({
    example: 'weekly',
    description:
      'The frequency of the email subscription, e.g., daily, weekly, monthly.',
  })
  @IsString()
  @IsNotEmpty()
  frequency: string;

  @ApiProperty({
    enum: seniorityType,
    enumName: 'seniorityType',
    description:
      'The seniority level of the user, which can be one of the predefined values in the seniorityType enum.',
  })
  @IsEnum(seniorityType)
  @IsNotEmpty()
  level: seniorityType;

  @ApiProperty({
    enum: devLanguageType,
    enumName: 'devLanguageType',
    description:
      'The primary programming language used by the user, which can be one of the predefined values in the devLanguageType enum.',
  })
  @IsEnum(devLanguageType)
  @IsNotEmpty()
  technology: devLanguageType;

  @ApiProperty({
    enum: languageType,
    enumName: 'languageType',
    description:
      'The preferred language for communication, which can be one of the predefined values in the languageType enum.',
  })
  @IsEnum(languageType)
  @IsNotEmpty()
  lang: languageType;
}
