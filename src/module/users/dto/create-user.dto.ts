import { ApiProperty } from '@nestjs/swagger';
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

export class SubscriptionDto {
  @IsEnum(SubscriptionType)
  communication: SubscriptionType;

  @ValidateNested()
  @Type(() => Object)
  data: CreateBotsSubscriptionDto | CreateTvDto | CreateIframeDto;
}

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  apiKey: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty()
  @IsOptional()
  @IsString()
  managerName?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  managerEmail?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  managerPhone?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubscriptionDto)
  subscriptions: SubscriptionDto[];

  @ApiProperty({ type: Date, default: null })
  deletedAt?: Date;

  @ApiProperty({ default: null })
  createdBy?: string;

  @ApiProperty({ default: null })
  updatedBy?: string;

  @ApiProperty({ default: null })
  deletedBy?: string;
}
