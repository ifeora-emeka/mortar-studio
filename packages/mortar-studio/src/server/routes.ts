import IndexRoute from "./modules/index.route.js";
import PagesRoute from "./modules/pages/pages.route.js";
import ComponentsRoute from "./modules/components/components.route.js";


export const allRoutes = [
    new IndexRoute(),
    new PagesRoute(),
    new ComponentsRoute()
]
