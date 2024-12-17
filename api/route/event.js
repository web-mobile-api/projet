import Router from "express-promise-router";
import {
    addEvent,
    //updateEvent,
    //deleteEvent,,
    getEventsFrom,
    getEvent,
    getAllEvents
} from "../controller/eventORM.js";

const router = Router();

router.post("/", addEvent);
router.get("/from/:account_id", getEventsFrom);
//router.patch("/:id", updateEvent);
router.get("/id/:id", getEvent);
router.get("/", getAllEvents); //Should return {id, position}[]
//router.delete("/:id", deleteEvent);

export default router;