import prisma from "../database/databaseORM.js";
import bcryptjs from "bcryptjs";
import { Permission } from "../middleware/authMiddleware.js";
const salt = bcryptjs.genSaltSync();

export const getAdmin = async(req, res) => {
    try {
        if (req.Permission != Permission.Admin) {
            return res.sendStatus(403);
        } else {
            const admin = await prisma.admin.findUnique({
                where: {
                    admin_id: parseInt(req.params.id)
                }
            });
            res.status(200).json(admin);
        }
    } catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const getAdmins = async (req, res) => {
    try {
        if (req.Permission != Permission.Admin) {
            return res.sendStatus(403);
        } else {
            const admins = await prisma.admin.findMany();
            res.status(200).json(admins);
        }
    } catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const addAdmin = async(req, res) => {
    try {
        if (req.Permission != Permission.Admin) {
            const { name, email, password } = req.body;
            const { admin_id } = await prisma.admin.create({
                data: {
                    name,
                    email,
                    password: bcryptjs.hashSync(password, salt)
                },
                select: {
                    admin_id
                }
            });
            res.status(201).send({ admin_id })
        } else {
            res.sendStatus(403)
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const updateAdmin = async(req, res) => {
    try {
        if (req.Permission != Permission.Admin) {
            const { admin_id, name, email, password } = req.body;
            await prisma.admin.update({
                where: {
                    admin_id: admin_id
                },
                data: {
                    name,
                    email,
                    password: bcryptjs.hashSync(password, salt)
                }
            });
            res.sendStatus(204);
        } else {
            res.sendStatus(403);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const deleteAdmin = async(req, res) => {
    try {
        if (req.Permission != Permission.Admin) {
            const { admin_id } = req.body;
            await prisma.admin.delete({
                where: {
                    admin_id: admin_id
                }
            });
            res.sendStatus(204);
        } else {
            res.sendStatus(403);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}