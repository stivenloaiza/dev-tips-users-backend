import { UsersModule } from './module/users/users.module';
import { Module } from '@nestjs/common';
import { PersistenceModule } from './libs/persistence';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/db-config';
import { BotsSubscriptionModule } from './bots/bots.module';
import { HttpModule } from '@nestjs/axios';
import { TvsModule } from './tvs/tvs.module';
import { IframesModule } from './iframes/iframes.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
