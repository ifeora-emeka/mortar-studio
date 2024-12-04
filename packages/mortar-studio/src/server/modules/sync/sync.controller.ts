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

}
