import type { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    const error = new Error('Unauthorized');    
    return res.status(401).json({error: error.message});
  }

  const [, token] = bearer.split(' ');
  if (!token) {
    const error = new Error('Unauthorized');
    return res.status(401).json({error: error.message});
  }

  try {
    const result =  jwt.verify(token, process.env.JWT_SECRET!);
    if (result && typeof result === 'object' && result.id) {
      const user = await User.findById(result.id).select('-password -__v -createdAt -updatedAt');

      if (!user) {
        const error = new Error('User not found');
        return res.status(404).json({error: error.message});
      }

      req.user = user;
      next();
    }
  } catch (error) {
    const err = new Error('Unauthorized');
    console.error(error);
    return res.status(401).json({error: err.message});
  }
};