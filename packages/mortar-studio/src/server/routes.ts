import IndexRoute from "./modules/index.route.js";
import PagesRoute from "./modules/pages/pages.route.js";
import ComponentsRoute from "./modules/components/components.route.js";
import InstanceRoute from "./modules/instances/instance.route.js";
import ElementsRoute from "./modules/elements/elements.route.js";


export const allRoutes = [
    new IndexRoute(),
    new PagesRoute(),
    new ComponentsRoute(),
    new InstanceRoute(),
    new ElementsRoute()
]
