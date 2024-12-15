import Router from "express-promise-router";
import {
    addFriendShip,
    updateFriendShip,
    deleteFriendShip,
    getFriendList
} from "../controller/friendListORM.js";

const router = Router();

router.post("/", addFriendShip);
router.patch("/:id", updateFriendShip);
router.get("/:id", getFriendList);
router.delete("/:id", deleteFriendShip);

export default router;