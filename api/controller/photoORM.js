import prisma from "../database/databaseORM.js";
import multer from "multer";
import fs from "fs";

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

export const addPhoto = async (req, res) => {
    try {
        console.log(req.file)
        const { filename, path: filePath } = req.file;
    
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

export const updatePhoto = async (req, res) => {
    try {
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
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};

export const deletePhoto = async (req, res) => {
    try {
        const photo = await prisma.photo.findUnique({
            where: {
                photo_id: parseInt(req.params.id)
            }
        });
        if (photo) {
            console.log(photo.file_name);
            fs.unlink("./uploads/" + photo.file_name, async (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                await prisma.photo.delete({
                    where: {
                        photo_id: parseInt(req.params.id)
                    }
                });
            })
        }
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};


