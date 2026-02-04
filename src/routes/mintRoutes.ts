import { Router, type IRouter } from 'express';
import { mintFromUsdc } from '../controllers/mintController';
import { validateApiKey } from '../middleware/auth';
import { apiKeyRateLimiter } from '../middleware/rateLimiter';

const router: IRouter = Router();
router.use(validateApiKey);
router.use(apiKeyRateLimiter);
router.post('/usdc', mintFromUsdc);
export default router;
