import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { setUserId } from '../context';


interface CustomRequest extends Request {
    user?: { id: string; email: string };
}

/**
 * Middleware function for authentication.
*/
export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  // Extract the token from the Authorization header, Assumes token is sent as 'Bearer token'
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Token not found');
  }

  // verify token
  jwt.verify(token, process.env.jwt_secret!, (err, decoded) => {
    req.user = decoded as { id: string; email: string };
    setUserId(req.user)
    if (err) {
      return res.status(401).send({ok: false, message: err.message});
    }
    next();
  });
};