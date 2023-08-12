import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../config/token';

declare global {
  namespace Express {
    interface Request {
      user: string
    }
  }
}

export function validateUser(req: Request, res: Response, next: NextFunction) {
  const token: string = req.cookies.token;

  if (!token) return res.sendStatus(401);

  const { user }: string | any = validateToken(token);

  if (!user) return res.sendStatus(401);

  req.user = user;

  next();
}
