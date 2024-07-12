import { PartialType } from '@nestjs/mapped-types';
import { CreateTvDto } from './create-tv.dto';

export class UpdateTvDto extends PartialType(CreateTvDto) {}
