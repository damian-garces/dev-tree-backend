import { Router } from 'express';

const router = Router();

/** User Registration */
router.post('/auth/register', (req, res) => {
  console.log(req.body);
  res.send('Register Endpoint');
})

export default router