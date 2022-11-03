import {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';

interface CustomErrorInterface extends ErrorRequestHandler {
  type: string;
  message: string;
}

const ErrorHandler = (
  error: CustomErrorInterface,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('yo');
  if (error.type === '400') {
    res.status(400).send(error.message);
  } else if (error.type === '404') {
    res.status(404).send(error.message);
  } else {
    res.status(500).send({ message: '500 Internal Server Error' });
  }
  next();
};

export const error400 = {
  type: '400',
  message: 'You&apos;re already a member of that group!',
};

export const error404 = {
  type: '404',
  message: 'Not Found',
};

export const error500 = {
  type: '500',
  message: 'Internal Server Error',
};

export const error401 = {
  type: '401',
  message: 'You&apos;re not allowed to do this man!',
};

export default ErrorHandler;
