import fs from 'fs';
import path from 'path';



type DesignerConfig = {
    title: string;
    description: string;
    fonts: any[];
};

export const createDesignerConfig = () => {
    const rootDir = process.env.MORTAR_ROOT_DIRECTORY as string;
    const configFilePath = path.join(rootDir, 'config.json');

    if (!fs.existsSync(configFilePath)) {
        const config: DesignerConfig = {
            title: 'Mortar studio app',
            description: 'This app was created using Mortar studio',
            fonts: []
        };

        const configJson = JSON.stringify(config, null, 2);
        fs.writeFileSync(configFilePath, configJson);
    }
};