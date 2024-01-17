import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  StreamableFile,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class DefaultInterceptor<T>
  implements NestInterceptor<T, Response<T> | StreamableFile>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T> | StreamableFile> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof StreamableFile) {
          return data;
        }

        return this.formatResponse(data);
      }),
    );
  }

  formatResponse(data: any) {
    const { data: content, ...metadata } = data;

    if (content) {
      data = content;
    }

    return {
      data,
      ...metadata,
      timestamp: new Date().toISOString(),
    };
  }
}
