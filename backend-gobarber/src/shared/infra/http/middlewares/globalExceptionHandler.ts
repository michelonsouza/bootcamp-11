import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

export default function globalExceptionHandler(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (error instanceof AppError) {
    return response
      .status(error.satatusCode)
      .json({ status: 'error', message: error.message });
  }

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
}
