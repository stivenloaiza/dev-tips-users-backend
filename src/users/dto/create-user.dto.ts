import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole, SubscriptionType } from 'src/libs/enums';

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

  @ApiProperty({ enum: SubscriptionType, enumName: 'SubscriptionType' })
  @IsEnum(SubscriptionType)
  subscriptions: SubscriptionType;

  @ApiProperty({ type: Date, default: null })
  deletedAt?: Date;

  @ApiProperty({ default: null })
  createdBy?: string;

  @ApiProperty({ default: null })
  updatedBy?: string;

  @ApiProperty({ default: null })
  deletedBy?: string;
}
