import { Environment } from './environment.type';

export const environment: Environment = {
  production: false,
  apiUrl: import.meta.env.NG_APP_API_URL,
  apiKey: import.meta.env.NG_APP_API_KEY,
};
