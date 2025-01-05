import {createStaticVariables} from "./variables.boostrap.js";
import {createDefaultPages} from "./page.bootstrap.js";
import {createDesignerConfig} from "./config.bootstrap.js";


const createStaticFiles = () => {
    createDesignerConfig();
    createStaticVariables()
    createDefaultPages();
};

export default createStaticFiles;