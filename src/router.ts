import { Router } from 'express';
import User from './models/User';

const router = Router();

/** User Registration */
router.post('/auth/register', async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  await user.save();
  res.send('Register Endpoint');
})

export default router