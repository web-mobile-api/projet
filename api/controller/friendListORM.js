import prisma from "../database/databaseORM.js";

export const getFriendList = async (req, res)=> {
    try {
        const id = parseInt(req.params.id);
        const friendList = await prisma.friendList.findMany({
            where: {
                OR: [
                    {
                        friend1_id: id
                    },
                    {
                        friend2_id: id
                    }
                ]
            },
            select: {
                friend_list_id: true,
                friend1_id: true,
                friend2_id: true,
                date: true,
            }
        });
        if(friendList){
            res.send(friendList);
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
        const { friend_list_id } = await prisma.friendList.create({
            data: {
                friend1_id: parseInt(friend1_id),
                friend2_id: parseInt(friend2_id),
                date: new Date(Date.now()).toISOString()
            },
            select: {
                friend_list_id: true
            }
        });
        res.status(201).send({friend_list_id});
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


