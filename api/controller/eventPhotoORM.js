import prisma from "../database/databaseORM.js";
import fs from "fs";
import { Permission } from "../middleware/authMiddleware.js";
import { uploadDir } from "./photoORM.js";
import { upload } from "./photoORM.js";

/**
 * @swagger
 * /eventPhoto/{id}:
 *   get:
 *     summary: Get a specific event photo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The photo ID
 *     responses:
 *       200:
 *         description: The requested photo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventPhoto'
 *       404:
 *         description: Photo not found
 *       500:
 *         description: Internal server error
 */
export const getEventPhoto = async (req, res)=> {
    try {
        const photo = await prisma.photo.findUnique({
            where: {
                photo_id: parseInt(req.params.id)
            }
        });
        if(photo){
            res.sendFile(photo.file_name, { root: "./uploads"})
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
 * /eventPhoto:
 *   post:
 *     summary: Add a new event photo
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Photo uploaded successfully
 *       500:
 *         description: Failed to upload photo
 */
export const addEventPhoto = async (req, res) => {
    try {
        const event_id = await prisma.event.findUnique({
            where: {
                event_id: parseInt(req.params.event_id)
            },
            select: {
                event_id: true
            }
        });
        const author_id = await prisma.account.findUnique({
            where: {
                event_id
            },
            select: {
                author_id: true
            }
        });
        const account_id = await prisma.account.findUnique({
            where: {
                email: req.user.email
            },
            select: {
                account_id: true
            }
        });
        if (event_id && (req.perm === Permission.Admin || author_id === account_id)){
            const { filename, path: _filePath } = req.file;
        
            const photo = await prisma.photo.create({
                data: {
                    file_name: filename,
                },
            });
        
            res.status(201).json({
                message: 'Photo uploaded successfully',
                photo,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to upload photo' });
    }
};

/**
 * @swagger
 * /eventPhoto/{id}:
 *   delete:
 *     summary: Delete a specific event photo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The photo ID
 *     responses:
 *       204:
 *         description: Photo deleted successfully
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
export const deleteEventPhoto = async (req, res) => {
    try {
        const photo_id = parseInt(req.params.id);
        const event_id = await prisma.eventPhoto.findUnique({
            where: {
                photo_id
            },
            select: {
                event_id: true
            }
        });
        const author_id = await prisma.event.findUnique({
            where: {
                event_id
            },
            select: {
                author_id: true
            }
        });
        const account_id = await prisma.account.findUnique({
            where: {
                email: req.user.email
            },
            select: {
                account_id: true
            }
        });
        const photo = await prisma.photo.findUnique({
            where: {
                photo_id
            }
        });
        if (photo && (req.perm === Permission.Admin || author_id === account_id)){
            fs.unlink("./uploads/" + photo.file_name, async (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                await prisma.photo.delete({
                    where: {
                        photo_id
                    }
                });
                res.sendStatus(204);
            });
        } else {
            res.sendStatus(403);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * /eventPhoto/{id}:
 *   patch:
 *     summary: Update a specific event photo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The photo ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Photo updated successfully
 *       500:
 *         description: Failed to update photo
 */
export const updateEventPhoto = async (req, res) => {
    try {
        const event_id = await prisma.event.findUnique({
            where: {
                event_id: parseInt(req.params.event_id)
            },
            select: {
                event_id: true
            }
        });
        const author_id = await prisma.account.findUnique({
            where: {
                event_id
            },
            select: {
                author_id: true
            }
        });
        const account_id = await prisma.account.findUnique({
            where: {
                email: req.user.email
            },
            select: {
                account_id: true
            }
        });
        if (event_id && (req.perm === Permission.Admin || author_id === account_id)){
            const { filename, path: _filePath } = req.file;
            const photo = await prisma.photo.update({
                where: {
                    photo_id: parseInt(req.params.id)
                },
                data: {
                    file_name: filename
                }
            });
            res.status(201).json({
                message: 'Photo updated successfully',
                photo,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update photo' });
    }
}

