import { Router } from 'express';
import {Routes} from "../../types/route.types.js";
import IndexController from "./index.controller.js";


class IndexRoute implements Routes {
    public path = '/';
    public router = Router();
    public indexController = new IndexController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.indexController.index);
    }
}

export default IndexRoute;