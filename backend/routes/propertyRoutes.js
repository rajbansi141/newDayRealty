import express from 'express';
import { body } from 'express-validator';
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  approveProperty,
  getFeaturedProperties,
  searchProperties,
  purchaseProperty,
  toggleFeatured,
} from '../controllers/propertyController.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

// Validation rules
const propertyValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('type')
    .isIn(['Villa', 'House', 'Apartment', 'Studio', 'Commercial', 'Land'])
    .withMessage('Invalid property type'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('area').isNumeric().withMessage('Area must be a number'),
  body('areaInAana').optional().isNumeric().withMessage('Area in aana must be a number'),
  body('bedrooms').optional().isNumeric().withMessage('Bedrooms must be a number'),
  body('bathrooms').optional().isNumeric().withMessage('Bathrooms must be a number'),
  body('parking')
    .optional()
    .isIn(['Available', 'Not Available'])
    .withMessage('Parking status must be Available or Not Available'),
  body('floors').optional().isNumeric().withMessage('Floors must be a number'),
  body('roadAccess').optional().trim(),
];

// Public routes
router.get('/search', searchProperties);
router.get('/featured', getFeaturedProperties);
router.get('/', optionalAuth, getProperties);
router.get('/:id', getProperty);

// Protected routes
router.post('/', protect, propertyValidation, validate, createProperty);
router.put('/:id', protect, propertyValidation, validate, updateProperty);
router.delete('/:id', protect, deleteProperty);

router.put('/:id/purchase', protect, purchaseProperty);

// Admin only routes
router.put('/:id/approve', protect, authorize('admin'), approveProperty);
router.put('/:id/featured', protect, authorize('admin'), toggleFeatured);

export default router;
