import Router from "express-promise-router";
import {postPurchase, purchaseWithRegistration} from "../controller/purchase.js";

const router = new Router();

router.post("/", postPurchase);
router.post("/withRegistration", purchaseWithRegistration);

export default router;