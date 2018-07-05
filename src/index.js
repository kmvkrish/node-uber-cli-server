"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
import Routes from './routes/index';

class App {
    constructor() {
        this.app = express();
        this.configure();
        this.addRoutes();
    }
    configure() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(morgan("dev"));
    }
    addRoutes() {
        this.app.get("/", (req, res) => {
            res.status(200).json({
                "message": "Uber-cli Server",
                "status": 200
            });
        });
        this.app.use("/api", new Routes().router);
    }
    getApp() {
        return this.app;
    }
}
const app = new App().getApp();
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
