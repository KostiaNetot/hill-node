import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { authenticateToken, generateAccessToken } from './middleware/authenticateToken';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// temp:
app.post('/test', authenticateToken, (req: Request, res: Response) => {
  res.send(`req.body: ${JSON.stringify(req.body)}`);
});

app.post('/api/auth/refresh-token', (req: Request, res: Response) => {
  const refreshToken = req.body.token;
  if(!refreshToken) return res.sendStatus(401);
  if(!refreshToken.uncludes(refreshToken)) return res.sendStatus(403);

  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  if (!secretKey) {
      throw new Error('Access token secret is not defined');
  }

  jwt.verify(refreshToken, secretKey, (err: any, user: any) => {
    if(err) return res.sendStatus(403);
    const accessToken = generateAccessToken(user);
    res.json(accessToken).sendStatus(200);
  })
})

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});