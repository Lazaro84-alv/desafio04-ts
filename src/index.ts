import 'reflect-metadata';
import { router } from './routes';
import express, { Request, Response } from 'express';
import { AppDataSource } from './database';

const server = express();

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source inicializado!")
    })
    .catch((error) => {
        console.error(error)
    })

server.use(express.json());
server.use(router)

server.get('/', (request: Request, response: Response) => {
  return response.status(200).json({ message: 'DioBank API' })
})



server.listen(3000, () => console.log('Server on'));