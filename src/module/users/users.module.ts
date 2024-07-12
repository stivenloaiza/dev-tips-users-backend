import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UsersService } from './users.service';
import {
  BotsSubscription,
  BotsSubscriptionSchema,
} from '../bots/entities/bots.entity';
import { TvSchema, TvSuscription } from '../tvs/entities/tv.entity';
import {
  IframeSchema,
  IframeSuscription,
} from '../iframes/entities/iframe.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: BotsSubscription.name, schema: BotsSubscriptionSchema },
    ]),
    MongooseModule.forFeature([{ name: TvSuscription.name, schema: TvSchema }]),
    MongooseModule.forFeature([
      { name: IframeSuscription.name, schema: IframeSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [MongooseModule],
})
export class UsersModule {}
