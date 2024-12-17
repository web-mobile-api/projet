import prisma from "../database/databaseORM.js";

export const getFriendList = async (req, res)=> {
    try {
        const account = await prisma.friendList.findMany({
            where: {
                friend_list_id: parseInt(req.params.id)
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

export const addFriendShip = async (req, res) => {
    try {
        const { friend1_id, friend2_id } = req.body;
        const { account_id } = await prisma.friendList.create({
            data: {
                friend1_id,
                friend2_id
            },
            select: {
                friend_list_id: true
            }
        });
        res.status(201).send({account_id});
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const updateFriendShip = async (req, res) => {
    try {
        const { friend1_id, friend2_id } = req.body;
        await prisma.friendList.update({
            data: {
                friend1_id,
                friend2_id
            },
            where: {
                friend_list_id
            }
        });
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};

export const deleteFriendShip = async (req, res) => {
    try {
        await prisma.friendList.delete({
            where: {
                friend_list_id: parseInt(req.params.id)
            }
        });
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};


