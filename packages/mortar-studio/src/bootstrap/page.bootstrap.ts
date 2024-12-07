import fs from 'fs';
import path from 'path';
import { MortarPage } from '@repo/common/schema/page';

export const createDefaultPages = () => {
    const pages: MortarPage[] = [
        {
            id: 'home-page',
            title: 'Home',
            slug: 'home',
            description: 'Default Home Page',
            route: '/',
            isStatic: true
        },
        {
            id: 'page-not-found',
            title: 'Page Not Found',
            slug: '404',
            description: 'Page Not Found',
            route: '*',
            isStatic: true
        },
        {
            id: 'server-error',
            title: 'Server Error',
            slug: '500',
            description: 'Server Error',
            route: '*',
            isStatic: true
        }
    ];

    const pagesDir = path.join(process.env.MORTAR_ROOT_DIRECTORY as string, 'pages');

    if (!fs.existsSync(pagesDir)) {
        fs.mkdirSync(pagesDir, { recursive: true });
    }

    pages.forEach(page => {
        const pageDir = path.join(pagesDir, page.id);
        if (!fs.existsSync(pageDir)) {
            fs.mkdirSync(pageDir, { recursive: true });
        }

        const pageFilePath = path.join(pageDir, 'page.json');
        if (!fs.existsSync(pageFilePath)) {
            fs.writeFileSync(pageFilePath, JSON.stringify(page, null, 2));
        }
    });
};