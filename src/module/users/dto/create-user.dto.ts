import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateBotsSubscriptionDto } from 'src/module/bots/dto/create-bots-subscription.dto';
import { CreateIframeDto } from 'src/module/iframes/dto/create-iframe.dto';
import { UserRole, SubscriptionType } from 'src/libs/enums';
import { CreateTvDto } from 'src/module/tvs/dto/create-tv.dto';
import { CreateEmailDto } from 'src/module/email/dto/create-email.dto';

export class SubscriptionDto {
  @ApiProperty({
    enum: SubscriptionType,
    enumName: 'SubscriptionType',
    description:
      'The type of subscription, which can be one of the predefined values in SubscriptionType enum.',
  })
  @IsEnum(SubscriptionType)
  type: SubscriptionType;

  @ApiProperty({
    description:
      'The data related to the subscription, which can be of different types based on the subscription type.',
    oneOf: [
      { $ref: getSchemaPath(CreateBotsSubscriptionDto) },
      { $ref: getSchemaPath(CreateTvDto) },
      { $ref: getSchemaPath(CreateIframeDto) },
      { $ref: getSchemaPath(CreateEmailDto) },
    ],
  })
  @ValidateNested()
  @Type(() => Object)
  data:
    | CreateBotsSubscriptionDto
    | CreateTvDto
    | CreateIframeDto
    | CreateEmailDto;
}

export class CreateUserDto {
  @ApiProperty({
    example: '12345-abcdef-67890-ghijk',
    description:
      'The API key assigned to the user for authentication purposes.',
  })
  @IsString()
  apiKey: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'The phone number of the user, including the country code.',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    enum: UserRole,
    enumName: 'UserRole',
    description:
      'The role assigned to the user, which determines their permissions and access level.',
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    example: 'Jane Doe',
    description: "The full name of the user's manager.",
    required: false,
  })
  @IsOptional()
  @IsString()
  managerName?: string;

  @ApiProperty({
    example: 'jane.doe@example.com',
    description: "The email address of the user's manager.",
    required: false,
  })
  @IsOptional()
  @IsEmail()
  managerEmail?: string;

  @ApiProperty({
    example: '+0987654321',
    description:
      "The phone number of the user's manager, including the country code.",
    required: false,
  })
  @IsOptional()
  @IsString()
  managerPhone?: string;

  @ApiProperty({
    type: [SubscriptionDto],
    description: 'A list of subscriptions associated with the user.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubscriptionDto)
  subscriptions: SubscriptionDto[];

  @ApiProperty({
    type: Date,
    default: null,
    description:
      'The date and time when the user was deleted. Null if the user is not deleted.',
  })
  deletedAt?: Date;

  @ApiProperty({
    default: null,
    description: 'The user who created this user entry.',
  })
  createdBy?: string;

  @ApiProperty({
    default: null,
    description: 'The user who last updated this user entry.',
  })
  updatedBy?: string;

  @ApiProperty({
    default: null,
    description: 'The user who deleted this user entry.',
  })
  deletedBy?: string;
}
