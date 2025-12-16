import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsOptional, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRES_IN: string;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  REDIS_HOST: string;

  @IsNumber()
  REDIS_PORT: number;

  @IsString()
  STRIPE_SECRET_KEY: string;

  @IsString()
  @IsOptional()
  SENTRY_DSN?: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    console.error(errors);
    throw new Error('❌ Invalid environment configuration');
  }

  return validatedConfig;
}
