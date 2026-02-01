import Contact from '../models/Contact.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = asyncHandler(async (req, res, next) => {
  const { name, email, subject, message, phone } = req.body;

  const contact = await Contact.create({
    name,
    email,
    subject,
    message,
    phone,
  });

  res.status(201).json({
    success: true,
    message: 'Your message has been sent successfully. We will get back to you soon!',
    data: contact,
  });
});

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
export const getContacts = asyncHandler(async (req, res, next) => {
  const { status, page = 1, limit = 10 } = req.query;

  let query = {};

  if (status) {
    query.status = status;
  }

  const startIndex = (page - 1) * limit;
  const total = await Contact.countDocuments(query);

  const contacts = await Contact.find(query)
    .populate('repliedBy', 'name email')
    .sort('-createdAt')
    .skip(startIndex)
    .limit(parseInt(limit));

  const pagination = {};

  if (startIndex + contacts.length < total) {
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
    count: contacts.length,
    total,
    pagination,
    data: contacts,
  });
});

// @desc    Get single contact message
// @route   GET /api/contact/:id
// @access  Private/Admin
export const getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id).populate('repliedBy', 'name email');

  if (!contact) {
    return next(new ErrorResponse(`Contact message not found with id of ${req.params.id}`, 404));
  }

  // Mark as read if status is 'new'
  if (contact.status === 'new') {
    contact.status = 'read';
    await contact.save();
  }

  res.status(200).json({
    success: true,
    data: contact,
  });
});

// @desc    Update contact status
// @route   PUT /api/contact/:id/status
// @access  Private/Admin
export const updateContactStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorResponse(`Contact message not found with id of ${req.params.id}`, 404));
  }

  contact.status = status;
  await contact.save();

  res.status(200).json({
    success: true,
    message: 'Contact status updated successfully',
    data: contact,
  });
});

// @desc    Reply to contact message
// @route   PUT /api/contact/:id/reply
// @access  Private/Admin
export const replyContact = asyncHandler(async (req, res, next) => {
  const { replyMessage } = req.body;

  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorResponse(`Contact message not found with id of ${req.params.id}`, 404));
  }

  contact.replyMessage = replyMessage;
  contact.replied = true;
  contact.repliedAt = Date.now();
  contact.repliedBy = req.user.id;
  contact.status = 'replied';

  await contact.save();

  res.status(200).json({
    success: true,
    message: 'Reply sent successfully',
    data: contact,
  });
});

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorResponse(`Contact message not found with id of ${req.params.id}`, 404));
  }

  await contact.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Contact message deleted successfully',
    data: {},
  });
});
