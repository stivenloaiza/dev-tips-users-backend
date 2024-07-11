import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BotsSubscriptionController } from './controller/bots.controller';
import { BotsSubscriptionService } from './service/bots.service';
import {
  BotsSubscription,
  BotsSubscriptionSchema,
} from './entities/bots.entity';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from 'src/libs/auth/AuthServiceApiKey';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BotsSubscription.name, schema: BotsSubscriptionSchema },
    ]),
    HttpModule,
  ],
  controllers: [BotsSubscriptionController],
  providers: [BotsSubscriptionService, AuthService],
  exports: [BotsSubscriptionService],
})
export class BotsSubscriptionModule {}
