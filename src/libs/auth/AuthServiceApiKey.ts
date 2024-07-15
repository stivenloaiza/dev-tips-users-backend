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
      const apiUrl = this.configService.get<string>('AUTH_API_URL');
      const response = await lastValueFrom(
        this.httpService.get<{ apiKey: string }>(apiUrl, {
          headers: {
            Authorization: `Bearer ${this.configService.get<string>('AUTH_TOKEN')}`,
          },
        }),
      );
      return response.data.apiKey;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch API Key',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
