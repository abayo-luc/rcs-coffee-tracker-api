import { Router } from 'express';
import controller from './suppliers.controller';
import * as validator from './suppliers.validator';
import authenticate from '../../../middlewares/authenticate';
const router = Router();

router.use(authenticate);
router.post('/', validator.create, controller.create);
router.get('/:id', controller.findById);
router.get('/', controller.findAll);

export default router;
