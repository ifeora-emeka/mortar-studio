import {Request, Response, NextFunction} from 'express'
import { APISyncData } from '@repo/common/schema/api'
import fs from 'fs';
import path from 'path';

export default class SyncController {

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { variables, variableSets,  }: APISyncData = req.body;

            const variablesDir = path.join(process.env.MORTAR_ROOT_DIRECTORY as string, 'variables');
            const variablesFilePath = path.join(variablesDir, 'variables.json');
            const variableSetsFilePath = path.join(variablesDir, 'sets.json');

            if (!fs.existsSync(variablesDir)) {
                fs.mkdirSync(variablesDir, { recursive: true });
            }

            fs.writeFileSync(variablesFilePath, JSON.stringify(variables, null, 2));
            fs.writeFileSync(variableSetsFilePath, JSON.stringify(variableSets, null, 2));

            res.status(201).json({ message: 'Sync data stored successfully' });
        } catch (error) {
            next(error);
        }
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const variablesDir = path.join(process.env.MORTAR_ROOT_DIRECTORY as string, 'variables');
            const variablesFilePath = path.join(variablesDir, 'variables.json');
            const variableSetsFilePath = path.join(variablesDir, 'sets.json');

            if (!fs.existsSync(variablesFilePath) || !fs.existsSync(variableSetsFilePath)) {
                return res.status(404).json({ message: 'Variables or Variable Sets not found' });
            }

            const variables = JSON.parse(fs.readFileSync(variablesFilePath, 'utf-8'));
            const variableSets = JSON.parse(fs.readFileSync(variableSetsFilePath, 'utf-8'));

            const data: APISyncData = {
                variables,
                variableSets,
                components: [],
                instances: [],
                styles: [],
                pages: []
            };

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

}
