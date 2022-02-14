import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let temp: string[];

    switch (exception.code) {
      case 'P2002':
        const status = HttpStatus.CONFLICT;
        let message = exception.message.replace(/\n/g, '');
        if (message.includes('Unique constraint failed on the fields')) {
          temp = message.split('Unique constraint failed on the fields: ');
          temp = temp[1].split('`');
          temp.shift();
          temp.pop();

          message = `${temp.toString()} already exists`;
        }
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;

      default:
        super.catch(exception, host);
        break;
    }
  }
}
