import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EmailSubscription} from './entities/email.entity';
import { Model } from 'mongoose';

@Injectable()
export class EmailService {

  constructor(@InjectModel("EmailEntity") private readonly emailModel: Model<EmailSubscription>){}


  async create(createEmailDto: CreateEmailDto) {

    const {apikey} = createEmailDto

    const validation = this.emailModel.findOne({apikey: apikey})

    if(validation){
      throw new Error(`Already exists a subscription with this ApiKey ${apikey}`)
    }

    const newSub = await this.emailModel.create(createEmailDto)

    return newSub.save()
      
  }

  findAll
  (

  ) 
  {
    return `This action returns all email`;
  }

  findOne
  (

  ) 
  {
    return `This action returns a #${id} email`;
  }

  update
  (id: number, updateEmailDto: UpdateEmailDto

  ) 
  {
    return `This action updates a #${id}`;
  }

  remove(id: number) {
    return `This action removes a #${id}`;
  }
}
