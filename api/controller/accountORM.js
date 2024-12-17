import prisma from "../database/databaseORM.js";
import { Permission } from "../scripts/JS/authMiddleware.js";
import { exclude } from "../scripts/JS/omitField.js";
import bcrypt from "bcrypt";
import { generateToken } from "../scripts/JS/jwtUtils.js";
const salt = bcrypt.genSaltSync();


export const getAccount = async (req, res)=> {
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

export const getMultipleAccounts = async (req, res) => {
    try {
        const { accountIds } = req.body;
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

    }
}

export const addAccount = async (req, res) => {
    try {
        const { first_name, last_name, password, email, phone_number, birthdate, profile_picture } = req.body;
        const { account_id } = await prisma.account.create({
            data: {
                first_name,
                last_name,
                password,
                email: email.toLowerCase(),
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
            birthdate
        } = req.body;

        if (account && (req.perm == Permission.Admin || account_id === account.account_id)){
            await prisma.account.update({
                data: {
                    first_name,
                    last_name,
                    password,
                    email,
                    phone_number,
                    birthdate: (new Date(birthdate)).toISOString()
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

export const login = async (req, res) => {
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
}
