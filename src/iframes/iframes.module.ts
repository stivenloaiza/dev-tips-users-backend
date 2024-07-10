import { Module } from '@nestjs/common';
import { IframesService } from './iframes.service';
import { IframesController } from './iframes.controller';

@Module({
  controllers: [IframesController],
  providers: [IframesService],
})
export class IframesModule {}
