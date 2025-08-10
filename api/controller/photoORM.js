import prisma from "../database/databaseORM.js";
import multer from "multer";
import fs from "fs";
import { Permission } from "../middleware/authMiddleware.js";

const uploadDir = "./uploads";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
});

export const upload = multer({ storage });

/**
 * @swagger
 * /v1/photo/id/{id}:
 *   get:
 *     summary: Retrieve a photo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The photo ID
 *     responses:
 *       200:
 *         description: A single photo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Photo'
 *       404:
 *         description: Photo not found
 *       500:
 *         description: Internal server error
 */
export const getPhotoById = async (req, res)=> {
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
 * /v1/photo/uploads/{filename}:
 *   get:
 *     summary: Retrieve a photo by filename
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: The photo filename
 *     responses:
 *       200:
 *         description: A single photo
*         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Photo'
 *       404:
 *         description: Photo not found
 *       500:
 *         description: Internal server error
 */
export const getPhotoByPath = async (req, res)=> {
    try {
        const photo = await prisma.photo.findUnique({
            where: {
                file_name: req.params.filename
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
 * /v1/photo:
 *   post:
 *     summary: Add a new photo
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Photo uploaded successfully
 *       500:
 *         description: Failed to upload photo
 */
export const addPhoto = async (req, res) => {
    try {
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
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to upload photo' });
    }
};

/**
 * @swagger
 * /v1/photo:
 *   patch:
 *     summary: Update an existing photo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *     responses:
 *       204:
 *         description: Photo updated
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
export const updatePhoto = async (req, res) => {
    try {
        if (req.perm === Permission.Admin){
            const { first_name, last_name, password, email, phone_number, birthdate } = req.body;
            await prisma.account.update({
                data: {
                    first_name,
                    last_name,
                    password,
                    email,
                    phone_number,
                    birthdate: (new Date(birthdate)).toISOString()
                },
                where: {
                    id
                }
            });
            res.sendStatus(204);
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
 * /v1/photo/{id}:
 *   delete:
 *     summary: Delete a photo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The photo ID
 *     responses:
 *       204:
 *         description: Photo deleted
 *       500:
 *         description: Internal server error
 */
export const deletePhoto = async (req, res) => {
    try {
        const photo_id = parseInt(req.params.id);
        if (photo_id === 1) 
            return res.sendStatus(403);
        const photo = await prisma.photo.findUnique({
            where: {
                photo_id
            }
        });
        if (photo && req.perm === Permission.Admin) {
            fs.unlink("./uploads/" + photo.file_name, async (err) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
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


