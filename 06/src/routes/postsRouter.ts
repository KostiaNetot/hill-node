import { Request, Response, Router, NextFunction } from "express";
import { requestBodyValidator } from '../middleware/RequestBodyValidator';

const postsRouter: Router = Router();

postsRouter.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware at usersRouter level');
  next();
});

const mockResponse = {
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
postsRouter
  .get('/', (req, res) => {
  res.json(mockResponse)
})
  .post('/', requestBodyValidator, (req: Request, res: Response) => {
    res.send('POST request to postsRouter');
  })
  .delete('/', requestBodyValidator, (req: Request, res: Response) => {
    res.send('DELETE request to postsRouter');
})

export { postsRouter }