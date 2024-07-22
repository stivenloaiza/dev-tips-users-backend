import { Controller, Get, Post, Body, Patch, Param, HttpException, HttpStatus } from '@nestjs/common';
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

  @Get('/:page/:limit')
  findAll(@Param('page') page: number, @Param('limit') limit: number) {
    return this.iframesService.findAll(page, limit);
  }

  @Post('iframe')
  async sendIframeToFrontend(@Body() iframe: object): Promise<void> {
    try {
      await this.iframesService.sendIframeToFrontend(iframe);
    } catch (error) {
      throw new HttpException(
        `No se pudo enviar el iframe al frontend: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
