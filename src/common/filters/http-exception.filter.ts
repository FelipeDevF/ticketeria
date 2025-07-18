import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: typeof exceptionResponse === 'string' 
        ? exceptionResponse 
        : (exceptionResponse as any).message || exception.message,
      error: typeof exceptionResponse === 'object' 
        ? (exceptionResponse as any).error 
        : 'Internal Server Error',
    };

    // Log do erro
    console.error(`[${new Date().toISOString()}] ${request.method} ${request.url} - ${status}`, {
      error: errorResponse,
      userAgent: request.get('User-Agent'),
      ip: request.ip,
    });

    response.status(status).json(errorResponse);
  }
} 