import { Request, Response, NextFunction } from 'express';

// rout level middleware
const requestBodyValidator = (req: Request, res: Response, next: NextFunction) => {
  const bodyFields = Object.keys(req.body);
  const emptyFields: Array<string> = [];

  const singularOrPlural = (arr: typeof emptyFields, str: string): string => {
    return arr.length > 1 ? str + 's' : str;
  }

  for (const field of bodyFields) {
    if (!req.body[field]) {
      emptyFields.push(field);
    }
  }
  res.status(400).json({ 
    error: `${emptyFields.join(', ')} ${singularOrPlural(emptyFields, 'field')} cannot be empty` 
  });
  next();
};

export { requestBodyValidator };
