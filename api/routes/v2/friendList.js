import Router from "express-promise-router";
import {
    addFriendShip,
    updateFriendShip,
    deleteFriendShip,
    getFriendList
} from "../../controller/friendListORM.js";
import { authenticateAdmin, authenticateToken } from "../../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     FriendList:
 *       type: object
 *       properties:
 *         friend_list_id:
 *           type: integer
 *           description: The unique ID of the friendship
 *         friend1_id:
 *           type: integer
 *           description: The ID of the first friend
 *         friend2_id:
 *           type: integer
 *           description: The ID of the second friend
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date the friendship was created
 *       required:
 *         - friend1_id
 *         - friend2_id
 *         - date
 */

router.post("/", authenticateToken, addFriendShip);
router.patch("/:id", authenticateToken, authenticateAdmin, updateFriendShip);
router.get("/:id", authenticateToken, getFriendList);
router.delete("/:id", authenticateToken, authenticateAdmin, deleteFriendShip);

export default router;