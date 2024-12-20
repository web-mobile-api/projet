import { Router } from 'express';
import { default as v1AccountRouter } from './v1/account.js';
import { default as v1LocationRouter } from './v1/location.js';
import { default as v1FriendListRouter } from './v1/friendList.js';
import { default as v1PhotoRouter } from './v1/photo.js';
import { default as v1EventRouter } from './v1/event.js';
import { default as v1CommentRouter } from './v1/comment.js';

const router = Router();

router.use('/v1/account', v1AccountRouter);
router.use('/v1/location', v1LocationRouter);
router.use('/v1/friendList', v1FriendListRouter);
router.use('/v1/photo', v1PhotoRouter);
router.use('/v1/event', v1EventRouter);
router.use('/v1/comment', v1CommentRouter);

export default router;