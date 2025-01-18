import Router from "express-promise-router";
import { addReport, getReports, getReport, deleteReport } from "../../controller/reasonORM.js";
import { authenticateAdmin, authenticateToken } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/", authenticateToken, addReport);
router.get("/", authenticateToken, authenticateAdmin, getReports);
router.get("/id/:id", authenticateToken, getReport);
router.delete("/", authenticateToken, authenticateAdmin, deleteReport);

export default router;