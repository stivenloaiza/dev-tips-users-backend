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
import { ApiTags } from '@nestjs/swagger';
import { IframeSuscription } from './entities/iframe.entity';

@ApiTags('iframe-subscriptions')
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

  @Get('/getApiKey/:apikey')
  async findOneByApikey(
    @Param('apikey') apikey: string,
  ): Promise<IframeSuscription> {
    try {
      return await this.iframesService.findIframeByApikey(apikey);
    } catch (error) {
      throw new Error(`There is a isssue with find by apikey: ${error}`);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIframeDto: UpdateIframeDto) {
    return this.iframesService.update(id, updateIframeDto);
  }

}
