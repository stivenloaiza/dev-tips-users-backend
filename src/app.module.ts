import { UsersModule } from './module/users/users.module';
import { Module } from '@nestjs/common';
import { PersistenceModule } from './libs/persistence';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/db-config';
import { BotsSubscriptionModule } from './module/bots/bots.module';
import { HttpModule } from '@nestjs/axios';
import { TvsModule } from './module/tvs/tvs.module';
import { IframesModule } from './module/iframes/iframes.module';
import { EmailModule } from './module/email/email.module';
import { AuthModule } from './libs/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    UsersModule,
    BotsSubscriptionModule,
    HttpModule,
    IframesModule,
    TvsModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
