import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { allRoutes } from './routes.js';
import { Routes } from '../types/route.types.js';
import cors from 'cors';


export class MortarStudioServer {
    private app = express();
    public port: number;

    constructor() {
        this.port = 8089;

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const designerPath = path.resolve(__dirname, '../designer');
        this.app.use(express.static(designerPath));

        this.initializeMiddlewares();
        this.initializeRoutes();

        this.app.get('*', (req: Request, res: Response) => {
            res.sendFile(path.join(designerPath, 'index.html'));
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`MortarStudio server is running on http://localhost:${this.port}`);
        });
    }

    private initializeRoutes() {
        allRoutes.forEach((route: Routes) => {
            this.app.use('/api-v1', route.router);
        });
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors())
    }
}

// const server = new MortarStudioServer();
// server.start();
