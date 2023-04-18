import { Router } from 'express';
import users from './users/users.routes';
import shipments from './shipments/shipments.routes';
import producers from './producers/producers.routes';
import suppliers from './suppliers/suppliers.routes';
const router = Router();

router.use('/users', users);
router.use('/shipments', shipments);
router.use('/producers', producers);
router.use('/suppliers', suppliers);
export default router;
