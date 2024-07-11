import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IframesService } from './iframes.service';
import { CreateIframeDto } from './dto/create-iframe.dto';
import { UpdateIframeDto } from './dto/update-iframe.dto';

@Controller('iframes')
export class IframesController {
  constructor(private readonly iframesService: IframesService) {}

  @Post()
  create(@Body() createIframeDto: CreateIframeDto) {
    return this.iframesService.create(createIframeDto);
  }

  @Get()
  findAll() {
    return this.iframesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iframesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIframeDto: UpdateIframeDto) {
    return this.iframesService.update(id, updateIframeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iframesService.remove(id);
  }
}
