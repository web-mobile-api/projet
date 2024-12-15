import prisma from "../database/databaseORM.js";

export const getProduct = async (req, res)=> {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        if(product){
            res.send(product);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const addProduct = async (req, res) => {
    try {
        const {name, price} = req.body;
        const {id} = await prisma.product.create({
            data: {
                name,
                price
            },
            select: {
                id: true
            }
        });
        res.status(201).send({id});
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const updateProduct = async (req, res) => {
    try {
        const {name , price, id} = req.body;
        await prisma.product.update({
            data: {
                name,
                price
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

export const deleteProduct = async (req, res) => {
    try {
        await prisma.product.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};


