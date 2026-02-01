import User from '../models/User.js';
import Property from '../models/Property.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res, next) => {
  const { role, status, page = 1, limit = 10 } = req.query;

  let query = {};

  if (role) {
    query.role = role;
  }

  if (status) {
    query.isActive = status === 'active';
  }

  const startIndex = (page - 1) * limit;
  const total = await User.countDocuments(query);

  const users = await User.find(query)
    .select('-password')
    .sort('-createdAt')
    .skip(startIndex)
    .limit(parseInt(limit));

  const pagination = {};

  if (startIndex + users.length < total) {
    pagination.next = {
      page: parseInt(page) + 1,
      limit: parseInt(limit),
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: parseInt(page) - 1,
      limit: parseInt(limit),
    };
  }

  res.status(200).json({
    success: true,
    count: users.length,
    total,
    pagination,
    data: users,
  });
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  // Get user's properties
  const properties = await Property.find({ owner: req.params.id });

  res.status(200).json({
    success: true,
    data: {
      ...user.toJSON(),
      properties,
      propertyCount: properties.length,
    },
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).select('-password');

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: updatedUser,
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  // Delete user's properties
  await Property.deleteMany({ owner: req.params.id });

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: 'User and associated properties deleted successfully',
    data: {},
  });
});

// @desc    Toggle user active status
// @route   PUT /api/users/:id/toggle-status
// @access  Private/Admin
export const toggleUserStatus = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  user.isActive = !user.isActive;
  await user.save();

  res.status(200).json({
    success: true,
    message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
    data: user,
  });
});

// @desc    Get user statistics (Admin)
// @route   GET /api/users/stats
// @access  Private/Admin
export const getUserStats = asyncHandler(async (req, res, next) => {
  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ isActive: true });
  const adminUsers = await User.countDocuments({ role: 'admin' });
  const regularUsers = await User.countDocuments({ role: 'user' });

  // Get recent users (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentUsers = await User.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  });

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      adminUsers,
      regularUsers,
      recentUsers,
    },
  });
});
