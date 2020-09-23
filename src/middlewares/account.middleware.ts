import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from 'nestjs-config';
import { get } from 'request-promise';

@Injectable()
export class AccountMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  async use(req: Request, res: Response, next: Function) {
    const authApi = this.configService.get('endpoint.auth_api');
    if (!authApi) {
      throw new UnauthorizedException();
    }
    const headers = {
      'Content-type': 'application/json',
      'Authorization': req.headers.authorization || ''
    };    
    const options = {
        headers,
        transform: (body, response) => response
    };
    try {
      const result = await get(`${authApi}/admin/verify`, options); 
      const userData = JSON.parse(result.body);
      req['user'] = userData;
    } catch(e) {
      throw new UnauthorizedException();
    }
    next();
  }
}
