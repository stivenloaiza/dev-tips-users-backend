import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async createBotsApiKey(typeSubscription: string, usageCount: number, limit: number): Promise<string> {
    try {
      const createApiKeyParams = {
        type: typeSubscription,
        usageCount,
        limit,
      };

      const headers = {
        'x-api-key': 'p5ypxpbidn0200uvh4cz0plx3n2zqy',
      };

      const apiKeyResponse = await lastValueFrom(
        this.httpService.post<{ apiKey: string }>('http://localhost:4000/key-subscription/new', createApiKeyParams, { headers }),
      );

      if (apiKeyResponse.status !== 201 || !apiKeyResponse.data.apiKey) {
        throw new Error('Failed to create API key');
      }

      return apiKeyResponse.data.apiKey;
    } catch (error) {
      throw new Error('Failed to create API key');
    }
  }
}
