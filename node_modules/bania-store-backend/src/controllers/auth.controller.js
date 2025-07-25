import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import User from '../models/user.model.js';

/**
 * @desc    Generate JWT token
 * @param   {string} userId
 * @returns {string} token
 */
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    // Do not return the password in the final response
    const createdUser = await User.findById(user._id).select('-password');

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new ApiError(401, "Invalid credentials");
    }
    
    if (user.status === 'BLOCKED') {
        throw new ApiError(403, "Your account has been blocked. Please contact support.");
    }

    const token = generateToken(user._id);
    const loggedInUser = await User.findById(user._id).select('-password');

    return res.status(200).json(
        new ApiResponse(
            200,
            { user: loggedInUser, token },
            "User logged in successfully"
        )
    );
});

/**
 * @desc    Login admin
 * @route   POST /api/auth/admin/login
 * @access  Public
 */
const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || user.role !== 'ADMIN') {
        throw new ApiError(401, "Invalid credentials or not an admin");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new ApiError(401, "Invalid credentials");
    }
    
    if (user.status === 'BLOCKED') {
        throw new ApiError(403, "Your account has been blocked.");
    }

    const token = generateToken(user._id);
    const loggedInUser = await User.findById(user._id).select('-password');

    return res.status(200).json(
        new ApiResponse(
            200,
            { user: loggedInUser, token },
            "Admin logged in successfully"
        )
    );
});


/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getCurrentUser = asyncHandler(async (req, res) => {
    // The user object is attached to the request by the 'protect' middleware
    const user = req.user;
    return res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
});


export {
    registerUser,
    loginUser,
    adminLogin,
    getCurrentUser
};
