import { NotFoundException, BadRequestException } from '@nestjs/common';

export class BotsSubscriptionNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message || 'BotsSubscription not found');
  }
}

export class BotsSubscriptionBadRequestException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Invalid BotsSubscription data');
  }
}
