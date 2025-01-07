import {createStaticVariables} from "./variables.boostrap.js";
import {createDefaultPages} from "./page.bootstrap.js";
import {createDesignerConfig} from "./config.bootstrap.js";
import {createPublicFiles} from "./public.bootstrap.js";


const createStaticFiles = () => {
    createPublicFiles();
    createDesignerConfig();
    createStaticVariables()
    createDefaultPages();
};

export default createStaticFiles;