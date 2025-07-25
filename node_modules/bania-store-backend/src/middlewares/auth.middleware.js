import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import User from '../models/user.model.js';

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check for token in Authorization header (Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token payload and attach to request object
            // Exclude the password field
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return next(new ApiError(401, 'User not found, token failed'));
            }

            next();
        } catch (error) {
            return next(new ApiError(401, 'Not authorized, token failed'));
        }
    }

    if (!token) {
        return next(new ApiError(401, 'Not authorized, no token'));
    }
});

// Middleware to authorize based on user role
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new ApiError(403, `Forbidden: User role '${req.user.role}' is not authorized to access this route`));
        }
        next();
    };
};


export { protect, authorize };
