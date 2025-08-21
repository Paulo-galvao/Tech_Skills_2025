import {Request, Response, NextFunction} from 'express';

export function logging(req:Request, res: Response, next:NextFunction) {
    const method:string = req.method;
    console.log("Método da requisição:", method);
    return next();
}