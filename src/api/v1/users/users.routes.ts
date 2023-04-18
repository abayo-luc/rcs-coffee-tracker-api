import { Router } from 'express';
import userController from './users.controller';
import * as userValidator from './users.validator';
import authenticate from '../../../middlewares/authenticate';

const router = Router();

router.post(
  ['/', '/register'],
  userValidator.create,
  userController.create
);

router.get('/', authenticate, userController.findAll);
router.get('/:id', authenticate, userController.findById);
router.post(
  '/login',
  userValidator.login,
  userController.login
);

export default router;
