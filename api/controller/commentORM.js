import prisma from "../database/databaseORM.js";
import { Permission } from "../middleware/authMiddleware.js";

/**
 * @swagger
 * /v1/comment/{id}:
 *   get:
 *     summary: Retrieve a single comment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: A single comment
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
export const getComment = async (req, res)=> {
    try {
        const comment = await prisma.comment.findUnique({
            where: {
                comment_id: parseInt(req.params.id)
            }
        });
        if(comment){
            res.send(comment);
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
 * /v1/comments:
 *   get:
 *     summary: Retrieve comments from a specific author and event
 *     parameters:
 *       - in: query
 *         name: author_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The author ID
 *       - in: query
 *         name: event_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event ID
 *     responses:
 *       200:
 *         description: A list of comments
 *       404:
 *         description: Comments not found
 *       500:
 *         description: Internal server error
 */
export const getCommentsFrom = async (req, res)=> {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                author_id: parseInt(req.params.account_id),
                event_id: parseInt(req.params.event_id)
            }
        });
        if(comments){
            res.send(comments);
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
 * /v1/comment:
 *   post:
 *     summary: Add a new comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               author_id:
 *                 type: integer
 *               event_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comment created
 *       500:
 *         description: Internal server error
 */
export const addComment = async (req, res) => {
    try {
        const { content, author_id, event_id } = req.body;
        const account = await prisma.account.findUnique({
            where: {
                email: req.user.email,
            }
        });

        if (account && (req.perm === Permission.Admin || account.account_id === author_id)) {
            const { comment_id } = await prisma.comment.create({
                data: {
                    date: new Date(Date.now()).toISOString(),
                    content,
                    author_id: author_id,
                    event_id: event_id
                },
                select: {
                    comment_id: true
                }
            });
            res.status(201).send({comment_id});
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * /v1/comment/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The comment ID
 *     responses:
 *       204:
 *         description: Comment deleted
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
export const deleteComment = async (req, res) => {
    try {
        const account = await prisma.account.findUnique({
            where: {
                email: req.user.email,
            }
        });
        const comment = await prisma.comment.findUnique({
            where: {
                comment_id: parseInt(req.params.id)
            }
        });
        if ((account && comment) && (req.perm === Permission.Admin || account.account_id === comment.author_id)) {
            await prisma.comment.delete({
                where: {
                    comment_id: parseInt(req.params.id)
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
