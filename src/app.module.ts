import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersistanceModuleModule } from './modules/persistance-module.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PersistanceModuleModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
