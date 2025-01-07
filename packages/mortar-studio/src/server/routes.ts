import IndexRoute from "./modules/index.route.js";
import SyncRoute from "./modules/sync/sync.route.js";
import FileRoute from "./modules/files/files.routes.js";


export const allRoutes = [
    new IndexRoute(),
    new SyncRoute(),
    new FileRoute()
]
