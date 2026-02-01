import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  getUserStats,
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin access
router.use(protect);
router.use(authorize('admin'));

// User management routes
router.get('/stats', getUserStats);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/toggle-status', toggleUserStatus);

export default router;
