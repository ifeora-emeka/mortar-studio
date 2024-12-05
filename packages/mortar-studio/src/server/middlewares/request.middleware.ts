import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema, ZodError } from 'zod';


const validationMiddleware = (
    schema: ZodSchema,
    value: 'body' | 'query' | 'params' = 'body'
): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req[value]);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    path: issue.path.join('.'),
                    message: issue.message,
                    expected: issue.expected,
                    received: issue.received
                }));
                res.status(400).json({ error: 'Invalid data', details: errorMessages });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    };
};

export default validationMiddleware;