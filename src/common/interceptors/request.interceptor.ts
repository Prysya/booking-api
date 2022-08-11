import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';

interface RequestInterceptorData {
  status: string;
  data: any;
}

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ):
    | Observable<RequestInterceptorData>
    | Promise<Observable<RequestInterceptorData>> {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        data,
      })),
      catchError(async (err) => ({
        status: 'fail',
        data: err,
      })),
    );
  }
}
