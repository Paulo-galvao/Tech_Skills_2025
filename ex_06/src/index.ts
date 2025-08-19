import express, { Express, Request, Response } from 'express';
import validationBr from 'validation-br';

const app: Express = express();
const port: number = 3000;
app.use(express.json());

app.get('/validate-cpf/:cpf', (req:Request<{ cpf: string | number }>, res:Response):Response => {
    let {cpf} = req.params;

    if(!validationBr.isCPF(cpf)) {
        return res.status(400).send({
            message: "CPF inválido",
        })
    }
    
    return res.status(200).send({
        message: 'CPF válido'
    });    
    
});

app.get('/validate-cnpj/:cnpj', (req:Request<{ cnpj: string | number }>, res:Response):Response => {
    let {cnpj} = req.params;

    if(!validationBr.isCNPJ(cnpj)) {
        return res.status(400).send({
            message: "cnpj inválido",
        })
    }
    
    return res.status(200).send({
        message: 'cnpj válido'
    });    
    
});

app.get('/validate-cnh/:cnh', (req:Request<{ cnh: string | number }>, res:Response):Response => {
    let {cnh} = req.params;

    if(!validationBr.isCNH(cnh)) {
        return res.status(400).send({
            message: "cnh inválido",
        })
    }
    
    return res.status(200).send({
        message: 'cnh válido'
    });    
    
});

app.listen(port, () => {
    console.log(`Server ruuning at port ${port}`);
});