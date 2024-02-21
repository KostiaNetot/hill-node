import { Request, Response, Router, NextFunction } from "express";
import { signupValidationSchema } from "../schema/signupValidationSchema";
import { validator } from "../middleware/validator";

const signupRouter: Router = Router();

signupRouter
  .post('/signup', validator(signupValidationSchema), (req: Request, res: Response) => {
    res.json({
      message: 'Sign up complete ✔',
      success: true,
      status: 200,
      data: req.body,
    })
  });

export { signupRouter }