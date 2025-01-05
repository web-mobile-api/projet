import prisma from "../database/databaseORM.js";
import { Permission } from "../middleware/authMiddleware.js";
import { exclude } from "../scripts/JS/omitField.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../middleware/jwtUtils.js";
const salt = bcryptjs.genSaltSync();

/**
 * @swagger
 * /v1/account/id/{id}:
 *   get:
 *     summary: Retrieve a single account by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The account ID
 *     responses:
 *       200:
 *         description: A single account
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal server error
 */
export const getAccount = async (req, res) => {
    try {
        const account = await prisma.account.findUnique({
            where: {
                account_id: parseInt(req.params.id)
            }
        });
        if(account){
            const accountWithoutPassword = exclude(account, ['password'])
            res.send(accountWithoutPassword);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * /v1/account/ids?accountIDs={accountIDs}:
 *   get:
 *     summary: Retrieve multiple accounts by IDs
 *     parameters:
 *       - in: query
 *         name: accountIDs
 *         required: true
 *         schema:
 *           type: string
 *         description: Comma-separated list of account IDs
 *     responses:
 *       200:
 *         description: A list of accounts
 *       404:
 *         description: Accounts not found
 *       500:
 *         description: Internal server error
 */
export const getMultipleAccounts = async (req, res) => {
    try {
        const accountIds = req.query.accountIDs;
        console.log("Ids: ", accountIds);
        const accounts = await prisma.account.findMany({
            where: {
                account_id: {
                    in: accountIds
                }
            }
        });
        if (accounts) {
            res.send(accounts);
        } else {
            res.send(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

/**
 * @swagger
 * /v1/account:
 *   post:
 *     summary: Create a new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *               profile_picture:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Account created
 *       500:
 *         description: Internal server error
 */
export const addAccount = async (req, res) => {
    try {
        const { first_name, last_name, password, email, phone_number, birthdate, profile_picture } = req.body;

        const { account_id } = await prisma.account.create({
            data: {
                first_name,
                last_name,
                password: bcryptjs.hashSync(password, salt),
                email: email,
                phone_number,
                birthdate: (new Date(birthdate)).toISOString(),
                profile_picture: profile_picture === undefined ? 1 : profile_picture,
                online: false,
                last_online: undefined
            },
            select: {
                account_id: true
            }
        });
        res.status(201).send({account_id});
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * /v1/account:
 *   patch:
 *     summary: Update an existing account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account_id:
 *                 type: integer
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *     responses:
 *       204:
 *         description: Account updated
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
export const updateAccount = async (req, res) => {
    try {
        const account = await prisma.account.findUnique({
            where: {
                email: req.user.email
            }
        });
        const {
            account_id,
            first_name,
            last_name,
            password,
            email,
            phone_number,
            birthdate,
            profile_picture
        } = req.body;

        if (account && (req.perm == Permission.Admin || account_id === account.account_id)){
            await prisma.account.update({
                data: {
                    first_name,
                    last_name,
                    password: bcryptjs.hashSync(password, salt),
                    email,
                    phone_number,
                    birthdate: (new Date(birthdate)).toISOString(),
                    profile_picture
                },
                where: {
                    account_id
                }
            });
            res.sendStatus(204);
        } else {
            res.sendStatus(403);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * /v1/account/{id}:
 *   delete:
 *     summary: Delete an account by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The account ID
 *     responses:
 *       204:
 *         description: Account deleted
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
//Will be changed for a transaction later
export const deleteAccount = async (req, res) => {
    try {
        const account = await prisma.account.findUnique({
            where: {
                email: req.user.email
            }
        });
        const account_id = parseInt(req.params.id);
        if (account && (req.perm == Permission.Admin || account_id === account.account_id)){

            await prisma.account.delete({
                where: {
                    account_id
                }
            });
            res.sendStatus(204);
        } else {
            res.sendStatus(403);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * /v1/account/heartbeat:
 *   patch:
 *     summary: Update the online status of an account
 *     responses:
 *       200:
 *         description: Status updated
 *       500:
 *         description: Internal server error
 */
export const heartbeat = async(req, res) => {
    const email = req.user.email;

    try {
        await prisma.account.update({
            where: {
                email
            },
            data: {
                online: true,
                last_online: new Date().toISOString(),
            },
        });

        return res.json({
            message: {
                "en": "Heartbeat received, status updated.",
                "fr": "Heartbeat reçu, status mis à jour."
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: {
                "en": "Error updating online status.",
                "fr": "Erreur dans la mise à jour du statut en ligne."
            }
        });
    }
}

/**
 * @swagger
 * /v1/account/login:
 *   post:
 *     summary: Login to an account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.account.findUnique({
            where: { email: email },
        });
    
        if (!user) {
            return res.status(401).json({
                message: {
                    "en": "Invalid email.",
                    "fr": "Email ou mot de passe invalide."
                }
            });
        }
    
        const passwordMatch = await bcryptjs.compare(password, user.password);
    
        if (!passwordMatch) {
            return res.status(401).json({
                message: {
                    "en": "Invalid password.",
                    "fr": "Email ou mot de passe invalide."
                }
            });
        }
    
        const token = generateToken(user);
    
        return res.json({ 
            message: {
                "en":"Login successful!",
                "fr": "Connexion réussie!"
            },
            token: token,
            user //this wasn't in the original code
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: {
                "en": "Internal server error.",
                "fr": "Erreur interne au serveur."
            }
        });
    }
}
