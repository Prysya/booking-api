import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const data = exception.getResponse();

    response.status(status ?? 500).json({
      timestamp: new Date().toISOString(),
      status: 'fail',
      data,
      code: status ?? 500,
    });
  }
}
