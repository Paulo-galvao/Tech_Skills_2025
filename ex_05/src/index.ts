import express, { Express, NextFunction, Request, Response } from 'express';
import { logging } from './middlewares/logging';
import { errorHandler } from './middlewares/errorHandler';
import { AppError } from './errors/AppError';

const app: Express = express();
const port: number = 3000;
app.use(express.json());
app.use(logging);

interface Iuser {
    id: number,
    name: string,
    email: string,
    isActive: boolean
}

let users: Iuser[] = [];

app.get('/', (req: Request, res: Response) => {
    res.send({"ok": true});
});

app.get('/users', (req: Request, res: Response):Response => {

    try {
        
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send(error);
    }
});

app.get('/users/:id', (req: Request<{id:number}>, res: Response):Response => {
    try {
        const {id} = req.params;
        let user: Iuser | undefined = users.find(item=>item.id===Number(id));
        
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
});

app.post('/users', (req: Request, res: Response, next:NextFunction)  => {
    
    try {
        
        let {id, name, email, isActive} = req.body;

        if(!id || !name || !email || !isActive) {
            return next(new AppError("Algum campo não foi preenchido", 400));
        }

        if(
            typeof id !== "number" ||
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof isActive !== "boolean" 
        ) {
            return next(new AppError("Tipos incorretos", 400));
                 
            }
        

        let user:Iuser = {
            id,
            name,
            email,
            isActive,
        }

        users.push(user);

        return res.status(201).send({
            message: 'Usuário cadastrado',
            user
        });
    } catch (error) {
        console.log("error: ", error); 
        return res.status(500).send(error);

    }
});

app.put('/users/:id', (req: Request<{id:number}>, res: Response, next:NextFunction):Response | void => {
    try {
        let {id} = req.params;
        let {userId, name, email, isActive} = req.body;

        

        if(!userId || !name || !email || !isActive) {
            return next(new AppError("Algum campo não foi preenchido", 400));
        }

        if(
            typeof id !== "number" ||
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof isActive !== "boolean" 
        ) {
            return res.status(400).send({
                message: "Tipos incorretos"
            });
        }

        const indexUser: number = users.findIndex(user => user.id === Number(id));

        if(indexUser === -1) {
            return res.status(404).send({
                message: "Usuário não encontrado"
            });
        }

        let user:Iuser = {
            id: userId,
            name,
            email,
            isActive,
        }

        users[indexUser] = user;

        return res.status(200).send({
            message: "Usuário atualizado",
            user
        });

    } catch (error) {
        return res.status(500).send(error);
        
    }
});

app.delete('/users/:id', (req: Request<{id:number}>, res: Response):Response => {
    try {
        let {id} = req.params;
        const indexUser: number = users.findIndex(user => user.id === Number(id));

        if(indexUser === -1) {
            return res.status(404).send({
                message: "Usuário não encontrado"
            });
        }

        users.splice(indexUser, 1);

        return res.status(200).send({
            message: "Usuário excluído com sucesso"
        });
        
    } catch (error) {
        return res.status(500).send(error);
        
    }
});

app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server ruuning at port ${port}`);
});