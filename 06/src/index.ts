import express, { Express, Request, Response , Application, NextFunction } from 'express';
import dotenv from 'dotenv';
import { usersRouter } from './routes/usersRouter';
import { postsRouter } from './routes/postsRouter';
import { ErrorHandler } from './middleware/ErrorHandler';
 
dotenv.config();

const app: Application = express();
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Buy the way, the time is: ', new Date().toLocaleTimeString());
  next();
});

const port = process.env.PORT || 3000;

app.use('/users', usersRouter);
app.use('/posts', postsRouter);


app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});