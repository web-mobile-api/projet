import {Router} from 'express';
import {default as accountRouter} from './account.js'
const router = Router();

router.use('/account', accountRouter)

export default router;