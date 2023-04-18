import { Router } from 'express';
import users from './users/users.routes';
import shipments from './shipments/shipments.routes';
const router = Router();

router.use('/users', users);
router.use('/shipments', shipments);
export default router;
