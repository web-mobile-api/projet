import prisma from "../database/databaseORM";
import { Permission } from "../scripts/JS/authMiddleware";

export const addInvitation = async (req, res) => {
    try {
        const { receiver_id } = req.boy;
        const sender_id = await prisma.account.findUnique({
            where: {
                email: req.user.email
            },
            select: {
                account_id: true
            }
        });
        const invitation_id = await prisma.friendInvitation.create({
            data: {
                sender_id,
                receiver_id,
                sent_at: new Date(Date.now()).toISOString(),
            },
            select: {
                invitation_id: true
            }
        });
        res.send({invitation_id});
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const deleteInvitation = async (req, res) => {
    try {
        const invitation_id = req.params.id;
        const invitation = await prisma.friendInvitation.findUnique({
            where: {
                invitation_id
            }
        });
        if (invitation && (req.perm === Permission.Admin || invitation.sender_id === req.user.email)) {
            await prisma.friendInvitation.delete({
                where: {
                    invitation_id
                }
            });
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const updateInvitiation = async (req, res) => {
    try {
        const { invitation_id, status } = req.body;
        if (status === "accepted") {
            const invitation = await prisma.friendInvitation.findUnique({
                where: {
                    invitation_id
                }
            });
            const receiver_id = await prisma.account.findUnique({
                where: {
                    email: req.user.email
                }
            });
            if (invitation && (req.perm === Permission.Admin || invitation.receiver_id === receiver_id)) {
                await prisma.friendList.create({
                    data: {
                        friend1_id: invitation.sender_id,
                        friend2_id: invitation.receiver_id,
                        date: new Date(Date.now()).toISOString()
                    }
                });
                await prisma.friendInvitation.delete({
                    where: {
                        invitation_id
                    }
                });
            } else {
                res.sendStatus(404);
            }
        } else if (status === "declined") {
            await prisma.friendInvitation.delete({
                where: {
                    invitation_id
                }
            });
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const getInvitationsAsReceiver = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const invitations = await prisma.friendInvitation.findMany({
            where: {
                receiver_id: id
            },
            select: {
                invitation_id: true,
                sender_id: true,
                receiver_id: true,
                sent_at: true
            }
        });
        if (invitations) {
            res.send(invitations);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const getInvitationsAsSender = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const invitations = await prisma.friendInvitation.findMany({
            where: {
                sender_id: id
            },
            select: {
                invitation_id: true,
                sender_id: true,
                receiver_id: true,
                sent_at: true
            }
        });
        if (invitations) {
            res.send(invitations);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
