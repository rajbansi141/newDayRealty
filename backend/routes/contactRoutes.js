import express from 'express';
import { body } from 'express-validator';
import {
  submitContact,
  getContacts,
  getContact,
  updateContactStatus,
  replyContact,
  deleteContact,
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

// Validation rules
const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('phone').optional().trim(),
];

const replyValidation = [
  body('replyMessage').trim().notEmpty().withMessage('Reply message is required'),
];

const statusValidation = [
  body('status')
    .isIn(['new', 'read', 'replied', 'archived'])
    .withMessage('Invalid status'),
];

// Public route
router.post('/', contactValidation, validate, submitContact);

// Admin only routes
router.get('/', protect, authorize('admin'), getContacts);
router.get('/:id', protect, authorize('admin'), getContact);
router.put('/:id/status', protect, authorize('admin'), statusValidation, validate, updateContactStatus);
router.put('/:id/reply', protect, authorize('admin'), replyValidation, validate, replyContact);
router.delete('/:id', protect, authorize('admin'), deleteContact);

export default router;
