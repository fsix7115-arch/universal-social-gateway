export class SecretService {
  static redact(data: any): any {
    if (typeof data !== 'object' || data === null) return data;
    const redacted = { ...data };
    const sensitiveKeys = ['password', 'token', 'cookie', 'secret', 'key'];
    
    for (const key of Object.keys(redacted)) {
      if (sensitiveKeys.some(s => key.toLowerCase().includes(s))) {
        redacted[key] = '[REDACTED]';
      } else if (typeof redacted[key] === 'object') {
        redacted[key] = this.redact(redacted[key]);
      }
    }
    return redacted;
  }
}
