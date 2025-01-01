import Router from "express-promise-router";
import {
    addLocation,
    updateLocation,
    getLocationById,
    getLocationByPosition,
    deleteLocationById,
    deleteLocationByPosition
} from "../../controller/locationORM.js";
import { authenticateAdmin, authenticateToken } from "../../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         location_id:
 *           type: integer
 *           description: The unique ID of the location
 *         street:
 *           type: string
 *           description: The street of the location
 *         num:
 *           type: integer
 *           description: The number of the location
 *         city:
 *           type: string
 *           description: The city of the location
 *         code:
 *           type: integer
 *           description: The postal code of the location
 *         country:
 *           type: string
 *           description: The country of the location
 *         position:
 *           type: string
 *           description: The position of the location
 *       required:
 *         - street
 *         - num
 *         - city
 *         - code
 *         - country
 *         - position
 */

router.post("/", authenticateToken, addLocation);
router.patch("/", authenticateToken, authenticateToken, updateLocation);
router.get("/id/:id", authenticateToken, getLocationById);
router.get("/position/:position", authenticateToken, getLocationByPosition);
router.delete("/id/:id", authenticateToken, authenticateToken, deleteLocationById);
router.delete("/position/:position", authenticateToken, authenticateToken, deleteLocationByPosition);

export default router;