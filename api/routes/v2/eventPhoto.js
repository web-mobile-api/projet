import Router from "express-promise-router";
import {
    addEventPhoto,
    deleteEventPhoto,
    getEventPhoto,
    updateEventPhoto,
    
} from "../../controller/eventPhotoORM.js";
import { authenticateAdmin, authenticateToken } from "../../middleware/authMiddleware.js";
import { upload } from "../../controller/photoORM.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     EventPhoto:
 *       type: object
 *       properties:
 *         event_photo_id:
 *           type: integer
 *           description: The unique ID of the event photo
 *         photo_id:
 *           type: integer
 *           description: The ID of the photo the event photo is associated with
 *         event_id:
 *           type: integer
 *           description: The ID of the event the photo is associated with
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time the photo was created
 *       required:
 *         - file_name
 */

router.post("/", authenticateToken, upload.single("photo"), addEventPhoto);
router.patch("/", authenticateToken, authenticateAdmin, updateEventPhoto);
router.get("/id/:id", authenticateToken, getEventPhoto);
//This doesn't work for whatever reason
router.delete("/:id", authenticateToken, authenticateAdmin, deleteEventPhoto);

export default router;