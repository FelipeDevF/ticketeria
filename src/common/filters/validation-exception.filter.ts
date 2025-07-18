import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    // Verifica se é um erro de validação
    if (exceptionResponse.message && Array.isArray(exceptionResponse.message)) {
      const validationErrors = this.formatValidationErrors(exceptionResponse.message);
      
      const errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message: 'Erro de validação',
        errors: validationErrors,
      };

      console.error(`[${new Date().toISOString()}] ${request.method} ${request.url} - Validação falhou`, {
        errors: validationErrors,
        body: request.body,
      });

      return response.status(status).json(errorResponse);
    }

    // Se não for erro de validação, retorna o erro padrão
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exceptionResponse.message || exception.message,
    };

    response.status(status).json(errorResponse);
  }

  private formatValidationErrors(errors: string[]): Array<{ field: string; message: string }> {
    return errors.map(error => {
      // Extrai o campo e a mensagem do erro de validação
      const match = error.match(/^([^.]+): (.+)$/);
      if (match) {
        return {
          field: match[1],
          message: match[2],
        };
      }
      return {
        field: 'unknown',
        message: error,
      };
    });
  }
} 