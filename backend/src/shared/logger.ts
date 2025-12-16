import pino from 'pino';
export function createLogger(env = 'development') {
  return pino({ level: process.env.LOG_LEVEL || 'info', transport: env !== 'production' ? { target: 'pino-pretty' } : undefined });
}
