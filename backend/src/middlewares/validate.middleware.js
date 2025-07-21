import { validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';

/**
 * @description This middleware runs the validation checks from express-validator.
 * If there are validation errors, it collects them and throws an ApiError.
 * This error is then caught by our central errorHandler.
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = errors.array().map(err => {
        return { [err.path]: err.msg };
    });

    // 422 (Unprocessable Entity) is a more semantic status code for validation errors
    // than the generic 400 (Bad Request).
    throw new ApiError(422, "Invalid input data provided", extractedErrors);
};

export { validate };

