import Router from "express-promise-router";
import {
    addLocation,
    updateLocation,
    getLocationById,
    getLocationByPosition,
    deleteLocationById,
    deleteLocationByPosition
} from "../controller/locationORM.js";
import { authenticateAdmin, authenticateToken } from "../scripts/JS/authMiddleware.js";

const router = Router();

router.post("/", addLocation);
router.patch("/", updateLocation);
router.get("/id/:id", getLocationById);
router.get("/position/:position", getLocationByPosition);
router.delete("/id/:id", deleteLocationById);
router.delete("/position/:position", deleteLocationByPosition)

export default router;