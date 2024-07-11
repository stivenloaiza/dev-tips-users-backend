import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UsersService } from './users.service';
import {
  BotsSubscription,
  BotsSubscriptionSchema,
} from 'src/bots/entities/bots.entity';
import { TvSchema, TvSuscription } from 'src/tvs/entities/tv.entity';
import {
  IframeSchema,
  IframeSuscription,
} from 'src/iframes/entities/iframe.entity';
import { IframesService } from 'src/iframes/iframes.service';
import { BotsSubscriptionService } from 'src/bots/service/bots.service';
import { TvsService } from 'src/tvs/tvs.service';

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
  providers: [
    UsersService,
    IframesService,
    BotsSubscriptionService,
    TvsService,
  ],
  exports: [MongooseModule],
})
export class UsersModule {}
