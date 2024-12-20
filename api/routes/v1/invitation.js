import Router from "express-promise-router";
import {
    addInvitation,
    updateInvitation,
    getInvitationsAsReceiver,
    getInvitationsAsSender,
    deleteInvitation
} from "../../controller/invitationORM.js";
import { authenticateAdmin, authenticateToken } from "../../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Invitation:
 *       type: object
 *       properties:
 *         invitation_id:
 *           type: integer
 *           description: The unique ID of the invitation
 *         sender_id:
 *           type: integer
 *           description: The ID of the sender
 *         receiver_id:
 *           type: integer
 *           description: The ID of the receiver
 *         sent_at:
 *           type: string
 *           format: date-time
 *           description: The date and time the invitation was sent
 *       required:
 *         - sender_id
 *         - receiver_id
 *         - sent_at
 */

router.post("/", authenticateToken, addInvitation);
router.patch("/", authenticateToken, authenticateAdmin, updateInvitation);
router.get("/receiver/", authenticateToken, getInvitationsAsReceiver);
router.get("/sender/", authenticateToken, getInvitationsAsSender);
router.delete("/:id", authenticateToken, authenticateAdmin, deleteInvitation);

export default router;