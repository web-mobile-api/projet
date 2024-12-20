import express from "express";
import {statusCleanUp} from "./scripts/JS/statusCleanUp.js";
import {default as Router} from "./routes/index.js";
import internalIp from 'internal-ip';

const internalIP = internalIp.v4.sync();

const app = express();
const port = 3001;

app.use(express.json());
app.use(Router);

app.listen(port, internalIP, () => {
    console.log(`Example app listening at adress: http://${internalIP}:${port}`);
});

statusCleanUp();