import { Router } from 'express';
import { Routes } from '../../../types/route.types.js';
import validationMiddleware from '../../middlewares/request.middleware.js';
import { CreateMortarElementSchema } from '@repo/common/schema/element';
import ElementsController from './elements.controller.js';

class ElementsRoute implements Routes {
    public path = '/elements';
    public router = Router();
    public elementsController = new ElementsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // @ts-ignore
        this.router.post(`${this.path}/:component_id`, validationMiddleware(CreateMortarElementSchema, 'body'), this.elementsController.createElement);
    }
}

export default ElementsRoute;