import { Request, Response } from 'express';

interface CallbackFunction {
  (...params: Array<any>): void;
}

export default (callback: CallbackFunction) =>
  async (
    req: Request,
    res: Response,
    ...params: any
  ): Promise<void> => {
    try {
      await callback(req, res, ...params);
    } catch (error: any) {
      res.status(error.code || 400).json({
        message: error.message,
        error,
      });
    }
  };
