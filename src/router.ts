import { Router } from 'express';
import { body } from 'express-validator';
import { createAccount, getUser, login } from './handlers';
import { validateRequest } from './middleware/validations';
import { authenticate } from './middleware/auth';

const router = Router();

/** User Registration */
router.post('/auth/register', 
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Must be at least 6 characters long'),
  body('handle').notEmpty().withMessage('Handle is required'),
  validateRequest,
  createAccount);

router.post('/auth/login',
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password').isLength({ min: 6 }),
  validateRequest,
  login);

router.get('/user', authenticate, getUser);

export default router