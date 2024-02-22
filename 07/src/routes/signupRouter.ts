import fs from 'fs';
import { promisify } from 'util';
import { Request, Response, Router, NextFunction } from "express";
import { signupValidationSchema } from "../schema/signupValidationSchema";
import { validator } from "../middleware/validator";
import { checkIfUserExist } from "../utils/checkIfUserExist";

const signupRouter: Router = Router();

signupRouter
  .post('/signup', validator(signupValidationSchema), (req: Request, res: Response) => {
    checkIfUserExist(req.body)
      .then(exist => {
        if(exist) {
          res.json({
            message: 'User already exist',
            success: false,
            status: 400,
            data: req.body,
          })
        } else {
          res.json({
            message: 'Sign up complete ✔',
            success: true,
            status: 201,
            data: req.body,
          })
        }
      })    
  });

export { signupRouter }