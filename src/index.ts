import { router } from './routes';
import express, { Request, Response } from 'express';

const server = express();

server.use(express.json());
server.use(router)

server.get('/', (request: Request, response: Response) => {
  return response.status(200).json({ message: 'DioBank API' })
})



server.listen(3000, () => console.log('Server on'));