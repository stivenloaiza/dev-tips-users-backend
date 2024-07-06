import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PersistenceModule } from './libs/persistence';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/db-config';
import { User, UserSchema } from './users/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
