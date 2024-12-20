import prisma from "../database/databaseORM.js";
import { Permission } from "../middleware/authMiddleware.js";

/**
 * @swagger
 * /v1/events:
 *   get:
 *     summary: Retrieve all upcoming events
 *     responses:
 *       200:
 *         description: A list of upcoming events
 *       404:
 *         description: Events not found
 *       500:
 *         description: Internal server error
 */
export const getAllEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany({
            where: {
                OR: [
                    {
                        date: {
                            gt: new Date(Date.now()).toISOString()
                        }
                    }
                ],
                NOT: [
                    {
                        date: {
                            lt: new Date(Date.now()).toISOString()
                        }
                    }
                ]
            }
        });
        if (events) {
            res.send(events);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

/**
 * @swagger
 * /v1/events/{account_id}:
 *   get:
 *     summary: Retrieve events from a specific author
 *     parameters:
 *       - in: path
 *         name: account_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The author ID
 *     responses:
 *       200:
 *         description: A list of events
 *       404:
 *         description: Events not found
 *       500:
 *         description: Internal server error
 */
export const getEventsFrom = async(req, res) => {
    try {
        const events = await prisma.account.findUnique({
            where: {
                account_id: parseInt(req.params.account_id)
            },
            include: {
                Event: true
            },
            select: {

            }
        })
        if (events) {
            //before sending there should be a cleanup, cuz way too much useless info
            res.send(events);
        } else {
            res.send(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

/**
 * @swagger
 * /v1/event/{id}:
 *   get:
 *     summary: Retrieve a single event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event ID
 *     responses:
 *       200:
 *         description: A single event
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
export const getEvent = async (req, res)=> {
    try {
        const event_id = parseInt(req.params.id);
        const event = await prisma.event.findUnique({
            where: {
                event_id
            },
            include: {
                Comment: true,
                EventPhoto: true,
                Location: true,
                ParticipantList: {
                    select: {
                        account_id: true
                    }
                },
            },
        });
        if(event){
            //just so it doesn't get confusing cuz we already have event.Location.location_id
            delete event["location_id"]
            res.send(event);
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
 * /v1/event:
 *   post:
 *     summary: Create a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location_id:
 *                 type: integer
 *               author_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               reccurence:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created
 *       500:
 *         description: Internal server error
 */
export const addEvent = async (req, res) => {
    try {
        const { location_id, author_id, name, date, reccurence } = req.body;
        const { event_id } = await prisma.event.create({
            data: {
                location_id: location_id,
                author_id: author_id,
                name,
                reccurence,
                created_at: new Date(Date.now()).toISOString(),
                date: (new Date(date)).toISOString(),
            },
            select: {
                event_id: true
            }
        });
        res.status(201).send({event_id});
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * /v1/event:
 *   patch:
 *     summary: Update an existing event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: integer
 *               location_id:
 *                 type: integer
 *               author_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               reccurence:
 *                 type: string
 *     responses:
 *       204:
 *         description: Event updated
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
export const updateEvent = async (req, res) => {
    try {
        const account = await prisma.account.findUnique({
            where: {
                email: req.user.email
            }
        });
        const { event_id, location_id, author_id, name, date, reccurence } = req.body;
        if (account && req.perm === Permission.Admin || account.account_id === author_id) {
            await prisma.event.update({
                data: {
                    location_id,
                    author_id,
                    name,
                    date,
                    reccurence,
                },
                where: {
                    event_id
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
 * /v1/event/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event ID
 *     responses:
 *       204:
 *         description: Event deleted
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
export const deleteEvent = async (req, res) => {
    try {
        const account = await prisma.account.findUnique({
            where: {
                email: req.user.email
            }
        });
        const event_id = parseInt(req.params.id);
        const event = await prisma.event.findUnique({
            where: {
                event_id 
            }
        });
        if ((account && event) && (req.perm === Permission.Admin || account.account_id === event.account_id)) {
            await prisma.event.delete({
                where: {
                    event_id: parseInt(req.params.id)
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


