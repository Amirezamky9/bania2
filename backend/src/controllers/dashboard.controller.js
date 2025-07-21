import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/dashboard/stats
 * @access  Private/Admin
 */
const getDashboardStats = asyncHandler(async (req, res) => {
    // Get total counts for each model
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Calculate total sales revenue
    const salesData = await Order.aggregate([
        {
            $match: { status: 'DELIVERED' } // Only count sales from delivered orders
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalAmount' }
            }
        }
    ]);

    const totalRevenue = salesData.length > 0 ? salesData[0].totalRevenue : 0;
    
    // Get recent orders (e.g., last 5)
    const recentOrders = await Order.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('user', 'name');

    const stats = {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        recentOrders
    };

    return res.status(200).json(
        new ApiResponse(200, stats, "Dashboard statistics fetched successfully")
    );
});

export {
    getDashboardStats
};
