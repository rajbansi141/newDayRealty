import Property from '../models/Property.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
export const getProperties = asyncHandler(async (req, res, next) => {
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude from filtering
  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach((param) => delete reqQuery[param]);

  // Only show approved properties to non-admin users
  if (!req.user || req.user.role !== 'admin') {
    reqQuery.approved = true;
    reqQuery.isActive = true;
  }

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

  // Finding resource
  let query = Property.find(JSON.parse(queryStr)).populate('owner', 'name email phone');

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt'); // Default sort by newest
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Property.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Execute query
  const properties = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: properties.length,
    total,
    pagination,
    data: properties,
  });
});

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
export const getProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id).populate('owner', 'name email phone');

  if (!property) {
    return next(new ErrorResponse(`Property not found with id of ${req.params.id}`, 404));
  }

  // Increment views
  property.views += 1;
  await property.save();

  res.status(200).json({
    success: true,
    data: property,
  });
});

// @desc    Create new property
// @route   POST /api/properties
// @access  Private
export const createProperty = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.owner = req.user.id;

  // If user is admin, auto-approve
  if (req.user.role === 'admin') {
    req.body.approved = true;
  }

  const property = await Property.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Property created successfully',
    data: property,
  });
});

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private
export const updateProperty = asyncHandler(async (req, res, next) => {
  let property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorResponse(`Property not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is property owner or admin
  if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User not authorized to update this property`, 403));
  }

  property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: 'Property updated successfully',
    data: property,
  });
});

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private
export const deleteProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorResponse(`Property not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is property owner or admin
  if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User not authorized to delete this property`, 403));
  }

  await property.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Property deleted successfully',
    data: {},
  });
});

// @desc    Approve property (Admin only)
// @route   PUT /api/properties/:id/approve
// @access  Private/Admin
export const approveProperty = asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorResponse(`Property not found with id of ${req.params.id}`, 404));
  }

  property.approved = true;
  await property.save();

  res.status(200).json({
    success: true,
    message: 'Property approved successfully',
    data: property,
  });
});

// @desc    Get featured properties
// @route   GET /api/properties/featured
// @access  Public
export const getFeaturedProperties = asyncHandler(async (req, res, next) => {
  const properties = await Property.find({ featured: true, approved: true, isActive: true })
    .populate('owner', 'name email phone')
    .limit(6)
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties,
  });
});

// @desc    Search properties
// @route   GET /api/properties/search
// @access  Public
export const searchProperties = asyncHandler(async (req, res, next) => {
  const { keyword, type, minPrice, maxPrice, bedrooms, bathrooms, city } = req.query;

  let query = { approved: true, isActive: true };

  // Text search
  if (keyword) {
    query.$text = { $search: keyword };
  }

  // Filter by type
  if (type) {
    query.type = type;
  }

  // Filter by price range
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseInt(minPrice);
    if (maxPrice) query.price.$lte = parseInt(maxPrice);
  }

  // Filter by bedrooms
  if (bedrooms) {
    query.bedrooms = { $gte: parseInt(bedrooms) };
  }

  // Filter by bathrooms
  if (bathrooms) {
    query.bathrooms = { $gte: parseInt(bathrooms) };
  }

  // Filter by city
  if (city) {
    query.city = new RegExp(city, 'i');
  }

  const properties = await Property.find(query).populate('owner', 'name email phone');

  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties,
  });
});
