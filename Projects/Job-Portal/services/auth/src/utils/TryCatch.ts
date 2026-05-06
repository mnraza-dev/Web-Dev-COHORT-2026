import { type Request, type Response, type NextFunction, type RequestHandler } from 'express'
import Errorhandler from './ErrorHandler.js';
export const TryCatch = (controller: (req: Request, res: Response, next: NextFunction) => Promise<void>): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res, next);
        } catch (error: any) {
            if (error instanceof Errorhandler) {
                return res.status(error.httpStatusCode).json(
                    {
                        message: error.message
                    }
                );
            }
            res.status(500).json({ message: error.message });
            next(error);
        }
    }
}