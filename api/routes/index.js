import { Router } from 'express';
import { default as v1AccountRouter } from './v1/account.js';
import { default as v1LocationRouter } from './v1/location.js';
import { default as v1FriendListRouter } from './v1/friendList.js';
import { default as v1PhotoRouter } from './v1/photo.js';
import { default as v1EventRouter } from './v1/event.js';
import { default as v1CommentRouter } from './v1/comment.js';

const router = Router();

const v1Router = Router();

v1Router.use('/account', v1AccountRouter);
v1Router.use('/location', v1LocationRouter);
v1Router.use('/friendList', v1FriendListRouter);
v1Router.use('/photo', v1PhotoRouter);
v1Router.use('/event', v1EventRouter);
v1Router.use('/comment', v1CommentRouter);

router.use('/v1', v1Router);

export default router;