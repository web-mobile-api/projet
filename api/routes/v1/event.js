import Router from "express-promise-router";
import {
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsFrom,
    getEvent,
    getAllEvents,
    approveEvent
} from "../../controller/eventORM.js";
import { authenticateAdmin, authenticateToken } from "../../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         event_id:
 *           type: integer
 *           description: The unique ID of the event
 *         location_id:
 *           type: integer
 *           description: The ID of the location where the event is held
 *         author_id:
 *           type: integer
 *           description: The ID of the author who created the event
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the event was created
 *         name:
 *           type: string
 *           description: The name of the event
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the event is scheduled
 *         reccurence:
 *           type: string
 *           description: The recurrence pattern of the event
 *       required:
 *         - location_id
 *         - author_id
 *         - name
 *         - date
 */

router.post("/", authenticateToken, addEvent);
router.get("/from/:account_id", authenticateToken, getEventsFrom);
router.patch("/:id", authenticateToken, authenticateAdmin, updateEvent);
router.get("/id/:id", authenticateToken, getEvent);
router.get("/", authenticateToken, getAllEvents);
router.delete("/:id", authenticateToken, authenticateAdmin, deleteEvent);
router.patch("/approve/:id", authenticateToken, authenticateAdmin, approveEvent);

export default router;