import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { MortarElement, CreateMortarElementSchema } from '@repo/common/schema/element';
import { generateRandomID } from '@repo/common/utils';

export default class ElementsController {
    public createElement = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { component_id } = req.params;
            const { htmlTag, attributes, customProps } = req.body;

            const elementID = `${component_id}-${generateRandomID(12)}`;
            const elementData: MortarElement = {
                id: elementID,
                index: 0,
                htmlTag,
                attributes,
                customProps,
                ...req.body
            };

            CreateMortarElementSchema.parse(elementData);

            const componentsDir = path.join(process.env.MORTAR_ROOT_DIRECTORY as string, 'components');
            const componentFilePath = path.join(componentsDir, `${component_id}.json`);

            if (!fs.existsSync(componentFilePath)) {
                return res.status(404).json({ message: 'Component not found' });
            }

            const componentContent = fs.readFileSync(componentFilePath, 'utf-8');
            const componentData = JSON.parse(componentContent);
            componentData.elements.push(elementData);

            fs.writeFileSync(componentFilePath, JSON.stringify(componentData, null, 2));

            res.status(201).json(elementData);
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}