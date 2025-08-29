import { Router } from 'express';
import { createAccount } from './handlers';

const router = Router();

/** User Registration */
router.post('/auth/register', createAccount);

export default router