import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { NextFunction, Response, Request } from 'express';
import {
  CelebrateError,
  isCelebrateError,
} from 'celebrate';
import { User } from '../database/models/user';

export const hashString = (value: string) =>
  bcrypt.hash(value, 10);

export const getJWT = (user: User) =>
  jwt.sign(
    {
      provider: 'rcs-coffee-tracker-api',
      id: user.id,
      role: user.role,
    },
    process.env.APP_SECRETE as string
  );
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
