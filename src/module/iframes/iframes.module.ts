import { Module } from '@nestjs/common';
import { IframesService } from './iframes.service';
import { IframesController } from './iframes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { IframeSchema, IframeSuscription } from './entities/iframe.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: IframeSuscription.name, schema: IframeSchema },
    ]),
    UsersModule,
  ],
  controllers: [IframesController],
  providers: [IframesService],
})
export class IframesModule {}
