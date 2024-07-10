import { Module } from '@nestjs/common';
import { IframesService } from './iframes.service';
import { IframesController } from './iframes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { IframeSchema, IframeSuscription } from './entities/iframe.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: IframeSuscription.name, schema: IframeSchema }])
],
  controllers: [IframesController],
  providers: [IframesService],
})
export class IframesModule {}
