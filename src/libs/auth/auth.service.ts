import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getApiKey(): Promise<string> {
    try {
      const apiUrl = 'http://localhost:3002/key-subscription/new';
      const response = await lastValueFrom(
        this.httpService.get<{ apiKey: string }>(apiUrl),
      );
      console.log(response.data.apiKey);
      return response.data.apiKey;
    } catch (error) {
      console.error(
        'Failed to fetch API Key:',
        error.response?.data ?? error.message,
      );
      throw new HttpException(
        'Failed to fetch API Key',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
