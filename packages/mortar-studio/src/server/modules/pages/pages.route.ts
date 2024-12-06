import { Router } from 'express';
import {Routes} from "../../../types/route.types.js";
import PagesController from "./pages.controller.js";

class PageRoute implements Routes {
    public path = '/pages';
    public router = Router();
    public pageController = new PagesController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        //@ts-ignore
        this.router.get(`${this.path}`, this.pageController.getAllPages);
    }
}

export default PageRoute;