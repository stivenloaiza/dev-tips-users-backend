import { SubscriptionType } from 'src/libs/enums';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async getApiKey(subscriptionType: SubscriptionType): Promise<string> {
    try {
      const createApiKeyParams = {
        type: subscriptionType,
        usageCount: 0,
        limit: 100,
      };

      const headers = {
        'x-api-key': process.env.X_API_KEY,
      };

      const apiKeyResponse = await lastValueFrom(
        this.httpService.post(
          `${process.env.ROUTE_API_KEY_BASE}/${process.env.ENDPOINT_NEW_SUSCRIPTION_APIKEY}`,
          createApiKeyParams,
          { headers },
        ),
      );

      if (apiKeyResponse.status !== 201) {
        throw new HttpException(
          'Failed to create API key',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else if (apiKeyResponse.data.apiKey === undefined) {
        throw new HttpException(
          'Failed to create API key',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return apiKeyResponse.data.apiKey;
    } catch (error) {
      console.error(`There is a issue ${error}`);
    }
  }
}
