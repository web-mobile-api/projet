import prisma from "../database/databaseORM.js";

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

export const getEventsFrom = async(req, res) => {
    try {
        const events = await prisma.account.findUnique({
            where: {
                account_id: parseInt(req.params.account_id)
            },
            include: {
                Event: true
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
                Location: true
            },
        });
        if(event){
            //just so it doesn't get confusing cuz we already have event.Location.location_id
            delete event["position_id"]
            res.send(event);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

//This could become a transaction or we just put a default pfp
export const addEvent = async (req, res) => {
    try {
        const { location_id, author_id, name, date, reccurence } = req.body;
        const { event_id } = await prisma.event.create({
            data: {
                location_id: parseInt(location_id),
                author_id: parseInt(author_id),
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

export const updateAccount = async (req, res) => {
    try {
        const { event_id, location_id, author_id, name, date, reccurence } = req.body;
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
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};

//Will be changed for a transaction later
export const deleteAccount = async (req, res) => {
    try {
        await prisma.event.delete({
            where: {
                event_id: parseInt(req.params.id)
            }
        });
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};


