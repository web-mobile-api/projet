import prisma from "../database/databaseORM.js";

/**
 * @swagger
 * /v1/location/id/{id}:
 *   get:
 *     summary: Retrieve a location by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The location ID
 *     responses:
 *       200:
 *         description: A location object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 location_id:
 *                   type: integer
 *                 street:
 *                   type: string
 *                 num:
 *                   type: integer
 *                 city:
 *                   type: string
 *                 code:
 *                   type: integer
 *                 country:
 *                   type: string
 *                 position:
 *                   type: string
 *       404:
 *         description: Location not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /v1/location/position/{position}:
 *   get:
 *     summary: Retrieve a location by position
 *     parameters:
 *       - in: path
 *         name: position
 *         required: true
 *         schema:
 *           type: string
 *         description: The location position
 *     responses:
 *       200:
 *         description: A location object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 location_id:
 *                   type: integer
 *                 street:
 *                   type: string
 *                 num:
 *                   type: integer
 *                 city:
 *                   type: string
 *                 code:
 *                   type: integer
 *                 country:
 *                   type: string
 *                 position:
 *                   type: string
 *       404:
 *         description: Location not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /v1/location:
 *   post:
 *     summary: Add a new location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *               num:
 *                 type: integer
 *               city:
 *                 type: string
 *               code:
 *                 type: integer
 *               country:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       201:
 *         description: Location created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 location_id:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
export const addLocation = async (req, res) => {
    try {
        const { street, num, city, code, country, position } = req.body;
        const { location_id } = await prisma.location.create({
            data: {
                street,
                num: parseInt(num),
                city,
                code: parseInt(code),
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

/**
 * @swagger
 * /v1/location:
 *   put:
 *     summary: Update an existing location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location_id:
 *                 type: integer
 *               street:
 *                 type: string
 *               num:
 *                 type: integer
 *               city:
 *                 type: string
 *               code:
 *                 type: integer
 *               country:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       204:
 *         description: Location updated
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
//todo: Make it so the one who created the event can modify the location (maybe just create a new one?)
export const updateLocation = async (req, res) => {
    try {
        const { location_id, street, num, city, code, country, position } = req.body;

        if (req.perm == Permission.Admin) {
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
 * /v1/location/position/{position}:
 *   delete:
 *     summary: Delete a location by position
 *     parameters:
 *       - in: path
 *         name: position
 *         required: true
 *         schema:
 *           type: string
 *         description: The location position
 *     responses:
 *       204:
 *         description: Location deleted
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
export const deleteLocationByPosition = async (req, res) => {
    try {
        if (req.perm == Permission.Admin) {
            await prisma.location.delete({
                where: {
                    position: req.params.position
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
 * /v1/location/id/{id}:
 *   delete:
 *     summary: Delete a location by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The location ID
 *     responses:
 *       204:
 *         description: Location deleted
 *       500:
 *         description: Internal server error
 */
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


