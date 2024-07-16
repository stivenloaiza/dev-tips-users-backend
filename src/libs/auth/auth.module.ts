import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ApiService } from './auth.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ApiService],
  exports: [ApiService],
})
export class AuthModule {}
