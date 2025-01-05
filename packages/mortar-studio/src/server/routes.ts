import IndexRoute from "./modules/index.route.js";
import SyncRoute from "./modules/sync/sync.route.js";


export const allRoutes = [
    new IndexRoute(),
    new SyncRoute()
]
