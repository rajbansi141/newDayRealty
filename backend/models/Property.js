import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a property title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a property description'],
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    type: {
      type: String,
      required: [true, 'Please provide a property type'],
      enum: ['Villa', 'House', 'Apartment', 'Studio', 'Commercial', 'Land'],
    },
    status: {
      type: String,
      enum: ['For Sale', 'For Rent', 'Sold', 'Rented'],
      default: 'For Sale',
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Please provide a full address'],
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    zipCode: {
      type: String,
      trim: true,
    },
    bedrooms: {
      type: Number,
      default: 0,
      min: [0, 'Bedrooms cannot be negative'],
    },
    bathrooms: {
      type: Number,
      default: 0,
      min: [0, 'Bathrooms cannot be negative'],
    },
    area: {
      type: Number,
      required: [true, 'Please provide property area'],
      min: [0, 'Area cannot be negative'],
    },
    areaInAana: {
      type: Number,
      min: [0, 'Area in aana cannot be negative'],
    },
    areaUnit: {
      type: String,
      enum: ['sqft', 'sqm', 'aana'],
      default: 'sqft',
    },
    roadAccess: {
      type: String,
      trim: true,
    },
    floors: {
      type: Number,
      default: 1,
      min: [0, 'Floors cannot be negative'],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: String,
      },
    ],
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],
    yearBuilt: {
      type: Number,
      min: [1800, 'Year built seems invalid'],
      max: [new Date().getFullYear() + 2, 'Year built cannot be in the future'],
    },
    parking: {
      type: String,
      enum: ['Available', 'Not Available'],
      default: 'Not Available',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    soldAt: {
      type: Date,
      default: null,
    },
    agent: {
      name: String,
      email: String,
      phone: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
propertySchema.index({ location: 'text', title: 'text', description: 'text' });
propertySchema.index({ price: 1, type: 1, city: 1 });

const Property = mongoose.model('Property', propertySchema);

export default Property;
