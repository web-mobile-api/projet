import Router from "express-promise-router";
import {
    addPhoto,
    updatePhoto,
    getPhotoById,
    getPhotoByPath,
    deletePhoto,
    upload
} from "../controller/photoORM.js";
import { authenticateAdmin, authenticateToken } from "../scripts/JS/authMiddleware.js";

const router = Router();

router.post("/", authenticateToken, upload.single("photo"), addPhoto);
router.patch("/", authenticateAdmin, authenticateToken, updatePhoto);
router.get("/id/:id", authenticateToken, getPhotoById);
router.get("/uploads/:filename", authenticateToken, getPhotoByPath);
router.delete("/:id", authenticateAdmin, authenticateToken, deletePhoto);

export default router;