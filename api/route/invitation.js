import Router from "express-promise-router";
import {
    addInvitation,
    updateInvitiation,
    getInvitationsAsReceiver,
    getInvitationsAsSender,
    deleteInvitation
} from "../controller/invitationORM.js";
import { authenticateAdmin, authenticateToken } from "../scripts/JS/authMiddleware.js";

const router = Router();

router.post("/", authenticateToken, addInvitation);
router.patch("/", authenticateToken, authenticateAdmin, updateInvitiation)
router.get("/sender/", authenticateToken, getInvitationsAsSender);
router.get("/receiver/", authenticateToken, getInvitationsAsReceiver);
router.delete("/:id", authenticateToken, authenticateAdmin, deleteInvitation);

export default router;