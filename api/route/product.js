import Router from "express-promise-router";
import {
    addProduct,
    updateProduct,
    getProduct, deleteProduct
} from "../controller/product.js";

const router = Router();

router.post("/", addProduct);
router.patch("/", updateProduct);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);

export default router;