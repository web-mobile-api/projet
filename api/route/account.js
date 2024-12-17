import Router from "express-promise-router";
import {
    addAccount,
    updateAccount,
    deleteAccount,
    getAccount
} from "../controller/accountORM.js";
import bcrypt from "bcrypt";
import { generateToken } from "../scripts/JS/jwtUtils.js";
import prisma from "../database/databaseORM.js";
import { authenticateToken } from "../scripts/JS/authMiddleware.js";

const router = Router();

const salt = bcrypt.genSaltSync();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashed = bcrypt.hashSync("password", salt);
        console.log(hashed);
        const user = await prisma.account.findUnique({
            where: { email: email },
        });


    
        if (!user) {
            return res.status(401).json({
                message: {
                    "en": "Invalid email or password.",
                    "fr": "Email ou mot de passe invalide."
                }
            });
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (!passwordMatch) {
            return res.status(401).json({
                message: {
                    "en": "Invalid email or password.",
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
            token: token
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
});
router.patch("/heartbeat", authenticateToken, async(req, res) => {
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
})
router.post("/", addAccount);
router.patch("/", authenticateToken, updateAccount);
router.get("/:id", authenticateToken, getAccount);
router.delete("/:id", deleteAccount);

export default router;