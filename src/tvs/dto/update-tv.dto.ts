import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional } from 'class-validator';
import { CreateTvDto } from './create-tv.dto';

export class UpdateTvDto extends PartialType(CreateTvDto) {
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @IsOptional()
  @IsString()
  deletedBy?: string;

  @IsOptional()
  @IsString()
  deletedAt?: Date;
}
