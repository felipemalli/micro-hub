import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MESSAGES } from '@/common/constants/error-messages';

interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  error: string;
  message: string | string[];
}

interface HttpExceptionResponse {
  error?: string;
  message?: string | string[];
  statusCode?: number;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse = this.buildErrorResponse(exception, request);
    
    if (errorResponse.statusCode >= 500) {
      this.logInternalError(exception);
    }

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private buildErrorResponse(exception: unknown, request: Request): ErrorResponse {
    const baseResponse = {
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    };

    if (exception instanceof HttpException) {
      return {
        ...baseResponse,
        ...this.handleHttpException(exception),
      };
    }

    return {
      ...baseResponse,
      ...this.handleUnknownException(),
    };
  }

  private handleHttpException(exception: HttpException) {
    const status = exception.getStatus();
    const response = exception.getResponse() as HttpExceptionResponse;
    
    if (typeof response === 'string') {
      return {
        statusCode: status,
        error: exception.constructor.name,
        message: response,
      };
    }

    return {
      statusCode: status,
      error: response.error || exception.constructor.name,
      message: response.message || exception.message,
    };
  }

  private handleUnknownException() {
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'InternalServerError',
      message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
    };
  }

  private logInternalError(exception: unknown): void {
    const error = exception as Error;
    this.logger.error(
      `Unexpected error: ${error.message}`,
      error.stack,
    );
  }
}