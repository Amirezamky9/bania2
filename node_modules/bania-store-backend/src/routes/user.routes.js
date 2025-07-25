import { Router } from 'express';
import { body, param } from 'express-validator';
import {
    getAllUsers,
    updateUserStatus
} from '../controllers/user.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

// --- Validation Chains ---
const updateUserStatusValidation = [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('status').isIn(['ACTIVE', 'BLOCKED']).withMessage("Status must be either 'ACTIVE' or 'BLOCKED'")
];


// --- Routes ---

// All routes below are protected and for Admins only
router.use(protect, authorize('ADMIN'));

// @route   GET /api/users
router.get('/', getAllUsers);

// @route   PUT /api/users/:id/status
router.put('/:id/status', updateUserStatusValidation, validate, updateUserStatus);

export default router;
