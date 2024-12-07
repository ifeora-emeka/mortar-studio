import {Request, Response, NextFunction} from 'express'
import { APISyncData } from '@repo/common/schema/api'
import fs from 'fs';
import path from 'path';
import {MortarComponent} from "@repo/common/schema/component";
import {HttpException} from "../../exceptions/HttpException.js";

export default class SyncController {

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { variables, variableSets, pages, components, instances }: APISyncData = req.body;

            components.forEach((component:MortarComponent) => {
                component.elements.forEach(el => {
                    if(el.children.length > 0){
                        throw new HttpException(400, 'Nested elements are not supported');
                    }
                })
            });

            const rootDir = process.env.MORTAR_ROOT_DIRECTORY as string;

            // Delete existing directories
            const directories = ['variables', 'pages', 'components'];
            directories.forEach(dir => {
                const dirPath = path.join(rootDir, dir);
                if (fs.existsSync(dirPath)) {
                    fs.rmSync(dirPath, { recursive: true, force: true });
                }
                fs.mkdirSync(dirPath, { recursive: true });
            });

            // Sync variables and variable sets
            const variablesDir = path.join(rootDir, 'variables');
            const variablesFilePath = path.join(variablesDir, 'variables.json');
            const variableSetsFilePath = path.join(variablesDir, 'sets.json');

            fs.writeFileSync(variablesFilePath, JSON.stringify(variables, null, 2));
            fs.writeFileSync(variableSetsFilePath, JSON.stringify(variableSets, null, 2));

            // Sync pages and instances
            const pagesDir = path.join(rootDir, 'pages');
            pages.forEach(page => {
                const pageDir = path.join(pagesDir, page.id);
                fs.mkdirSync(pageDir, { recursive: true });

                const pageFilePath = path.join(pageDir, 'page.json');
                fs.writeFileSync(pageFilePath, JSON.stringify(page, null, 2));
            });

            instances.forEach(instance => {
                const pageDir = path.join(pagesDir, instance.page_id);
                fs.mkdirSync(pageDir, { recursive: true });

                const instancesFilePath = path.join(pageDir, 'instances.json');
                const existingInstances = fs.existsSync(instancesFilePath)
                    ? JSON.parse(fs.readFileSync(instancesFilePath, 'utf-8'))
                    : [];
                existingInstances.push(instance);
                fs.writeFileSync(instancesFilePath, JSON.stringify(existingInstances, null, 2));
            });

            // Sync components
            const componentsDir = path.join(rootDir, 'components');
            components.forEach(component => {
                const componentFilePath = path.join(componentsDir, `${component.id}.json`);
                fs.writeFileSync(componentFilePath, JSON.stringify(component, null, 2));
            });

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

            // pages and instances
            const pagesDir = path.join(process.env.MORTAR_ROOT_DIRECTORY as string, 'pages');
            const pages = [];
            const instances = [];

            if (fs.existsSync(pagesDir)) {
                const pageDirs = fs.readdirSync(pagesDir);

                for (const pageId of pageDirs) {
                    const pageDir = path.join(pagesDir, pageId);
                    const pageFilePath = path.join(pageDir, 'page.json');
                    const instancesFilePath = path.join(pageDir, 'instances.json');

                    if (fs.existsSync(pageFilePath)) {
                        const page = JSON.parse(fs.readFileSync(pageFilePath, 'utf-8'));
                        pages.push(page);
                    }

                    // console.log('INSTANCE ::', {
                    //     pageId,
                    //     pageDir,
                    //     instancesFilePath,
                    //     exists: fs.existsSync(instancesFilePath)
                    // })

                    if (fs.existsSync(instancesFilePath)) {
                        const pageInstances = JSON.parse(fs.readFileSync(instancesFilePath, 'utf-8'));
                        instances.push(...pageInstances);
                        // console.log('INSTANCE AFTER:::', instances)
                    }
                }
            }

            const componentsDir = path.join(process.env.MORTAR_ROOT_DIRECTORY as string, 'components');
            const components = [];

            if (fs.existsSync(componentsDir)) {
                const componentFiles = fs.readdirSync(componentsDir);

                for (const componentFile of componentFiles) {
                    const componentFilePath = path.join(componentsDir, componentFile);
                    if (fs.existsSync(componentFilePath)) {
                        const component = JSON.parse(fs.readFileSync(componentFilePath, 'utf-8'));
                        components.push(component);
                    }
                }
            }

            const data: APISyncData = {
                variables,
                variableSets,
                components,
                instances,
                styles: [],
                pages
            };

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

}