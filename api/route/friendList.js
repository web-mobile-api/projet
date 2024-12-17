import Router from "express-promise-router";
import {
    addFriendShip,
    updateFriendShip,
    deleteFriendShip,
    getFriendList
} from "../controller/friendListORM.js";
import { authenticateAdmin, authenticateToken } from "../scripts/JS/authMiddleware.js";

const router = Router();

router.post("/", authenticateToken, addFriendShip);
router.patch("/:id", authenticateToken, authenticateAdmin, updateFriendShip);
router.get("/:id", authenticateToken, getFriendList);
router.delete("/:id", authenticateToken, authenticateAdmin, deleteFriendShip);

export default router;