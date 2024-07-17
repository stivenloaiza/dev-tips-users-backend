import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/libs/guard/x-api-key.guard';


@ApiTags('email-subscriptions')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/create')
  create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailService.create(createEmailDto);
  }

  
  
  @Get('/find/all')
  findAll() {
    return this.emailService.findAll();
  }

 
  
  @Get('/find/field/:field/value/:value')
  findOne(@Param('field') field: string, @Param('value') value: string) {
    return this.emailService.findOneByField(field, value);
  }

  
  
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    return this.emailService.update(+id, updateEmailDto);
  }

  
  
  @Delete('/apikey/:apikey')
  remove(@Param('apikey') apikey: string) {
    return this.emailService.remove(apikey);
  }
}
