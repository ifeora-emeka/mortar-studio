import { Router } from 'express';
import { Routes } from '../../../types/route.types.js';
import FilesController from "./files.controller.js";
import upload from "./files.middleware.js";

class FileRoute implements Routes {
    public path = '/files';
    public router = Router();
    public filesController = new FilesController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        //@ts-ignore
        this.router.post(`${this.path}`, upload.array('files'), this.filesController.uploadFiles);
        //@ts-ignore
        this.router.delete(`${this.path}/:fileName`, this.filesController.deleteFile);
        //@ts-ignore
        this.router.get(`${this.path}/download/:fileName`, this.filesController.downloadFile);
    }
}

export default FileRoute;