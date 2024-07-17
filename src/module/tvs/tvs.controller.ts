import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { TvsService } from './tvs.service';
import { CreateTvDto } from './dto/create-tv.dto';
import { UpdateTvDto } from './dto/update-tv.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { TvSuscription } from './entities/tv.entity';
import { ApiKeyGuard } from 'src/libs/guard/x-api-key.guard';

@ApiTags('tv-subscriptions')
@Controller('tvs')
export class TvsController {
  constructor(private readonly tvsService: TvsService) {}

  @Post('/create')
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

 
  
  @Get('/getApiKey/:apikey')
  async findOneByApikey(@Param('apikey') apikey: string): Promise<TvSuscription | { message: string }> {
    try {
      return await this.tvsService.findTvByApikey(apikey);
    } catch (error) {
      return { message: `The tv suscription with the apikey: ${apikey} wasn't found or is already deleted` };
    }
  }

  
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTvDto: UpdateTvDto) {
    return this.tvsService.update(id, updateTvDto);
  }
}
