import {NextFunction, Request, Response} from "express";
import slugify from "slugify";
import path from "path";
import {MortarPage} from "@repo/common/schema/page";
import fs from "fs";
import {createJSONSrcFile} from "../../../utils/files.utils.js";
import {generateRandomID} from '@repo/common/utils'

export default class PagesController {
    public createPage = (req: Request, res: Response, next: NextFunction) => {
        try {
            const {title, description, route} = req.body;
            // @ts-ignore
            const pageSlug = slugify(title, {
                lower: true,
                strict: true
            });
            const pageID = `${pageSlug}-${generateRandomID(12)}`;
            const pagesDir = path.join(process.env.MORTAR_ROOT_DIRECTORY as string, `pages/${pageSlug}`);
            const pageData: MortarPage = {title, description, route, id: pageID};

            if (!fs.existsSync(pagesDir)) {
                fs.mkdirSync(pagesDir, {recursive: true});
                console.log(`${pagesDir} directory created`);
            }

            const files = fs.readdirSync(pagesDir);
            for (const file of files) {
                const fileContent = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
                const existingPage: MortarPage = JSON.parse(fileContent);
                if (existingPage.route === route) {
                    return res.status(409).json({message: 'Page with the same route already exists'});
                }
            }

            createJSONSrcFile({
                fileName: 'page',
                content: pageData,
                dir: `pages/${pageSlug}`
            });

            res.status(201).json(pageData);
        } catch (error) {
            next(error);
        }
    };

    // Other methods...
}