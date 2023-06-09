import express from "express";
import cookieParser from "cookie-parser";
import { config as envVariablesConfig} from "dotenv";

envVariablesConfig();

const app = express();
const PORT = 8081;
const HOST = '127.0.0.1';


app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json({limit: '50mb'}));


function startServer() {
    app.listen(PORT, HOST, () => console.log(`API is running on port ${PORT}`));
}

export {app, PORT, startServer};