import { Module } from '@nestjs/common';
import { TvsService } from './tvs.service';
import { TvsController } from './tvs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TvSchema, TvSuscription } from './entities/tv.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TvSuscription.name, schema: TvSchema }]),
    UsersModule,
  ],
  controllers: [TvsController],
  providers: [TvsService],
})
export class TvsModule {}
