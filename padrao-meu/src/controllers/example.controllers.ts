import { Request, Response } from 'express';

class ExampleController
{
    async helloWord(req: Request, res: Response)
    {
        return res.send('Hello Typescript');
    }

    testError(req: Request, res:Response)
    {
        throw new Error('Teste de erro');
    }
}

export { ExampleController };
