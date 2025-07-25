import { Router } from 'express';
import { body, param } from 'express-validator';
import {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
} from '../controllers/category.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

// --- Validation Chains ---
const createCategoryValidation = [
    body('name').notEmpty().withMessage('Category name is required').trim(),
    body('slug').optional().isSlug().withMessage('Slug must be a valid URL-friendly string'),
    body('parent').optional({ nullable: true }).isMongoId().withMessage('Invalid parent category ID')
];

const updateCategoryValidation = [
    param('id').isMongoId().withMessage('Invalid category ID'),
    body('name').optional().notEmpty().withMessage('Category name cannot be empty').trim(),
    body('slug').optional().isSlug().withMessage('Slug must be a valid URL-friendly string'),
    body('parent').optional({ nullable: true }).isMongoId().withMessage('Invalid parent category ID')
];

const deleteCategoryValidation = [
    param('id').isMongoId().withMessage('Invalid category ID')
];

// --- Routes ---

// @route   GET /api/categories
router.get('/', getAllCategories);

// @route   POST /api/categories
router.post('/', protect, authorize('ADMIN'), createCategoryValidation, validate, createCategory);

// @route   PUT /api/categories/:id
router.put('/:id', protect, authorize('ADMIN'), updateCategoryValidation, validate, updateCategory);

// @route   DELETE /api/categories/:id
router.delete('/:id', protect, authorize('ADMIN'), deleteCategoryValidation, validate, deleteCategory);

export default router;
