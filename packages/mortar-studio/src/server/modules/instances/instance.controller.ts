import path from "path";
import { Request, Response, NextFunction } from 'express';
import fs from "fs";
import { MortarElementInstance } from '@repo/common/schema/instance';
import { generateRandomID } from '@repo/common/utils';

export default class InstanceController {

    public createInstance = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { index, ref, incomingProps, children, parentInstance } = req.body;
            const { page_slug } = req.params;

            const pagesDir = path.join(process.env.MORTAR_ROOT_DIRECTORY as string, 'pages', page_slug as string);
            const pageFilePath = path.join(pagesDir, 'page.json');

            if (!fs.existsSync(pageFilePath)) {
                return res.status(404).json({ message: 'Page not found' });
            }

            const pageContent = fs.readFileSync(pageFilePath, 'utf-8');
            const pageData = JSON.parse(pageContent);
            const pageID = pageData.id;

            const instanceSlug = `${page_slug}-${generateRandomID(12)}`;
            const instanceData: MortarElementInstance = {
                id: instanceSlug,
                index,
                ref,
                incomingProps,
                parentInstance,
                children,
                page_id: pageID
            };

            const instancesFilePath = path.join(pagesDir, 'instances.json');

            let instances: MortarElementInstance[] = [];
            if (fs.existsSync(instancesFilePath)) {
                const fileContent = fs.readFileSync(instancesFilePath, 'utf-8');
                instances = JSON.parse(fileContent);
            }

            instances.push(instanceData);

            fs.writeFileSync(instancesFilePath, JSON.stringify(instances, null, 2));

            res.status(201).json(instanceData);
        } catch (error) {
            next(error);
        }
    }
}