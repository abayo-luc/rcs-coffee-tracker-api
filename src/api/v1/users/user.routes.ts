import { Router } from 'express';
import * as userController from './user.controller';
import * as userValidator from './user.validator';
import authenticate from '../../../middlewares/authenticate';

const router = Router();

router.post(
  ['/', '/register'],
  userValidator.create,
  userController.create
);

router.get('/', authenticate, userController.getAll);
router.get('/:id', authenticate, userController.getById);
router.post(
  '/login',
  userValidator.login,
  userController.login
);

export default router;
