import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - start;
        this.logger.log(`${method} ${url} - ${responseTime}ms`);
      }),
    );
  }
}
