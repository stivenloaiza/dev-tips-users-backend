import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PersistenceModule } from './libs/persistence';
import { ConfigModule } from '@nestjs/config';
import { IframesModule } from './iframes/iframes.module';
import dbConfig from './libs/persistence/db-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule, UsersModule, IframesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
