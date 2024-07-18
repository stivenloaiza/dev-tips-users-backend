import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    console.log(apiKey);

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    const headers = {
      'x-api-key': apiKey,
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          'http://localhost:3004/api/api-keys/validate',
          { key: apiKey },
          { headers },
        ),
      );
      console.log(response);

      if (response.data === true) {
        return true;
      } else {
        throw new UnauthorizedException('Invalid API key format');
      }
    } catch (error) {
      throw new UnauthorizedException('Error validating API key');
    }
  }
}
