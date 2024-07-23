import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { ApiTags } from '@nestjs/swagger';
import { EmailSubscription } from './entities/email.entity';

@ApiTags('email-subscriptions')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/create')
  create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailService.create(createEmailDto);
  }

  @Get('/:page/:limit')
  async findAll(
    @Param('page') page: number,
    @Param('limit') limit: number,
  ): Promise<EmailSubscription[]> {
    return this.emailService.findAll(page, limit);
  }

  @Get('/find/field/:field/value/:value')
  findOne(@Param('field') field: string, @Param('value') value: string) {
    return this.emailService.findOneByField(field, value);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    return this.emailService.update(+id, updateEmailDto);
  }
}
