import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async getBotsApiKey(): Promise<string> {
    try {
      const response = await lastValueFrom(this.httpService.get<{ apiKey: string }>('URL_DE_LA_API_DE_AUTHS_KEYS'));
      return response.data.apiKey;
    } catch (error) {
      throw new Error('Failed to fetch Bots API Key');
    }
  }
}
