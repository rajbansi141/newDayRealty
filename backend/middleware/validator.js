import { validationResult } from 'express-validator';
import ErrorResponse from '../utils/errorResponse.js';

// Middleware to check validation results
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg).join(', ');
    return next(new ErrorResponse(errorMessages, 400));
  }
  
  next();
};
