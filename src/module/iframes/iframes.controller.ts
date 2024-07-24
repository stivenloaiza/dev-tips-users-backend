import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IframesService } from './iframes.service';
import { CreateIframeDto } from './dto/create-iframe.dto';
import { UpdateIframeDto } from './dto/update-iframe.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { IframeSuscription } from './entities/iframe.entity';

@ApiTags('iframe-subscriptions')
@Controller('iframes')
export class IframesController {
  constructor(private readonly iframesService: IframesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new iframe subscription' })
  @ApiBody({
    type: CreateIframeDto,
    description: 'Data to create a new iframe subscription',
    examples: {
      example1: {
        summary: 'Complete example',
        description:
          'A full example of the data required to create an iframe subscription',
        value: {
          apikey: '12345-abcdef-67890-ghijk',
          userId: '60c72b2f9b1e8e2f88d9b123',
          type: 'Basic',
          level: 'junior',
          technology: 'JavaScript',
          lang: 'english',
          iframe: '<iframe>...',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Iframe subscription created successfully.',
    type: IframeSuscription,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createIframeDto: CreateIframeDto) {
    return this.iframesService.create(createIframeDto);
  }

  @Get('/:page/:limit')
  @ApiOperation({ summary: 'Get a paginated list of iframe subscriptions' })
  @ApiParam({
    name: 'page',
    type: Number,
    description: 'Page number for pagination',
  })
  @ApiParam({
    name: 'limit',
    type: Number,
    description: 'Number of items per page',
  })
  @ApiResponse({
    status: 200,
    description:
      'Paginated list of iframe subscriptions returned successfully.',
    type: [IframeSuscription],
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  findAll(@Param('page') page: number, @Param('limit') limit: number) {
    return this.iframesService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get details of a specific iframe subscription by ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the iframe subscription',
  })
  @ApiResponse({
    status: 200,
    description: 'Iframe subscription details returned successfully.',
    type: IframeSuscription,
  })
  @ApiResponse({ status: 404, description: 'Iframe subscription not found.' })
  findOne(@Param('id') id: string) {
    return this.iframesService.findOne(id);
  }

  @Get('/getApiKey/:apikey')
  @ApiOperation({ summary: 'Get iframe subscription details by API key' })
  @ApiParam({
    name: 'apikey',
    type: String,
    description: 'API key of the iframe subscription',
  })
  @ApiResponse({
    status: 200,
    description: 'Iframe subscription details returned successfully.',
    type: IframeSuscription,
  })
  @ApiResponse({ status: 404, description: 'Iframe subscription not found.' })
  async findOneByApikey(
    @Param('apikey') apikey: string,
  ): Promise<IframeSuscription> {
    try {
      return await this.iframesService.findIframeByApikey(apikey);
    } catch (error) {
      throw new HttpException(
        `There is an issue with find by apikey: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific iframe subscription by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the iframe subscription',
  })
  @ApiBody({
    type: UpdateIframeDto,
    description: 'Data to update the iframe subscription',
    examples: {
      example1: {
        summary: 'Partial update example',
        description: 'An example of partially updating an iframe subscription',
        value: {
          type: 'Premium',
          level: 'senior',
          technology: 'Python',
          iframe:
            '<iframe src="https://example.com/updated_iframe" width="800" height="600"></iframe>',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Iframe subscription updated successfully.',
    type: IframeSuscription,
  })
  @ApiResponse({ status: 404, description: 'Iframe subscription not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  update(@Param('id') id: string, @Body() updateIframeDto: UpdateIframeDto) {
    return this.iframesService.update(id, updateIframeDto);
  }
}
