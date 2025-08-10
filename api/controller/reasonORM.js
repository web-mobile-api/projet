import prisma from "../database/databaseORM.js";
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

export const getReports = async (req, res) => {
    try {
        if (req.Permission != Permission.Admin) {
            res.status(403).send("Permission denied");
            return;
        } else {
            const reports = await prisma.report.findMany();
            res.status(200).send(reports);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
        
    }
}

export const getReport = async (req, res) => {
    try {
        const author_id = await prisma.account.findUnique({
            where: {
                email: req.user.email
            },
            select: {
                account_id: true
            }
        });
        const report_id = parseInt(req.params.id);
        const report = await prisma.report.findUnique({
            where: {
                report_id
            }
        });
        if (report && (req.Permission === Permission.Admin || report.account_id === author_id)) {
            res.status(200).send(report);
        } else {
            res.sendStatus(403);
        }            
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const deleteReport = async (req, res) => {
    try {
        const report_id = parseInt(req.params.id);
        const report = await prisma.report.findUnique({
            where: {
                report_id
            }
        });
        if (report && req.Permission === Permission.Admin) {
            await prisma.report.delete({
                where: {
                    report_id
                }
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
