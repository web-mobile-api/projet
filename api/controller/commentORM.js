import prisma from "../database/databaseORM.js";
import { Permission } from "../scripts/JS/authMiddleware.js";

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

export const addComment = async (req, res) => {
    try {
        const { content, author_id, event_id } = req.body;
        const { comment_id } = await prisma.comment.create({
            data: {
                date: new Date(Date.now()).toISOString(),
                content,
                author_id: parseInt(author_id),
                event_id: parseInt(event_id)
            },
            select: {
                comment_id: true
            }
        });
        res.status(201).send({comment_id});
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const deleteComment = async (req, res) => {
    try {
        const account = await prisma.account.findUnique({
            where: {
                email: req.user.email,
            }
        });
        const comment = await prisma.comment.findUnique({
            where: {
                comment_id: req.params.id
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
