import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(__: Request, _: Response, next: (error?: any) => void) {
    next();
  }
}
