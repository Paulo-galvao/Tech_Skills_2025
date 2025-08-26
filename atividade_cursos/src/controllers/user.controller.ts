import express, { Express, NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import User from '../models/User';
import generateToken from '../services/auth';

interface Iuser {
    name: string,
    email: string,
    password: string
}

export async function index(req: Request, res: Response):Promise<Response> {
    try {
        const users = await User.find();
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function register(req: Request, res: Response, next:NextFunction):Promise<Response|void> {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            return next(new AppError("Preencha todos os campos", 400));
        }

        const user = await User.create(req.body);

        // generateToken(user.user_id);
        
        return res.status(201).send({
            message: "Cadastro concluído com sucesso"
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}