import {pool} from "../database/database.js";
import * as produitModel from "../model/productDB.js";

export const getProduct = async (req, res)=> {
    try {
        const produit = await produitModel.readProduct(pool, req.params); 
        if (produit) {
            res.json(produit);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        res.sendStatus(500);
    }
};

export const addProduct = async (req, res) => {
    try {
        const id = await produitModel.createProduct(pool, req.body); 
        res.status(201).json({id});
    } catch (err) {
        res.sendStatus(500);
    }
};

export const updateProduct = async (req, res) => {
    try {
        await produitModel.updateProduct(pool, req.body);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await produitModel.deleteProduct(pool, req.params); 
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};