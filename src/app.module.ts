import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PersistenceModule } from './libs/persistence';
import { ConfigModule } from '@nestjs/config';
import { IframesModule } from './iframes/iframes.module';
import dbConfig from './libs/persistence/db-config';
import { TvsModule } from './tvs/tvs.module';
import { BotsSubscriptionModule } from './bots/bots.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    UsersModule,
    IframesModule,
    BotsSubscriptionModule,
    TvsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
