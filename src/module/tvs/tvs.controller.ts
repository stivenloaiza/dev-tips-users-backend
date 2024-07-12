import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TvsService } from './tvs.service';
import { CreateTvDto } from './dto/create-tv.dto';
import { UpdateTvDto } from './dto/update-tv.dto';

@Controller('tvs')
export class TvsController {
  constructor(private readonly tvsService: TvsService) {}

  @Post()
  create(@Body() createTvDto: CreateTvDto) {
    return this.tvsService.create(createTvDto);
  }

  @Get()
  findAll() {
    return this.tvsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tvsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTvDto: UpdateTvDto) {
    return this.tvsService.update(id, updateTvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tvsService.remove(id);
  }
}
