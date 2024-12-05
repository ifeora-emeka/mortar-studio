import { Router } from 'express';
import { Routes } from '../../../types/route.types.js';
import SyncController from './sync.controller.js';
import validationMiddleware from '../../middlewares/request.middleware.js';
import { APISyncDataSchema } from '@repo/common/schema/api'

class SyncRoute implements Routes {
    public path = '/sync';
    public router = Router();
    public syncController = new SyncController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        //@ts-ignore
        this.router.post(`${this.path}`, validationMiddleware(APISyncDataSchema, 'body'), this.syncController.create);
        //@ts-ignore
        this.router.get(`${this.path}`, this.syncController.getAll);
    }
}

export default SyncRoute;