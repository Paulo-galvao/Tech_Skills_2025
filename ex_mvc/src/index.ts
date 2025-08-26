import express, {Express, Request, Response} from 'express';
import 'dotenv/config';

import countriesRoutes from "./routes/countries.routes";

const app:Express = express();
const port = process.env.API_PORT;

app.use(express.json());

app.use('/countries', countriesRoutes);

app.listen(port, () => {
    console.log("Server running on port", port);
});