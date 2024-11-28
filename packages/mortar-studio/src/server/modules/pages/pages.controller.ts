import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import slugify from 'slugify';
import {MortarPage} from "@repo/common/schema/page";

class PagesController {
    public createPage = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title, description, route } = req.body;
            // @ts-ignore
            const pageSlug = slugify(title, { lower: true, strict: true });
            const pagesDir = path.join(process.cwd(), 'src/pages');
            const filePath = path.join(pagesDir, `${pageSlug}.json`);
            const pageData: MortarPage = { title, description, route, id: pageSlug };

            if (!fs.existsSync(pagesDir)) {
                fs.mkdirSync(pagesDir, { recursive: true });
            }

            const files = fs.readdirSync(pagesDir);
            for (const file of files) {
                const fileContent = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
                const existingPage: MortarPage = JSON.parse(fileContent);
                if (existingPage.route === route) {
                    return res.status(409).json({ error: 'Page with the same route already exists' });
                }
            }

            if (fs.existsSync(filePath)) {
                return res.status(409).json({ error: 'Page already exists' });
            }

            fs.writeFileSync(filePath, JSON.stringify(pageData, null, 2));

            res.status(201).json(pageData);
        } catch (error) {
            next(error);
        }
    };

    public getAllPages = (req: Request, res: Response, next: NextFunction) => {
        try {
            const pagesDir = path.join(process.cwd(), 'src/pages');
            if (!fs.existsSync(pagesDir)) {
                return res.status(404).json({ error: 'Pages directory not found' });
            }

            const files = fs.readdirSync(pagesDir);
            const pages = files.map(file => {
                const filePath = path.join(pagesDir, file);
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                return JSON.parse(fileContent);
            });

            res.status(200).json(pages);
        } catch (error) {
            next(error);
        }
    };
}

export default PagesController;