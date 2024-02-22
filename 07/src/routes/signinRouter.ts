import { Request, Response, Router, NextFunction } from "express";
import { signupValidationSchema } from "../schema/signupValidationSchema";
import { validator } from "../middleware/validator";
import { checkIfUserExist } from "../utils/checkIfUserExist";

const signInRouter: Router = Router();

signInRouter
 .post('/signin', validator(signupValidationSchema), (req: Request, res: Response) => {
  // auth
  // checkIfUserExist => 200 | 400
  res.send('Hello from SignIn!')
 })

 export { signInRouter }