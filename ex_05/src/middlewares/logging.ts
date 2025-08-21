import {Request, Response, NextFunction} from 'express';

export function logging(req:Request, res: Response, next:NextFunction) {
    const method:string = req.method;
    const url:string = req.originalUrl;
    const timeStamp:string = new Date().toLocaleString();

    console.log(`Logs da requisição:{\n  Método: ${method}\n  URL: ${url}\n  Horário: ${timeStamp}\n}`);
    
    return next();
}