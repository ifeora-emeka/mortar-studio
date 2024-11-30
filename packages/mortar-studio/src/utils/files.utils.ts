import fs from 'fs';
import path from 'path';
import {HttpException} from "../server/exceptions/HttpException.js";

interface CreateJsonFileParams {
    fileName: string;
    content: object;
    dir: string;
}

export const createJSONSrcFile = ({ fileName, content, dir }: CreateJsonFileParams): void => {
        const elementsDir = path.join(process.env.MORTAR_ROOT_DIRECTORY as string, dir);
        const filePath = path.join(elementsDir, `${fileName}.json`);

        if (!fs.existsSync(elementsDir)) {
            fs.mkdirSync(elementsDir, { recursive: true });
            console.log(`${elementsDir} directory created`);
        }

        if (fs.existsSync(filePath)) {
            throw new HttpException(409, `${fileName} already exists`);
        }

        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
};