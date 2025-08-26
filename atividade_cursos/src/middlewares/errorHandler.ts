import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../errors/AppError";

export const errorHandler:ErrorRequestHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
    console.log("Erro encontrado", err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
          error: err.message
        });
      }

    res.status(500).json({
        Erro: err.message
    });
    // next(err);
}