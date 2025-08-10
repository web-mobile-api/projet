import Router from "express-promise-router";
import {
    addAccount,
    updateAccount,
    deleteAccount,
    getAccount,
    getMultipleAccounts,
    heartbeat,
    login
} from "../../controller/accountORM.js";

import { authenticateAdmin, authenticateToken } from "../../middleware/authMiddleware.js";
import { upload } from "../../controller/photoORM.js";
import { addAccountWithpfp } from "../../controller/accountTransaction.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       properties:
 *         account_id:
 *           type: integer
 *           description: The unique ID of the account
 *         first_name:
 *           type: string
 *           description: The first name of the account holder
 *         last_name:
 *           type: string
 *           description: The last name of the account holder
 *         password:
 *           type: string
 *           description: The password of the account holder
 *         email:
 *           type: string
 *           description: The email of the account holder
 *         phone_number:
 *           type: string
 *           description: The phone number of the account holder
 *         birthdate:
 *           type: string
 *           format: date
 *           description: The birthdate of the account holder
 *         profile_picture:
 *           type: integer
 *           description: The ID of the profile picture
 *         online:
 *           type: boolean
 *           description: The online status of the account holder
 *         last_online:
 *           type: string
 *           format: date-time
 *           description: The last online timestamp of the account holder
 *       required:
 *         - first_name
 *         - last_name
 *         - password
 *         - email
 *         - phone_number
 *         - birthdate
 */


router.post("/login", login);
router.patch("/heartbeat", authenticateToken, heartbeat);
router.post("/", addAccount);
router.post("/withPFP", upload.single("profile_picture"), addAccountWithpfp);
router.patch("/", authenticateToken, authenticateAdmin, updateAccount);
router.get("/ids", authenticateToken, async (req, res, next) => {
    const accountIDsParam = req.query.accountIDs;

    if (!accountIDsParam) {
        return res.status(400).json({ error: 'accountIDs query parameter is required' });
    }

    const accountIDs = accountIDsParam.split(',').map(id => parseInt(id, 10));
    console.log("IDs: ", accountIDs);
    req.query.accountIDs = accountIDs;
    next();
}, getMultipleAccounts);
router.get("/id/:id", authenticateToken, getAccount);
router.delete("/:id", authenticateToken, authenticateAdmin, deleteAccount);

export default router;