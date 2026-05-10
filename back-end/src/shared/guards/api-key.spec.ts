import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ApiKeyGuard } from './api-key';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;

  beforeEach(() => {
    guard = new ApiKeyGuard();

    process.env.API_KEY = 'prod-key';
    process.env.API_KEY_TEST = 'test-key';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const createMockContext = (
    apiKey: string | undefined,
    hostname: string,
  ): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            'x-api-key': apiKey,
          },
          hostname,
        }),
      }),
    }) as ExecutionContext;

  it('should allow request with production api key', () => {
    const context = createMockContext('prod-key', 'api.meusite.com');
    const result = guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should allow request with local api key', () => {
    const context = createMockContext('test-key', 'localhost');
    const result = guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should allow request with local api key using 127.0.0.1', () => {
    const context = createMockContext('test-key', '127.0.0.1');
    const result = guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException for invalid production api key', () => {
    const context = createMockContext('invalid-key', 'api.meusite.com');
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    expect(() => guard.canActivate(context)).toThrow('Invalid API Key');
  });

  it('should throw UnauthorizedException for invalid local api key', () => {
    const context = createMockContext('invalid-key', 'localhost');
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    expect(() => guard.canActivate(context)).toThrow('Invalid API Key');
  });

  it('should throw UnauthorizedException when x-api-key is undefined', () => {
    const context = createMockContext(undefined, 'localhost');
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException when x-api-key is not a string', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            'x-api-key': ['test-key'],
          },
          hostname: 'localhost',
        }),
      }),
    } as ExecutionContext;
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });
});
