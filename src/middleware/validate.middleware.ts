import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/apperrors';

export const validate = (schema: z.ZodObject<any>) => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  const validation = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params
  });

  if (!validation.success) {
    res.status(400).json({
      message: 'Validation failed',
      errors: validation.error.issues
    });
    return;
  }

  req.body = validation.data
  next();
};