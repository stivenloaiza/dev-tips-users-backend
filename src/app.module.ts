import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersistanceModuleModule } from './modules/persistance-module.module';

@Module({
  imports: [PersistanceModuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
