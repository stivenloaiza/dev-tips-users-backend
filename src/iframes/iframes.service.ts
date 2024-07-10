import { Injectable } from '@nestjs/common';
import { CreateIframeDto } from './dto/create-iframe.dto';
import { UpdateIframeDto } from './dto/update-iframe.dto';

@Injectable()
export class IframesService {
  create(createIframeDto: CreateIframeDto) {
    return 'This action adds a new iframe';
  }

  findAll() {
    return `This action returns all iframes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} iframe`;
  }

  update(id: number, updateIframeDto: UpdateIframeDto) {
    return `This action updates a #${id} iframe`;
  }

  remove(id: number) {
    return `This action removes a #${id} iframe`;
  }
}
