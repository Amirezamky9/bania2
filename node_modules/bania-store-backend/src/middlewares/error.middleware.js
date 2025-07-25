import { ApiError } from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    
    // Log the full error to the console for the developer
    console.error(err);

    // Handle specific Mongoose Errors
    // 1. Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new ApiError(404, message);
    }

    // 2. Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const message = `Duplicate value for field '${field}'. Please use another value.`;
        error = new ApiError(409, message); // 409 Conflict
    }

    // 3. Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(val => val.message);
        const message = `Invalid input data. ${errors.join('. ')}`;
        error = new ApiError(400, message, errors);
    }

    // Handle specific JWT Errors
    // 1. Invalid Token
    if (err.name === 'JsonWebTokenError') {
        const message = 'Invalid token. Please log in again.';
        error = new ApiError(401, message);
    }
    // 2. Expired Token
    if (err.name === 'TokenExpiredError') {
        const message = 'Your session has expired. Please log in again.';
        error = new ApiError(401, message);
    }

    const statusCode = error.statusCode || 500;
    const responseMessage = error.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        message: responseMessage,
        errors: error.errors || [],
        // Only show stack trace in development environment
        ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
    });
};

export { errorHandler };
