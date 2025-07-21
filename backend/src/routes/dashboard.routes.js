import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

// This route is protected and for Admins only
router.use(protect, authorize('ADMIN'));

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/stats', getDashboardStats);

export default router;
