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

router.post("/", authenticateToken, addLocation);
router.patch("/", authenticateToken, authenticateToken, updateLocation);
router.get("/id/:id", authenticateToken, getLocationById);
router.get("/position/:position", authenticateToken, getLocationByPosition);
router.delete("/id/:id", authenticateToken, authenticateToken, deleteLocationById);
router.delete("/position/:position", authenticateToken, authenticateToken, deleteLocationByPosition);

export default router;