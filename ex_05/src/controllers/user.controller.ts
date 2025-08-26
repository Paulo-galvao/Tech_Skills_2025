import express, { Express, NextFunction, Request, Response } from 'express';
// import { errorHandler } from './middlewares/errorHandler';
import { AppError } from '../errors/AppError';
import User from '../models/User';

interface Iuser {
    name: string,
    email: string,
    isActive: boolean
}




export async function index(req: Request, res: Response):Promise<Response> {
    try {
            const users = await User.find();
            return res.status(200).send(users);
        } catch (error) {
            return res.status(500).send(error);
        }
}

export async function show(req: Request<{id:number}>, res: Response, next:NextFunction):Promise<Response|void> {
    try {
            const {id} = req.params;
            let user =  await User.findById(id);
    
            if(!user) {
                return next(new AppError("Nenhum resultado encontrado", 404));
            }
            
            return res.status(200).send(user);
        } catch (error) {
            return res.status(500).send(error);
        }
}

export async function create(req: Request, res: Response, next:NextFunction):Promise<Response | void> {
    try {
        
        let {name, email, isActive} = req.body;

        if(!name || !email || !isActive) {
            return next(new AppError("Algum campo não foi preenchido", 400));
        }

        if(
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof isActive !== "boolean" 
        ) {
            return next(new AppError("Tipos incorretos", 400));
                 
            }
        

        const user = await User.create(req.body);

        return res.status(201).send({
            message: 'Usuário cadastrado',
            user
        });
    } catch (error) {
        console.log("error: ", error); 
        return res.status(500).send(error);

    }
}

export function update(req: Request<{id:number}>, res: Response, next:NextFunction):Response | void {
    try {
        let {id} = req.params;
        let {userId, name, email, isActive} = req.body;

        

        if(!userId || !name || !email || !isActive) {
            return next(new AppError("Algum campo não foi preenchido", 400));
        }

        if(
            typeof userId !== "number" ||
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof isActive !== "boolean" 
        ) {
            return next(new AppError("Tipos incorretos", 400));

        }

        // const indexUser: number = users.findIndex(user => user.id === Number(id));

        // if(indexUser === -1) {
        //     return next(new AppError('Usuário não encontrado', 404));
        // }

        

        let user:Iuser = {
            name,
            email,
            isActive,
        }

        if(!user) {
            return next(new AppError('Usuário não encontrado', 404));

        }

        // users[indexUser] = user;

        return res.status(200).send({
            message: "Usuário atualizado",
            user
        });

    } catch (error) {
        return res.status(500).send(error);
        
    }
}
export function destroy(req: Request<{id:number}>, res: Response, next:NextFunction):Response | void {
    try {
        let {id} = req.params;
        // const indexUser: number = users.findIndex(user => user.id === Number(id));

        // if(indexUser === -1) {
        //     return next(new AppError('Usuário não encontrado', 404));
        // }

        // users.splice(indexUser, 1);

        return res.status(200).send({
            message: "Usuário excluído com sucesso"
        });
        
    } catch (error) {
        return res.status(500).send(error);
        
    }
}
