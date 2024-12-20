import Router from "express-promise-router";
import {
    addPhoto,
    updatePhoto,
    getPhotoById,
    getPhotoByPath,
    deletePhoto,
    upload
} from "../../controller/photoORM.js";
import { authenticateAdmin, authenticateToken } from "../../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Photo:
 *       type: object
 *       properties:
 *         photo_id:
 *           type: integer
 *           description: The unique ID of the photo
 *         file_name:
 *           type: string
 *           description: The file name of the photo
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time the photo was created
 *       required:
 *         - file_name
 */

router.post("/", authenticateToken, upload.single("photo"), addPhoto);
router.patch("/", authenticateAdmin, authenticateToken, updatePhoto);
router.get("/id/:id", authenticateToken, getPhotoById);
router.get("/uploads/:filename", authenticateToken, getPhotoByPath);
router.delete("/:id", authenticateAdmin, authenticateToken, deletePhoto);

export default router;