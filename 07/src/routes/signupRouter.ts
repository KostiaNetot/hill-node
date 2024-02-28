import { Request, Response, Router, NextFunction } from "express";
import argon2 from 'argon2';
import { signupValidationSchema } from "../schema/signupValidationSchema";
import { validator } from "../middleware/validator";
import { handleSignup } from "../utils/handleSignup";

const signUpRouter: Router = Router();

signUpRouter
  .post('/signup', validator(signupValidationSchema), (req: Request, res: Response) => {
    handleSignup(req.body)
      .then((isExist) => {
        isExist ?  
          res.json({
            message: 'User already exist',
            success: false,
            status: 400,
            data: { username: req.body.username },
          }) :
          res.json({
            message: 'Sign up complete ✔',
            success: true,
            status: 201,
            data: { username: req.body.username },
          })
      })    
  });

export { signUpRouter }