import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BotsSubscriptionController } from './controller/bots.controller';
import { BotsSubscriptionService } from './service/bots.service';
import {
  BotsSubscription,
  BotsSubscriptionSchema,
} from './entities/bots.entity';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from '../users/users.module';
import { ApiService } from 'src/libs/auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BotsSubscription.name, schema: BotsSubscriptionSchema },
    ]),
    HttpModule,
    UsersModule,
  ],
  controllers: [BotsSubscriptionController],
  providers: [BotsSubscriptionService, ApiService],
  exports: [BotsSubscriptionService],
})
export class BotsSubscriptionModule {}
