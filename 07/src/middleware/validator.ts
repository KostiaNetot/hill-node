import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { User } from '../types/types';

const validator = (validationSchema: ObjectSchema<User>) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = validationSchema.validate(req.body);

  error && next(new Error(error.message));
    
  next();
}

export { validator }