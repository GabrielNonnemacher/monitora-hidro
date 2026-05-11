import * as crypto from 'crypto';

export class HmacUtil {
  public static generateSignature(
    body: unknown,
    timestamp: string,
    secret: string,
  ): string {
    const payload = `${JSON.stringify(body)}${timestamp}`;
    return crypto.createHmac('sha256', secret).update(payload).digest('hex');
  }
}
