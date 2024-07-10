import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIframeDto } from './dto/create-iframe.dto';
import { UpdateIframeDto } from './dto/update-iframe.dto';
import { IframeSuscription } from './entities/iframe.entity';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class IframesService {
    constructor(
        @InjectModel(IframeSuscription.name) private readonly iframeModel: Model<IframeSuscription>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    async create(createIframeDto: CreateIframeDto): Promise<IframeSuscription> {
        const user = await this.userModel.findById(createIframeDto.userId).exec();
        if (!user) {
            throw new NotFoundException(`User with id ${createIframeDto.userId} not found`);
        }

        const createdIframe = new this.iframeModel(createIframeDto);
        return await createdIframe.save();
    }

    async findAll(): Promise<IframeSuscription[]> {
        return this.iframeModel.find().populate('userId').exec();
    }

    async findOne(id: string): Promise<IframeSuscription> {
        const iframe = await this.iframeModel.findById(id).populate('userId').exec();
        if (!iframe) {
            throw new NotFoundException(`Iframe with id ${id} not found`);
        }
        return iframe;
    }

    async update(id: string, updateIframeDto: UpdateIframeDto): Promise<IframeSuscription> {
        const iframe = await this.iframeModel.findById(id).exec();
        if (!iframe) {
            throw new NotFoundException(`Iframe with id ${id} not found`);
        }

        if (updateIframeDto.userId) {
            const user = await this.userModel.findById(updateIframeDto.userId).exec();
            if (!user) {
                throw new NotFoundException(`User with id ${updateIframeDto.userId} not found`);
            }
        }

        Object.assign(iframe, updateIframeDto);
        return await iframe.save();
    }

    async remove(id: string): Promise<IframeSuscription> {
        const iframe = await this.iframeModel.findByIdAndDelete(id).exec();
        if (!iframe) {
            throw new NotFoundException(`Iframe with id ${id} not found`);
        }
        return iframe;
    }
}
