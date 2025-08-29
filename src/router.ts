import { Router } from 'express';
import { body } from 'express-validator';
import { createAccount } from './handlers';

const router = Router();

/** User Registration */
router.post('/auth/register', 
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Must be at least 6 characters long'),
  body('handle').notEmpty().withMessage('Handle is required'),
  createAccount);

export default router