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
import { IframesService } from '../iframes/iframes.service';
import { BotsSubscriptionService } from '../bots/service/bots.service';
import { TvsService } from '../tvs/tvs.service';
import { EmailService } from '../email/email.service';
import { AuthService } from 'src/tvs/service/auth.service';

import {
  EmailSubscription,
  EmailSubscriptionSchema,
} from '../email/entities/email.entity';
import { HttpModule, HttpService } from '@nestjs/axios';

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
    MongooseModule.forFeature([
      { name: EmailSubscription.name, schema: EmailSubscriptionSchema },
    ]),
    HttpModule

  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    IframesService,
    BotsSubscriptionService,
    TvsService,
    EmailService,
    AuthService,
  ],
  exports: [MongooseModule],
})
export class UsersModule {}
