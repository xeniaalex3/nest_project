import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FailedException } from 'src/exceptions/failed.exception';

@Injectable()
export class QuotaInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const quotaLimit = 100;
    const quotaUsed = Math.floor(Math.random() * 200);

    if (quotaUsed >= quotaLimit) {
      throw new FailedException('Quota lmit exceeded');
    }

    return next.handle();
  }
}
