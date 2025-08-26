import express, { Express } from 'express';
import { logging } from './middlewares/logging';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from './routes/user.routes';
import "dotenv/config";

const app: Express = express();
const port: string|undefined = process.env.PORT;
app.use(express.json());
app.use(logging);

app.use('/users', userRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server ruuning at port ${port}`);
});