import bcrypt from 'bcrypt';

import { NextFunction, Response, Request } from 'express';
import {
  CelebrateError,
  isCelebrateError,
} from 'celebrate';

export const hashString = (value: string) =>
  bcrypt.hash(value, 10);

export const formatValidationError = (
  err: CelebrateError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!isCelebrateError(err)) return next(err);
  //const joiError = err.joi.details[0];
  //let message = joiError.message;

  return res.status(400).json({
    message: err.message,
    errors: err.details.get('body')?.details,
  });
};
