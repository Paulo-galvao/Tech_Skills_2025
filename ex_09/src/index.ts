import express, { Express, Request, Response } from 'express';
import axios, { AxiosResponse} from 'axios';

const app: Express = express();
const port: number = 3000;
app.use(express.json());

interface ICountry  {
    name:string,
    continents:[string],
    capital:[string],
    population:number,
    flag:string
}

app.get('/country/:name', async (req:Request<{ name: any }>, res:Response) => {
    try {
        const {name} = req.params;
        const response:AxiosResponse = await axios.get(`https://restcountries.com/v3.1/name/${name}`);

        const country:ICountry = {
            name:response.data[0].name.common,
            continents:response.data[0].continents,
            capital:response.data[0].capital,
            population:response.data[0].population,
            flag:response.data[0].flag,
        }

        return res.status(200).send(country);
    } catch (error) {
        return res.status(500).send(error);
    }
    
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});