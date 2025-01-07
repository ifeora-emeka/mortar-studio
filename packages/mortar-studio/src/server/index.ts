import express, {Request, Response} from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import {allRoutes} from './routes.js';
import {Routes} from '../types/route.types.js';
import cors from 'cors';
import fs from 'fs';
import {LOCAL_DEV} from "../config/app.config.js";
import createStaticFiles from "../bootstrap/index.bootstrap.js";

type MortarStudioServerConfig = {
    rootDir?: string;
}

export class MortarStudioServer {
    private app = express();
    public port: number;

    constructor(config: MortarStudioServerConfig = {}) {
        this.port = 8089;

        if (config?.rootDir) {
            process.env.MORTAR_ROOT_DIRECTORY = config.rootDir;
            process.env.MORTAR_PUBLIC_DIRECTORY = path.resolve(config.rootDir, '../public');
        } else {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            process.env.MORTAR_ROOT_DIRECTORY = path.resolve(__dirname, '../src');
            process.env.MORTAR_PUBLIC_DIRECTORY = path.resolve(__dirname, '../public');
        }

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const designerPath = path.resolve(__dirname, '../designer');
        this.app.use(express.static(designerPath));

        const srcDir = process.env.MORTAR_ROOT_DIRECTORY;
        if (!fs.existsSync(srcDir)) {
            fs.mkdirSync(srcDir, {recursive: true});
            console.log('src directory created');
        }

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
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cors());
    }
}

if (LOCAL_DEV) {
    const server = new MortarStudioServer({
        rootDir: './temp/src'
    });
    createStaticFiles();
    server.start();
}