import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';

import {
  HMAC_HEADERS,
  REQUEST_EXPIRATION_TIME,
} from '../constants/security.constants';
import { HmacUtil } from '../utils';

@Injectable()
export class HmacGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const apiKey = request.headers[HMAC_HEADERS.API_KEY] as string;
    const signature = request.headers[HMAC_HEADERS.SIGNATURE] as string;
    const timestamp = request.headers[HMAC_HEADERS.TIMESTAMP] as string;

    if (!apiKey || !signature || !timestamp) {
      throw new UnauthorizedException('Missing authentication headers');
    }

    const validApiKey = process.env.NOTEBOOK_API_KEY;

    const secret = process.env.NOTEBOOK_API_SECRET;

    if (apiKey !== validApiKey) {
      throw new UnauthorizedException('Invalid API Key');
    }

    const now = Math.floor(Date.now() / 1000);

    const diff = Math.abs(now - Number(timestamp));

    if (diff > REQUEST_EXPIRATION_TIME) {
      throw new UnauthorizedException('Expired request');
    }

    const expectedSignature = HmacUtil.generateSignature(
      request.body,
      timestamp,
      secret!,
    );

    console.log(signature);
    console.log(expectedSignature);

    if (signature !== expectedSignature) {
      throw new UnauthorizedException('Invalid signature');
    }

    return true;
  }
}
