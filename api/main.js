import { internalIpV4Sync } from 'internal-ip';import express from "express";
import * as account from "./account";
import * as comment from "./comment";
import * as event from "./event";
import * as location from "./location";
import * as photo from "./photo";


//Doesn't work at home because of firewall shit ig so it'll be localhost for now
const internalIP = internalIpV4Sync();
export const app = express();
const port = 3001;

app.listen(port, "127.0.0.1", () => {
    console.log(`Server is running on address: https://localhost:${port}`)
})