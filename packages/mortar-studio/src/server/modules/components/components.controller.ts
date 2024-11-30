import {NextFunction, Request, Response} from "express";
import slugify from "slugify";
import {generateRandomID} from "@repo/common/utils";
import path from "path";
import {MortarComponent} from "@repo/common/schema/component";
import {createJSONSrcFile} from "../../../utils/files.utils.js";

export default class ComponentsController {
    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { htmlTag, chakraProps } = req.body;
            // @ts-ignore
            const fileName = slugify(htmlTag, { strict: true }) + generateRandomID(12);

            const elementData: MortarComponent = {
                id: fileName,
                name: htmlTag,
                chakraProps,
                attributes: {},
                htmlTag,
                elements: []
            };

            createJSONSrcFile({ fileName, content: elementData, dir: 'components' });

            res.status(201).json(elementData);
        } catch (error) {
            next(error);
        }
    }

    // Other methods...
}