import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscription } from './entities/email.entity';
import { EmailSubscriptionSchema } from './entities/email.entity';
import { UsersModule } from '../users/users.module';
import { HttpModule } from '@nestjs/axios';
import { ApiService } from 'src/libs/auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscription.name, schema: EmailSubscriptionSchema },
    ]),
    UsersModule,
    HttpModule,
  ],
  controllers: [EmailController],
  providers: [EmailService,ApiService],
  exports: [EmailService],
})
export class EmailModule {}
