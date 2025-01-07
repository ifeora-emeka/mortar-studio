import fs from 'fs';

export const createPublicFiles = () => {
    const publicDir = process.env.MORTAR_PUBLIC_DIRECTORY as string;

    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }
};