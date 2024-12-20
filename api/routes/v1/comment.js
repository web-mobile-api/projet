import Router from "express-promise-router";
import {
    deleteComment,
    getCommentsFrom,
    getComment,
    addComment
} from "../../controller/commentORM.js";
import { authenticateAdmin, authenticateToken } from "../../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         comment_id:
 *           type: integer
 *           description: The unique ID of the comment
 *         content:
 *           type: string
 *           description: The content of the comment
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date the comment was created
 *         author_id:
 *           type: integer
 *           description: The ID of the author who created the comment
 *         event_id:
 *           type: integer
 *           description: The ID of the event the comment is associated with
 *       required:
 *         - content
 *         - date
 *         - author_id
 *         - event_id
 */

router.post("/", authenticateToken, addComment);
router.get("/from/:event_id/:account_id", authenticateToken, getCommentsFrom);
router.get("/id/:id", authenticateToken, getComment);
router.delete("/:id", authenticateToken, authenticateAdmin, deleteComment);

export default router;