import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey =
      typeof request.headers['x-api-key'] === 'string'
        ? request.headers['x-api-key']
        : undefined;

    const host = request.hostname;

    const isLocal = host === 'localhost' || host === '127.0.0.1';

    const validApiKey = isLocal
      ? process.env.API_KEY_TEST
      : process.env.API_KEY;

    if (apiKey !== validApiKey) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }
}
