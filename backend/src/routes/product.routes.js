import { Router } from 'express';
import { body, param } from 'express-validator';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

// --- Validation Chains ---
const createProductValidation = [
    body('title').notEmpty().withMessage('Product title is required').trim(),
    body('description').notEmpty().withMessage('Description is required').trim(),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be an integer of 0 or more'),
    body('category').notEmpty().withMessage('Category is required').isMongoId().withMessage('Invalid category ID'),
    body('images').optional().isArray().withMessage('Images must be an array of strings')
];

const updateProductValidation = [
    param('id').isMongoId().withMessage('Invalid product ID'),
    body('title').optional().notEmpty().withMessage('Title cannot be empty').trim(),
    body('description').optional().notEmpty().withMessage('Description cannot be empty').trim(),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be an integer of 0 or more'),
    body('category').optional().isMongoId().withMessage('Invalid category ID'),
    body('images').optional().isArray().withMessage('Images must be an array of strings')
];

const mongoIdParamValidation = [
    param('id').isMongoId().withMessage('Invalid ID format')
];


// --- Routes ---

// @route   GET /api/products
router.get('/', getAllProducts);

// @route   GET /api/products/:id
router.get('/:id', mongoIdParamValidation, validate, getProductById);

// @route   POST /api/products
router.post('/', protect, authorize('ADMIN'), createProductValidation, validate, createProduct);

// @route   PUT /api/products/:id
router.put('/:id', protect, authorize('ADMIN'), updateProductValidation, validate, updateProduct);

// @route   DELETE /api/products/:id
router.delete('/:id', protect, authorize('ADMIN'), mongoIdParamValidation, validate, deleteProduct);

export default router;
