import prisma from "../database/databaseORM.js";
import { Permission } from "../middleware/authMiddleware.js";

/**
 * @swagger
 * /v1/friendList/{id}:
 *   get:
 *     summary: Retrieve the friend list of a specific account
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The account ID
 *     responses:
 *       200:
 *         description: A list of friends
 *       404:
 *         description: Friend list not found
 *       500:
 *         description: Internal server error
 */
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
        if(friendList) {
            res.send(friendList);
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
 * /v1/friendList:
 *   post:
 *     summary: Add a new friendship
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               friend1_id:
 *                 type: integer
 *               friend2_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Friendship created
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /v1/friendList:
 *   patch:
 *     summary: Update an existing friendship
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               friend1_id:
 *                 type: integer
 *               friend2_id:
 *                 type: integer
 *     responses:
 *       204:
 *         description: Friendship updated
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
export const updateFriendShip = async (req, res) => {
    try {
        const account = await prisma.account.findUnique({
            where: {
                email: req.user.email
            }
        });
        const { friend1_id, friend2_id } = req.body;
        if (account && (req.perm === Permission.Admin || (account.account_id === friend1_id || account.account_id === friend2_id))) {
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
        } else {
            res.sendStatus(403)
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * /v1/friendList/{id}:
 *   delete:
 *     summary: Delete a friendship by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The friendship ID
 *     responses:
 *       204:
 *         description: Friendship deleted
 *       500:
 *         description: Internal server error
 */
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


