import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Category from '../models/category.model.js';

/**
 * @desc    Create a new category
 * @route   POST /api/categories
 * @access  Private/Admin
 */
const createCategory = asyncHandler(async (req, res) => {
    const { name, parent, slug } = req.body;

    if (!name) {
        throw new ApiError(400, "Category name is required");
    }

    // Check if category with the same name or slug already exists
    const existingCategory = await Category.findOne({ $or: [{ name }, { slug }] });
    if (existingCategory) {
        throw new ApiError(409, "Category with this name or slug already exists");
    }

    const category = await Category.create({ name, parent: parent || null, slug });

    return res.status(201).json(
        new ApiResponse(201, category, "Category created successfully")
    );
});

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({}).populate('parent', 'name slug');
    return res.status(200).json(
        new ApiResponse(200, categories, "Categories fetched successfully")
    );
});

/**
 * @desc    Update a category
 * @route   PUT /api/categories/:id
 * @access  Private/Admin
 */
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, parent, slug } = req.body;

    if (!name && !parent && !slug) {
        throw new ApiError(400, "At least one field (name, parent, slug) is required for update");
    }

    const category = await Category.findByIdAndUpdate(
        id,
        { $set: { name, parent, slug } },
        { new: true, runValidators: true }
    );

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    return res.status(200).json(
        new ApiResponse(200, category, "Category updated successfully")
    );
});

/**
 * @desc    Delete a category
 * @route   DELETE /api/categories/:id
 * @access  Private/Admin
 */
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // TODO: Decide on deletion strategy. What happens to products in this category?
    // For now, we will just delete the category.
    // A better approach might be to prevent deletion if products are associated with it.

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Category deleted successfully")
    );
});

export {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};
