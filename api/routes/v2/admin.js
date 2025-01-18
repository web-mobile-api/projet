import Router from "express-promise-router";
import { addAdmin, getAdmins, updateAdmin, getAdmin } from "../../controller/adminORM.js";

import { authenticateAdmin, authenticateToken } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/", addAdmin);
router.patch("/", authenticateToken, authenticateAdmin, updateAdmin);
router.get("/", authenticateToken, getAdmins);
router.get("/id/:id", authenticateAdmin, getAdmin);

export default router;