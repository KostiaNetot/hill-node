import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { signupRouter } from './signupRouter';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(signupRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});