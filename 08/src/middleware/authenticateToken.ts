import { User } from './../../../03/src/types'; // transform it
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  const accessToken = process.env.ACCESS_TOKEN_SECRET;
  if (!accessToken) {
      throw new Error('Access token secret is not defined');
  }

  jwt.verify(token, accessToken, (err, user) => {
    if(err) return res.sendStatus(403);
    req.body.user = user;
    next();
  })
}

const generateAccessToken = (user: User) => {
  const accessToken = process.env.ACCESS_TOKEN_SECRET;
  if (!accessToken) {
      throw new Error('Access token secret is not defined');
  }

  return jwt.sign(user, accessToken, { expiresIn: '10m' })  
}

export { authenticateToken, generateAccessToken }