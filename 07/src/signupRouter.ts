import { Request, Response, Router, NextFunction } from "express";

const signupRouter: Router = Router();

signupRouter
  .post('/signup', (req, res) => {
    res.send(typeof req.body);
  });

export { signupRouter }