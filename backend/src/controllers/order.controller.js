import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import mongoose from 'mongoose';

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Private/User
 */
const createOrder = asyncHandler(async (req, res) => {
    const { items, shippingAddress } = req.body;
    const userId = req.user._id;

    if (!items || items.length === 0) {
        throw new ApiError(400, "No order items provided");
    }

    if (!shippingAddress) {
        throw new ApiError(400, "Shipping address is required");
    }

    let orderItems = [];
    let totalAmount = 0;

    // Use a for...of loop to handle async operations inside the loop correctly
    for (const item of items) {
        const product = await Product.findById(item.productId);

        if (!product) {
            throw new ApiError(404, `Product with ID ${item.productId} not found`);
        }

        if (product.stock < item.quantity) {
            throw new ApiError(400, `Not enough stock for ${product.title}. Only ${product.stock} left.`);
        }

        const orderItem = {
            product: {
                _id: product._id,
                title: product.title,
                price: product.price,
                images: product.images
            },
            quantity: item.quantity,
            price: product.price // Price at the time of order
        };
        orderItems.push(orderItem);

        totalAmount += product.price * item.quantity;

        // Decrease stock
        product.stock -= item.quantity;
        await product.save();
    }

    const order = await Order.create({
        user: userId,
        items: orderItems,
        totalAmount,
        shippingAddress
    });

    return res.status(201).json(
        new ApiResponse(201, order, "Order created successfully")
    );
});

/**
 * @desc    Get logged in user's orders
 * @route   GET /api/orders/my-orders
 * @access  Private/User
 */
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, orders, "User orders fetched successfully")
    );
});

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private/Admin
 */
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, orders, "All orders fetched successfully")
    );
});

/**
 * @desc    Get single order by ID
 * @route   GET /api/orders/:id
 * @access  Private/Owner or Admin
 */
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    // Check if the user is the owner of the order or an admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
        throw new ApiError(403, "Forbidden: You are not authorized to view this order");
    }

    return res.status(200).json(
        new ApiResponse(200, order, "Order details fetched successfully")
    );
});

/**
 * @desc    Update order status
 * @route   PUT /api/orders/:id/status
 * @access  Private/Admin
 */
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
        throw new ApiError(404, "Order not found");
    }
    
    // Optional: Add logic to prevent reverting status, e.g., from 'DELIVERED' back to 'PROCESSING'
    // Optional: If order is canceled, restore product stock
    if (status === 'CANCELED' && order.status !== 'CANCELED') {
        for (const item of order.items) {
            await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: item.quantity } });
        }
    }


    order.status = status;
    await order.save();

    return res.status(200).json(
        new ApiResponse(200, order, "Order status updated successfully")
    );
});

export {
    createOrder,
    getMyOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatus
};
