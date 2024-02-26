import { Request, Response, Router, NextFunction } from "express";
import { signupValidationSchema } from "../schema/signupValidationSchema";
import { validator } from "../middleware/validator";
import { handleSignin } from "../utils/handleSignin";

const signInRouter: Router = Router();

signInRouter
  .post('/signin', validator(signupValidationSchema), (req: Request, res: Response) => {
    handleSignin(req.body)
      .then((isValid) => {
        isValid ?
          res.json({
            message: 'Sign in successful ✔',
            success: true,
            status: 200,
            data: { username: req.body.username },
          }) : 
          res.json({
            message: 'Username or password does not match!',
            success: false,
            status: 401,
            data: { username: req.body.username },
          })
      })
 })

 export { signInRouter }