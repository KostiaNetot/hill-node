import { Request, Response, Router, NextFunction } from "express";
import { requestBodyValidator } from '../middleware/RequestBodyValidator';

const usersRouter: Router = Router();

usersRouter.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware at usersRouter level');
  next();
});

const mockResponse = {
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
}

usersRouter
  .get('/', (req, res) => {
  res.json(mockResponse)
})
  .post('/', requestBodyValidator, (req: Request, res: Response) => {
    res.send('POST request to usersRouter');
  })
  .delete('/', requestBodyValidator, (req: Request, res: Response) => {
    res.send('DELETE request to usersRouter');
  });

export { usersRouter }