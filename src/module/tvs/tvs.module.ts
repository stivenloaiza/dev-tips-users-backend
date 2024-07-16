import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { TvsController } from './tvs.controller';
import { TvsService } from './tvs.service';
import { TvSchema, TvSuscription } from './entities/tv.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TvSuscription.name, schema: TvSchema }]),
    UsersModule,
    HttpModule,
  ],
  controllers: [TvsController],
  providers: [TvsService],
})
export class TvsModule {}
