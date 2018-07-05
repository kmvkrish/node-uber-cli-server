"use strict";

import express from "express";
import UberService from '../services/UberService';

class Routes {
    constructor() {
        this.uberService = new UberService();
        this.router = express.Router();
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.get("/estimates/price", async (req, res) => {
            try {
                const results = await this.uberService.getPriceEstimates(req.query.pickup, req.query.drop);
                res.json(results.data);
            } catch(err) {
                console.log(err);
                res.json(err).status(500);
            }
        });
        this.router.get("/estimates/time", async (req, res) => {
            try {
                const results = await this.uberService.getTimeEstimates(req.query.address);
                res.json(results.data);
            } catch(err) {
                res.json(err).status(500);
            }
        });
    }
}
export default Routes;
