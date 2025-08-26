import express, {NextFunction, Request, Response } from 'express';
import axios, { AxiosResponse} from 'axios';

import Country from '../models/Country';

export async function index(req: Request, res: Response):Promise<Response> {
    try {
        const countries = await Country.find().exec();

        if(countries.length === 0) {
            return res.status(404).send({
                message: "Nenhum item cadastrado"
            });
        }

        return res.status(200).send(countries);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function create(req: Request, res: Response):Promise<Response|undefined> {
    try {

        const {name} = req.params;
        const response:AxiosResponse = await axios.get(`https://restcountries.com/v3.1/name/${name}`);


        const country = await Country.create( {
            title: response.data[0].name.common,
            continents: response.data[0].continents,
            capital:response.data[0].capital,
            population:response.data[0].population,
            flag:response.data[0].flag,
        });

        res.status(201).send({
            message: "Cadastro efetuado com sucesso",
            country
        });

    } catch (error) {
        return res.status(500).send(error);
    }
}