import prisma from "../database/databaseORM.js";
import { exclude } from "../scripts/JS/omitField.js";

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

//This could become a transaction or we just put a default pfp
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
        const { account_id, first_name, last_name, password, email, phone_number, birthdate } = req.body;
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
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};

//Will be changed for a transaction later
export const deleteAccount = async (req, res) => {
    try {
        await prisma.account.delete({
            where: {
                account_id: parseInt(req.params.id)
            }
        });
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};


