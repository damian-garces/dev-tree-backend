import { Router } from 'express';

const router = Router();

// Routing
router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get('/blog', (req, res) => {
  res.send('Hello World Blog!')
})

export default router