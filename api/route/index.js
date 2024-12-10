import {Router} from 'express';
import {default as productRouter} from './product.js';
import {default as purchaseRouter} from './purchase.js';
const router = Router();

router.use('/product', productRouter);
router.use('/purchase', purchaseRouter);

export default router;