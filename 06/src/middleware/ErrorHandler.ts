import { Request, Response, NextFunction } from 'express';

const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(`Middleware Error Handling: ${err.stack}`);

  const errStatus: number = err.statusCode || 500;
  const errMsg: string = err.message || 'Something went wrong';

  res.status(errStatus).json({
      success: false,
      status: errStatus,
      message: errMsg,
      stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
};

export { ErrorHandler };
