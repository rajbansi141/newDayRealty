import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  getUserStats,
  getFavorites,
  toggleFavorite,
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Protected routes (available to any logged-in user)
router.use(protect);

router.get('/favorites', getFavorites);
router.post('/favorites/:propertyId', toggleFavorite);

// Admin only routes
router.use(authorize('admin'));

router.get('/stats', getUserStats);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/toggle-status', toggleUserStatus);

export default router;
