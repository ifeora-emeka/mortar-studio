import {NextFunction, Request, Response} from "express";
import slugify from "slugify";
import {generateRandomID} from "@repo/common/utils";
import {MortarComponent} from "@repo/common/schema/component";
import {createJSONSrcFile} from "../../../utils/files.utils.js";

export default class ComponentsController {
    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, chakraProps } = req.body;
            // @ts-ignore
            const fileName = slugify(name, { strict: true }) + generateRandomID(5);

            const elementData: MortarComponent = {
                id: fileName,
                name,
                attributes: {},
                elements: []
            };

            createJSONSrcFile({ fileName, content: elementData, dir: 'components' });

            res.status(201).json(elementData);
        } catch (error) {
            next(error);
        }
    }

}