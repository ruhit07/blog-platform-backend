import { ErrorType } from '@common/enums';
import { Key } from '@common/enums/keys.enum';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch()
export class AppExceptionFilter<T> implements ExceptionFilter {
  private logger = new Logger(AppExceptionFilter.name);

  constructor(public reflector: Reflector) {}

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req: Request = ctx.getRequest<Request>();
    const res: Response = ctx.getResponse<Response>();

    let statusCode: HttpStatus;
    let errorName: string;
    let message: string;
    let errors: any;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      errorName = exception.constructor.name;
      message = exception.message;
      const exp = exception.getResponse() as {
        errorType: ErrorType | string;
        message: string | string[];
      };
      errors = exp.message;
      if (errorName === 'CustomValidationException') {
        errors = {};
        const exp = exception.getResponse() as {
          errors: any;
          validateBy: string;
        };
        if (exp.validateBy === 'ClassValidator') {
          exp.errors.forEach(
            (err) => (errors[err.property] = Object.keys(err.constraints).map((key) => err.constraints[key])),
          );
        }
      }
    } else if (exception instanceof Error) {
      errorName = exception.constructor.name;
      message = exception.message;
    } else {
      statusCode = statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      errorName = errorName || 'InternalException';
      message = message || 'Internal server error';
    }

    this.logger.error(errors || message);

    return res.status(statusCode).json({
      statusCode,
      errorName,
      message,
      errors,
      timestamp: new Date().toISOString(),
      path: req.url,
      requestId: req.headers[Key.RequestIdTokenHeader],
    });
  }
}
