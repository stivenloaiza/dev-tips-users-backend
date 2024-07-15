import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import axios from 'axios';

@Injectable()
export class AuthServiceIframe {
  constructor(private readonly httpService: HttpService) {}

  async getUrlIframe(url:string, data:any): Promise<any> {
    const {apikey, levels, technology, domains, color, typography, lang} = data
    try {
      const response = await axios.post(url,data, {
        headers: { 'Authorization': `Bearer ${apikey}` },
        params: { levels, technology, domains, color, typography, lang }
      });
        /* this.httpService.post<{ iframe: string }>('http://localhost:4000/v1/api/iframe/getIframe'), */
    
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch Url Iframe');
    }
  }
}