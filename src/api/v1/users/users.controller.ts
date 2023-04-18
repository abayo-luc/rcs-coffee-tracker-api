import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import handleAsync from '../../../utils/handleAsync';
import { User } from '../../../database/models/user';
import { getJWT, hashString } from '../../../utils';
import { CustomError } from '../../../utils/constants';
import { MainController } from '../MainController';

class UserController extends MainController {
  constructor(model: any) {
    super(model);
  }

  create = handleAsync(
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

  login = handleAsync(
    async (req: Request, res: Response) => {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new CustomError(
          'Invalid email or password',
          400
        );
      }

      const isValidPassword = await user.comparePassword(
        password
      );

      if (!isValidPassword) {
        throw new CustomError(
          'Invalid email or password',
          400
        );
      }
      const token = getJWT(user);
      return res.status(200).json({
        token,
        user,
      });
    }
  );
}

export default new UserController(User);
