import prisma from "../database/databaseORM.js";

export const getPhoto = async (req, res)=> {
    try {
        const account = await prisma.account.findUnique({
            where: {
                account_id: parseInt(req.params.id)
            }
        });
        if(account){
            res.send(account);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const addPhoto = async (req, res) => {
    try {
        const {first_name, last_name, password, email, phone_number, birthdate} = req.body;
        const {account_id} = await prisma.account.create({
            data: {
                first_name,
                last_name,
                password,
                email,
                phone_number,
                birthdate: (new Date(birthdate)).toISOString()
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

export const updatePhoto = async (req, res) => {
    try {
        const {first_name, last_name, password, email, phone_number, birthdate} = req.body;
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
                id
            }
        });
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};

//Will be changed for a transaction later
export const deletePhoto = async (req, res) => {
    try {
        await prisma.account.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};


