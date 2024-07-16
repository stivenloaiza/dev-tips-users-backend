import { Module } from '@nestjs/common';
import { IframesService } from './iframes.service';
import { IframesController } from './iframes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { IframeSchema, IframeSuscription } from './entities/iframe.entity';
import { UsersModule } from '../users/users.module';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/libs/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: IframeSuscription.name, schema: IframeSchema },
    ]),
    UsersModule,
    HttpModule,
    AuthModule,
  ],
  controllers: [IframesController],
  providers: [IframesService],
})
export class IframesModule {}
