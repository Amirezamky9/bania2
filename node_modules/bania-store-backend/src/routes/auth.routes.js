import { Router } from 'express';
import { body } from 'express-validator';
import {
    registerUser,
    loginUser,
    adminLogin,
    getCurrentUser
} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

// --- Validation Chains ---
const registerValidation = [
    body('name').notEmpty().withMessage('Name is required').trim(),
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const loginValidation = [
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required')
];


// --- Routes ---

// @route   POST /api/auth/register
router.post('/register', registerValidation, validate, registerUser);

// @route   POST /api/auth/login
router.post('/login', loginValidation, validate, loginUser);

// @route   POST /api/auth/admin/login
router.post('/admin/login', loginValidation, validate, adminLogin);

// @route   GET /api/auth/me
router.get('/me', protect, getCurrentUser);

export default router;
