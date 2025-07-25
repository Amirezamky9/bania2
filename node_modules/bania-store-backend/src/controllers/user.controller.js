import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import User from '../models/user.model.js';

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
    // We can add pagination here as well if needed
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, users, "All users fetched successfully")
    );
});

/**
 * @desc    Update user status (ACTIVE/BLOCKED)
 * @route   PUT /api/users/:id/status
 * @access  Private/Admin
 */
const updateUserStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['ACTIVE', 'BLOCKED'].includes(status)) {
        throw new ApiError(400, "Invalid status provided. Status must be 'ACTIVE' or 'BLOCKED'.");
    }

    const user = await User.findById(id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Prevent admin from blocking themselves
    if (user._id.toString() === req.user._id.toString()) {
        throw new ApiError(400, "Admin cannot block themselves.");
    }
    
    // Prevent another admin from blocking a super-admin or another admin (optional logic)
    if (user.role === 'ADMIN') {
        throw new ApiError(403, "Cannot change status of another admin.");
    }

    user.status = status;
    await user.save();
    
    const updatedUser = await User.findById(id).select('-password');


    return res.status(200).json(
        new ApiResponse(200, updatedUser, "User status updated successfully")
    );
});


export {
    getAllUsers,
    updateUserStatus
};
