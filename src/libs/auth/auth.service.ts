import { SubscriptionType } from 'src/libs/enums';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async getApiKey(subscriptionType: SubscriptionType): Promise<string> {
    const createApiKeyParams = {
      type: subscriptionType,
      usageCount: 0,
      limit: 100,
    };

    const headers = {
      'x-api-key': 'p5ypxpbidn0200uvh4cz0plx3n2zqy',
    };

    const apiKeyResponse = await lastValueFrom(
      this.httpService.post(
        'http://localhost:4000/key-subscription/new',
        createApiKeyParams,
        { headers },
      ),
    );

    if (apiKeyResponse.status !== 201) {
      console.log('hola');
      throw new HttpException(
        'Failed to create API key',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else if (apiKeyResponse.data.apiKey === undefined) {
      console.log('hola2');
      throw new HttpException(
        'Failed to create API key',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return apiKeyResponse.data.apiKey;
  }
}
