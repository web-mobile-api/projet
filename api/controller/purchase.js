import {createUser} from "../model/client.js";
import {createPurchase} from "../model/purchase.js";
import {pool} from "../database/database.js";

export const postPurchase = async (req, res) => {
    try {
        await createPurchase(pool, req.val, req.body.client);
        res.sendStatus(201);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
 };

export const purchaseWithRegistration = async (req, res) => {
    let SQLClient;
    try {
        SQLClient = await pool.connect();
        await SQLClient.query("BEGIN");
        const {id: clientID} = await createUser(SQLClient, req.body.client);
        const {articleID, quantity} = req.body.purchase;
        await createPurchase(SQLClient, {articleID, quantity}, clientID);
        await SQLClient.query("COMMIT");
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        try {
            //1. vérifier si on a un client SQL. Si oui, il faut effectuer un ROLLBACK
            if(SQLClient){
                await SQLClient.query("ROLLBACK");
            }
        } catch (err) {
            //1.1 Capturer une éventuelle erreur durant le ROLLBACK
            console.error(err);
        } finally {
            //1.2 Dans tous les cas, envoyer une réponse à la requête HTTP
            res.sendStatus(500);
        }
    } finally {
        //2. Dans tous les cas, vérifier si on a bien un client SQL et si c'est le cas, procéder à sa libération
        if(SQLClient){
            SQLClient.release();
        }
    }
};