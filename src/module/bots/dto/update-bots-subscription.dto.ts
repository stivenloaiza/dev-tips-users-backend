import { PartialType } from '@nestjs/swagger';
import { CreateBotsSubscriptionDto } from './create-bots-subscription.dto';

export class UpdateBotsSubscriptionDto extends PartialType(
  CreateBotsSubscriptionDto,
) {}
