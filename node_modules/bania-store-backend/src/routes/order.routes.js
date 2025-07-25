import { Router } from 'express';
import { body, param } from 'express-validator';
import {
    createOrder,
    getMyOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatus
} from '../controllers/order.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

// --- Validation Chains ---
const createOrderValidation = [
    body('shippingAddress').notEmpty().withMessage('Shipping address is required'),
    body('shippingAddress.address').notEmpty().withMessage('Address line is required'),
    body('shippingAddress.city').notEmpty().withMessage('City is required'),
    body('shippingAddress.postalCode').notEmpty().withMessage('Postal code is required'),
    body('shippingAddress.country').notEmpty().withMessage('Country is required'),
    body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
    body('items.*.productId').isMongoId().withMessage('Each item must have a valid product ID'),
    body('items.*.quantity').isInt({ gt: 0 }).withMessage('Item quantity must be a number greater than 0')
];

const updateStatusValidation = [
    param('id').isMongoId().withMessage('Invalid order ID'),
    body('status').isIn(['PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED']).withMessage('Invalid status value')
];

const mongoIdParamValidation = [
    param('id').isMongoId().withMessage('Invalid ID format')
];


// --- Routes ---

// All routes below are protected
router.use(protect);

// @route   POST /api/orders
router.post('/', createOrderValidation, validate, createOrder);

// @route   GET /api/orders/my-orders
router.get('/my-orders', getMyOrders);

// @route   GET /api/orders
router.get('/', authorize('ADMIN'), getAllOrders);

// @route   GET /api/orders/:id
router.get('/:id', mongoIdParamValidation, validate, getOrderById);

// @route   PUT /api/orders/:id/status
router.put('/:id/status', authorize('ADMIN'), updateStatusValidation, validate, updateOrderStatus);

export default router;
