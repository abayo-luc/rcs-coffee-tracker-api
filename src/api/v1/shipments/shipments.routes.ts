import { Router } from 'express';
import controller from './shipments.controller';
import * as validator from './shipments.validator';
import authenticate from '../../../middlewares/authenticate';

const router = Router();
router.use(authenticate);
router.post('/', validator.create, controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findById);
export default router;
