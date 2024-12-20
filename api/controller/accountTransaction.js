import prisma from "../database/databaseORM.js";
import bcryptjs from "bcryptjs";
import { Permission } from "../scripts/JS/authMiddleware.js";
const salt = bcryptjs.genSaltSync();

export const addAccountWithpfp = async (req, res) => {
    try {
        const { first_name, last_name, password, email, phone_number, birthdate } = req.body;
        console.log(`èmail: "${email}"`);

        const newAccount = await prisma.$transaction(async (prisma) => {
            const { filename, path: _filePath } = req.file;
    
            const photo = await prisma.photo.create({
                data: {
                    file_name: filename,
                },
            });

            const user = await prisma.account.create({
                data: {
                    first_name,
                    last_name,
                    password: bcryptjs.hashSync(password, salt),
                    email: email.toLowerCase(),
                    phone_number,
                    birthdate: (new Date(birthdate)).toISOString(),
                    profile_picture: photo.photo_id,
                    online: false,
                    last_online: undefined
                }
            });

            return user;
        })

        res.status(201).send({"account_id": newAccount.account_id});
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const deleteAccount = async (req, res) => {
    try {
        const account_id = req.params.id;
        const account = await prisma.account.findUnique({
            where: {
                account_id
            }
        });

        if (account && (req.perm === Permission.Admin || account.email === req.user.email)) {
            await prisma.$transaction(async (prisma) => {
                await prisma.comment.deleteMany({
                    where: {
                        author_id: account_id
                    }
                });
                await prisma.participantList.deleteMany({
                    where: {
                        account_id
                    }
                });
                //this should also remove it form the filesystem
                await prisma.photo.deleteMany({
                    where: {
                        photo_id: account.profile_picture
                    }
                });
                await prisma.friendList.deleteMany({
                    where: {
                        OR: [
                            { friend1_id: account_id },
                            { friend2_id: account_id },
                        ]
                    }
                });
                const events = await prisma.event.findMany({
                    where: {
                        author_id: account_id
                    }
                });
                for (const event of events) {
                    await prisma.comment.deleteMany({
                        where: {
                            event_id: event.event_id
                        }
                    });
                    await prisma.participantList.deleteMany({
                        where: {
                            event_id: event.event_id
                        }
                    });
                    await prisma.eventPhoto.deleteMany({
                        where: {
                            event_id: event.event_id
                        }
                    });
                }
                //this should also remove all the related event stuff (participant_list, comments, photo, ...)
                await prisma.event.deleteMany({
                    where: {
                        author_id: account_id
                    },
                })
                await prisma.account.delete({
                    where: {
                        account_id
                    }
                });
            });
            res.sendStatus(204);
        } else {
            res.sendStatus(403);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

