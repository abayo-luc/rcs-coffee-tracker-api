import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../database/models/user';

interface AuthRequest extends Request {
  user?: User;
}

export default async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const [strategy, token] =
    req.headers.authorization?.split(' ') || [];

  if (strategy !== 'Bearer' || !token?.trim()) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  try {
    const decoded: any = jwt.verify(
      token,
      process.env.APP_SECRETE as string
    );
    if (!decoded) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    req.user = user;
    return next();
  } catch (error: any) {
    return res.status(401).json({
      message: error.message || 'Unauthorized',
    });
  }
};
