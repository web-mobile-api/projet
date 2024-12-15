import Router from "express-promise-router";
import {
    addAccount,
    updateAccount,
    deleteAccount,
    getAccount
} from "../controller/accountORM.js";

const router = Router();

router.post("/", addAccount);
router.patch("/", updateAccount);
router.get("/:id", getAccount);
router.delete("/:id", deleteAccount);

export default router;