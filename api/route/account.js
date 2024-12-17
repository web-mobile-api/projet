import Router from "express-promise-router";
import {
    addAccount,
    updateAccount,
    deleteAccount,
    getAccount,
    getMultipleAccounts,
    heartbeat,
    login
} from "../controller/accountORM.js";

import { authenticateAdmin, authenticateToken } from "../scripts/JS/authMiddleware.js";

const router = Router();

router.post("/login", login);
router.patch("/heartbeat", authenticateToken, heartbeat);
router.post("/", addAccount);
router.patch("/", authenticateToken, authenticateAdmin, updateAccount);
router.get("/:id", authenticateToken, getAccount);
router.get("/", authenticateToken, getMultipleAccounts);
router.delete("/:id", authenticateToken, authenticateAdmin, deleteAccount);

export default router;