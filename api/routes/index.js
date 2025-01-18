import { Router } from 'express';
import { default as v1AccountRouter } from './v1/account.js';
import { default as v1LocationRouter } from './v1/location.js';
import { default as v1FriendListRouter } from './v1/friendList.js';
import { default as v1PhotoRouter } from './v1/photo.js';
import { default as v1EventRouter } from './v1/event.js';
import { default as v1CommentRouter } from './v1/comment.js';


import { default as v2AccountRouter } from './v2/account.js';
import { default as v2LocationRouter } from './v2/location.js';
import { default as v2FriendListRouter } from './v2/friendList.js';
import { default as v2PhotoRouter } from './v2/photo.js';
import { default as v2EventRouter } from './v2/event.js';
import { default as v2CommentRouter } from './v2/comment.js';
import { default as v2AdminRouter } from './v2/admin.js';
import { default as v2ReportRouter } from './v2/report.js';

const router = Router();

const v1Router = Router();
const v2Router = Router();

v1Router.use('/account', v1AccountRouter);
v1Router.use('/location', v1LocationRouter);
v1Router.use('/friendList', v1FriendListRouter);
v1Router.use('/photo', v1PhotoRouter);
v1Router.use('/event', v1EventRouter);
v1Router.use('/comment', v1CommentRouter);


v2Router.use('/account', v2AccountRouter);
v2Router.use('/location', v2LocationRouter);
v2Router.use('/friendList', v2FriendListRouter);
v2Router.use('/photo', v2PhotoRouter);
v2Router.use('/event', v2EventRouter);
v2Router.use('/comment', v2CommentRouter);
v2Router.use('/admin', v2AdminRouter);
v2Router.use('/report', v2ReportRouter);

router.use('/v1', v1Router);
router.use('/v2', v2Router);

export default router;