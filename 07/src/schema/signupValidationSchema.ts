import Joi, { ObjectSchema } from 'joi';
import { User } from '../types/types';

const signupValidationSchema: ObjectSchema<User> = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
})

export { signupValidationSchema }