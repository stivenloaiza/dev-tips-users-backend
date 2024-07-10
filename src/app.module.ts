import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PersistenceModule } from './libs/persistence';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/db-config';
import { BotsSubscriptionModule } from '../src/bots/bots.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule, UsersModule, BotsSubscriptionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
