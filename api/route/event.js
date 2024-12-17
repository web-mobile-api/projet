import Router from "express-promise-router";
import {
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsFrom,
    getEvent,
    getAllEvents
} from "../controller/eventORM.js";
import { authenticateAdmin, authenticateToken } from "../scripts/JS/authMiddleware.js";

const router = Router();

router.post("/", authenticateToken, addEvent);
router.get("/from/:account_id", authenticateToken, getEventsFrom);
router.patch("/:id", authenticateToken, authenticateAdmin, updateEvent);
router.get("/id/:id", authenticateToken, getEvent);
router.get("/", authenticateToken, getAllEvents);
router.delete("/:id", authenticateToken, authenticateAdmin, deleteEvent);

export default router;