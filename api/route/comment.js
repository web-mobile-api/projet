import Router from "express-promise-router";
import {
    deleteComment,
    getCommentsFrom,
    getComment,
    addComment
} from "../controller/commentORM.js";
import { authenticateAdmin, authenticateToken } from "../scripts/JS/authMiddleware.js";

const router = Router();

router.post("/", authenticateToken, addComment);
router.get("/from/:event_id/:account_id", authenticateToken, getCommentsFrom);
router.get("/id/:id", authenticateToken, getComment);
router.delete("/:id", authenticateToken, authenticateAdmin, deleteComment);

export default router;