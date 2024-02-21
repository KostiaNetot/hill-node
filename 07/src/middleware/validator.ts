import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { SignUpData } from '../types/types';
import { signupValidationSchema } from '../schema/signupValidationSchema';

const validator = (validationSchema: ObjectSchema<SignUpData>) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = validationSchema.validate(req.body);

  error && next(new Error(error.message));
    
  next();
}

export { validator }