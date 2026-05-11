import { ApiHeaderOptions } from '@nestjs/swagger';

export const LocationIdExample = {
  example: '6a009701f5ce5c5f11be2491',
};

export const ApiKeyGuardExample: ApiHeaderOptions = {
  name: 'x-api-key',
  description: 'Chave de acesso da API',
  required: true,
  example: '123456abcdef',
};

export const ApiPropertyExamples = {
  Date: { example: '2026-05-07T12:00:00Z' },
  Number: { example: 3.5 },
  String: { example: 'Example string' },
};

export const HmacApiKeyHeader: ApiHeaderOptions = {
  name: 'x-api-key',
  description: 'API Key do notebook',
  required: true,
  example: 'notebook-01',
};

export const HmacTimestampHeader: ApiHeaderOptions = {
  name: 'x-timestamp',
  description: 'Timestamp UNIX em segundos',
  required: true,
  example: '1715356800',
};

export const HmacSignatureHeader: ApiHeaderOptions = {
  name: 'x-signature',
  description: 'Assinatura HMAC SHA256 da requisição',
  required: true,
  example: '8f2b7c2c0b4f6f4f8b8d4f9d6f7c1b5f9d8c7a6b5e4d3c2b1a0f9e8d7c6b5a4',
};
