import { Request, Response, NextFunction } from 'express';

export default class ComponentsController {

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (error) {
            console.log(error)
            next(error);
        }
    }

}
