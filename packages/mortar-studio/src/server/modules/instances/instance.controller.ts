import path from "path";
import { Request, Response, NextFunction } from 'express'
import fs from "fs";
import {createJSONSrcFile} from "../../../utils/files.utils.js";
import { MortarElementInstance } from '@repo/common/schema/instance'
import { generateRandomID } from '@repo/common/utils'

export default class InstanceController {

    public createInstance = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { index, ref, incomingProps, children, parentInstance } = req.body;
            const { page_id } = req.params;
            // todo: create a pages service which gets the page by ID

            const instanceSlug = `${parentInstance}-${generateRandomID(12)}`;
            const instanceData: MortarElementInstance = { id: instanceSlug, index, ref, incomingProps, parentInstance, children, page_id: page_id as string };

            const instancesDir = path.join(process.env.MORTAR_ROOT_DIRECTORY as string, 'instances');
            const filePath = path.join(instancesDir, `${instanceSlug}.json`);

            if (!fs.existsSync(instancesDir)) {
                fs.mkdirSync(instancesDir, { recursive: true });
                console.log(`${instancesDir} directory created`);
            }

            if (fs.existsSync(filePath)) {
                return res.status(409).json({ message: 'Instance already exists' });
            }

            createJSONSrcFile({ fileName: instanceSlug, content: instanceData, dir: `pages/${page_id}/instances` });

            res.status(201).json(instanceData);
        } catch (error) {
            next(error);
        }
    }

}
