import Router from "express-promise-router";
import {
    addPhoto,
    updatePhoto,
    getPhotoById,
    getPhotoByPath,
    deletePhoto,
    upload
} from "../controller/photoORM.js";

const router = Router();

router.post("/", upload.single("photo"), addPhoto);
router.patch("/", updatePhoto);
router.get("/id/:id", getPhotoById);
router.get("/uploads/:filename", getPhotoByPath);
router.delete("/:id", deletePhoto);

export default router;