import fs from 'fs';
import path from 'path';
import axios from 'axios';

const GOOGLE_FONTS_API_URL = 'https://www.googleapis.com/webfonts/v1/webfonts';
const API_KEY = '';

export const fetchGoogleFonts = async () => {
    try {
        const response = await axios.get(GOOGLE_FONTS_API_URL, {
            params: {
                key: API_KEY
            }
        });

        const fonts = response.data.items;

        const rootDir = process.env.MORTAR_ROOT_DIRECTORY as string;
        const fontsFilePath = path.join(rootDir, 'fonts.json');

        if (!fs.existsSync(fontsFilePath)) {
            fs.writeFileSync(fontsFilePath, JSON.stringify(fonts, null, 2));
            console.log('Fonts data has been saved to fonts.json');
        } else {
            console.log('Fonts data already exists in fonts.json');
        }
    } catch (error) {
        console.error('Error fetching Google Fonts:', error);
    }
};