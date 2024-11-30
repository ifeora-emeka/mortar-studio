import {Routes} from "../../../types/route.types.js";
import {Router} from "express";
import ComponentsController from "./components.controller.js";
import {CreateComponentSchema} from "@repo/common/schema/component";
import validationMiddleware from "../../middlewares/request.middleware.js";

export default class ComponentsRoute implements Routes {
    public path = '/components';
    public router = Router();
    public componentController = new ComponentsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        //@ts-ignore
        this.router.post(`${this.path}`, validationMiddleware(CreateComponentSchema, 'body'), this.componentController.create);
        //@ts-ignore
        // this.router.get(`${this.path}`, this.componentController.getAllComponents);
    }
}
