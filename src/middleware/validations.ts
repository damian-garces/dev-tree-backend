import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { validationResult } from "express-validator";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  // Validation Handlers
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
