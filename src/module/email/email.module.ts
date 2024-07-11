import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Email } from './entities/email.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: "email" , schema: Email}])],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
