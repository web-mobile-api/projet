import 'dotenv/config';
import pg from 'pg';

export const pgPool = new pg.Pool({
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.DBNAME
});

export const pool = {
    connect: async () => {
        try {
            const client = await pgPool.connect();
            return {
                query : async (query, params) => {
                    try {
                        return await client.query(query, params);
                    } catch (e) {
                        console.error(e);
                        throw e;
                    }
                },
                release : () => {
                    return client.release();
                }
            };
        } catch (e){
            console.error(e);
            throw e;
        }
    },
    query: async (query, params) => {
        try {
            return await pgPool.query(query, params);
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    end : () => {
        return pgPool.end();
    }
};

process.on('exit', () => {
    pgPool.end().then(() => console.log('pool closed'));
});