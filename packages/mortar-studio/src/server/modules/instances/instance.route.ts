import { Router } from 'express';
import { Routes } from '../../../types/route.types.js';
import validationMiddleware from '../../middlewares/request.middleware.js';
import { CreateMortarInstanceSchema } from '@repo/common/schema/instance';
import InstanceController from './instance.controller.js';

class InstanceRoute implements Routes {
    public path = '/instances';
    public router = Router();
    public instanceController = new InstanceController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // @ts-ignore
        this.router.post(`${this.path}/:page_slug`, validationMiddleware(CreateMortarInstanceSchema, 'body'), this.instanceController.createInstance);
    }
}

export default InstanceRoute;