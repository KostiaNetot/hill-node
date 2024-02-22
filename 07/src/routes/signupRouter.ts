import { Request, Response, Router, NextFunction } from "express";
import argon2 from 'argon2';
import { signupValidationSchema } from "../schema/signupValidationSchema";
import { validator } from "../middleware/validator";
import { checkIfUserExist } from "../utils/checkIfUserExist";

const signUpRouter: Router = Router();

signUpRouter
  .post('/signup', validator(signupValidationSchema), (req: Request, res: Response) => {
    checkIfUserExist(req.body, true)
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

export { signUpRouter }