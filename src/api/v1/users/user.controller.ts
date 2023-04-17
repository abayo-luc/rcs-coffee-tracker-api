import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import handleAsync from '../../../utils/handleAsync';
import { User } from '../../../database/models/user';
import { hashString } from '../../../utils';
import { findById } from '../../../utils/model.helper';
import { CustomError } from '../../../utils/constants';

export const create = handleAsync(
  async (req: Request, res: Response) => {
    const { email, password, ...restOfBody } = req.body;
    let user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return res.status(400).json({
        message: 'Email already taken',
      });
    }
    const hashedPassword = await hashString(password);
    user = await User.create({
      email,
      password: hashedPassword,
      ...restOfBody,
    });
    return res.status(201).json(user);
  }
);

export const getAll = handleAsync(
  async (req: Request, res: Response) => {
    const { count, rows } = await User.findAndCountAll();
    return res.status(200).json({
      count,
      rows,
    });
  }
);

export const getById = handleAsync(
  async (req: Request, res: Response) => {
    const data = await findById(req.params.id, User);
    return res.status(200).json(data);
  }
);

export const login = handleAsync(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new CustomError(
        'Invalid email or password',
        401
      );
    }

    const isValidPassword = await user.comparePassword(
      password
    );

    if (!isValidPassword) {
      throw new CustomError(
        'Invalid email or password',
        401
      );
    }
    const token = jwt.sign(
      {
        provider: 'rcs-coffee-tracker-api',
        id: user.id,
        role: user.role,
      },
      process.env.APP_SECRETE as string
    );
    return res.status(200).json({
      token,
      user,
    });
  }
);
