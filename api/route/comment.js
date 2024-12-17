import Router from "express-promise-router";
import {
    deleteComment,
    getCommentsFrom,
    getComment,
    addComment
} from "../controller/commentORM.js";

const router = Router();

router.post("/", addComment);
router.get("/from/:event_id/:account_id", getCommentsFrom);
router.get("/id/:id", getComment);
router.delete("/:id", deleteComment);

export default router;