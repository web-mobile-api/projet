import prisma from "../database/databaseORM.js";

export const getLocationById = async (req, res)=> {
    try {
        const location = await prisma.location.findUnique({
            where: {
                location_id: parseInt(req.params.id)
            }
        });
        if(location){
            res.send(location);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const getLocationByPosition = async (req, res)=> {
    try {
        const location = await prisma.location.findUnique({
            where: {
                position: req.params.position
            }
        });
        if(location){
            res.send(location);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const addLocation = async (req, res) => {
    try {
        const {street, num, city, code, country, position} = req.body;
        const {location_id} = await prisma.location.create({
            data: {
                street,
                num,
                city,
                code,
                country,
                position
            },
            select: {
                location_id: true
            }
        });
        res.status(201).send({location_id});
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const updateLocation = async (req, res) => {
    try {
        const {location_id, street, num, city, code, country, position} = req.body;
        await prisma.location.update({
            data: {
                street,
                num,
                city,
                code,
                country,
                position
            },
            where: {
                location_id
            }
        });
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};

export const deleteLocationByPosition = async (req, res) => {
    try {
        await prisma.location.delete({
            where: {
                position: req.params.position
            }
        });
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};

export const deleteLocationById = async (req, res) => {
    try {
        await prisma.location.delete({
            where: {
                location_id: ParseInt(req.params.id)
            }
        });
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};


