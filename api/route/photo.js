import Router from "express-promise-router";
import {
    addPhoto,
    updatePhoto,
    getPhotoById,
    getPhotoByPath,
    deletePhotoById,
    deletePhotoByPath
} from "../controller/photoORM.js";

const router = Router();

router.post("/", addPhoto);
router.patch("/", updatePhoto);
router.get("/id/:id", getPhotoById);
router.get("/path/:path", getPhotoByPath);
router.delete("/id/:id", deletePhotoById);
router.delete("/path/:path", deletePhotoByPath)

export default router;