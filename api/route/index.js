import {Router} from 'express';
import {default as accountRouter} from './account.js';
import { default as locationRouter } from './location.js';
import { default as friendListRouter } from "./friendList.js";
import { default as photoRouter } from "./photo.js";
import { default as eventRouteur } from "./event.js";

const router = Router();

router.use('/account', accountRouter);
router.use('/location', locationRouter);
router.use('/friendList', friendListRouter);
router.use('/photo', photoRouter);
router.use('/event', eventRouteur);

export default router;