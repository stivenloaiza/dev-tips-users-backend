import { PartialType } from '@nestjs/swagger';
import { CreateIframeDto } from './create-iframe.dto';

export class UpdateIframeDto extends PartialType(CreateIframeDto) {}
