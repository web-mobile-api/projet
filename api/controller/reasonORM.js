import prisma from "../database/databaseORM.js";
import bcryptjs from "bcryptjs";
import { Permission } from "../middleware/authMiddleware.js";

export const addReport = async (req, res) => {
    try {
        const { reason, description, event_id } = req.body;
        const { report_id } = await prisma.report.create({
            data: {
                reason,
                description,
                event_id
            },
            select: {
                report_id
            }
        });
        res.status(201).send({ report_id });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}