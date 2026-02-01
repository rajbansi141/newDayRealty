import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Property from './models/Property.js';
import Contact from './models/Contact.js';

// Load env vars
dotenv.config();

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ DB Connected');
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@newdayrealty.com',
    password: 'admin123',
    role: 'admin',
    phone: '+977 9841234567',
    address: 'Thamel, Kathmandu',
    isActive: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
    phone: '+977 9841234568',
    address: 'Lalitpur, Nepal',
    isActive: true,
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
    phone: '+977 9841234569',
    address: 'Bhaktapur, Nepal',
    isActive: true,
  },
];

const properties = [
  {
    title: 'Luxury Villa in Thamel',
    description: 'Beautiful luxury villa with modern amenities, swimming pool, and garden. Perfect for families looking for a premium living experience in the heart of Kathmandu.',
    price: 2500000,
    type: 'Villa',
    status: 'For Sale',
    location: 'Thamel, Kathmandu',
    address: 'Thamel Marg, Kathmandu',
    city: 'Kathmandu',
    state: 'Bagmati',
    zipCode: '44600',
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    areaUnit: 'sqft',
    images: [
      {
        url: 'https://placehold.co/800x600/4f46e5/white?text=Luxury+Villa',
      },
    ],
    features: ['Swimming Pool', 'Garden', 'Parking', 'Security'],
    amenities: ['WiFi', 'Gym', 'Playground', 'CCTV'],
    yearBuilt: 2020,
    parking: 2,
    featured: true,
    approved: true,
    isActive: true,
  },
  {
    title: 'Modern Apartment with Mountain View',
    description: 'Spacious 2-bedroom apartment with stunning mountain views. Located in a prime area with easy access to shopping centers and restaurants.',
    price: 1200000,
    type: 'Apartment',
    status: 'For Sale',
    location: 'Lalitpur',
    address: 'Jawalakhel, Lalitpur',
    city: 'Lalitpur',
    state: 'Bagmati',
    zipCode: '44700',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    areaUnit: 'sqft',
    images: [
      {
        url: 'https://placehold.co/800x600/4f46e5/white?text=Modern+Apartment',
      },
    ],
    features: ['Balcony', 'Parking', 'Elevator'],
    amenities: ['WiFi', 'Security', 'Water Supply'],
    yearBuilt: 2021,
    parking: 1,
    featured: true,
    approved: true,
    isActive: true,
  },
  {
    title: 'Spacious Family Home',
    description: 'Perfect family home with large rooms, garden, and ample parking space. Located in a peaceful neighborhood with good schools nearby.',
    price: 1800000,
    type: 'House',
    status: 'For Sale',
    location: 'Bhaktapur',
    address: 'Suryabinayak, Bhaktapur',
    city: 'Bhaktapur',
    state: 'Bagmati',
    zipCode: '44800',
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    areaUnit: 'sqft',
    images: [
      {
        url: 'https://placehold.co/800x600/4f46e5/white?text=Family+Home',
      },
    ],
    features: ['Garden', 'Parking', 'Terrace'],
    amenities: ['WiFi', 'Security', 'Playground'],
    yearBuilt: 2019,
    parking: 2,
    featured: false,
    approved: true,
    isActive: true,
  },
  {
    title: 'Cozy Studio Apartment',
    description: 'Affordable studio apartment perfect for students or young professionals. Fully furnished with modern amenities.',
    price: 800000,
    type: 'Studio',
    status: 'For Rent',
    location: 'Kathmandu',
    address: 'Baneshwor, Kathmandu',
    city: 'Kathmandu',
    state: 'Bagmati',
    zipCode: '44600',
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    areaUnit: 'sqft',
    images: [
      {
        url: 'https://placehold.co/800x600/4f46e5/white?text=Studio+Apartment',
      },
    ],
    features: ['Furnished', 'Parking'],
    amenities: ['WiFi', 'Security'],
    yearBuilt: 2022,
    parking: 1,
    featured: false,
    approved: true,
    isActive: true,
  },
  {
    title: 'Premium Commercial Space',
    description: 'Prime commercial space in the heart of Patan. Ideal for offices, showrooms, or retail businesses.',
    price: 3500000,
    type: 'Commercial',
    status: 'For Sale',
    location: 'Patan',
    address: 'Mangal Bazaar, Patan',
    city: 'Lalitpur',
    state: 'Bagmati',
    zipCode: '44700',
    bedrooms: 0,
    bathrooms: 2,
    area: 3500,
    areaUnit: 'sqft',
    images: [
      {
        url: 'https://placehold.co/800x600/4f46e5/white?text=Commercial+Space',
      },
    ],
    features: ['Parking', 'Elevator', 'Security'],
    amenities: ['WiFi', 'CCTV', 'Generator'],
    yearBuilt: 2021,
    parking: 5,
    featured: true,
    approved: true,
    isActive: true,
  },
];

const contacts = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    subject: 'Property Inquiry',
    message: 'I am interested in the luxury villa in Thamel. Can you provide more details?',
    phone: '+977 9841234570',
    status: 'new',
  },
  {
    name: 'Bob Williams',
    email: 'bob@example.com',
    subject: 'Viewing Request',
    message: 'I would like to schedule a viewing for the apartment in Lalitpur.',
    phone: '+977 9841234571',
    status: 'read',
  },
];

// Import data
const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Property.deleteMany();
    await Contact.deleteMany();

    console.log('🗑️  Data Destroyed...');

    // Create users
    const createdUsers = await User.create(users);
    console.log('✅ Users Created');

    // Assign properties to users
    const adminUser = createdUsers[0];
    const regularUser = createdUsers[1];

    properties[0].owner = adminUser._id;
    properties[1].owner = regularUser._id;
    properties[2].owner = adminUser._id;
    properties[3].owner = regularUser._id;
    properties[4].owner = adminUser._id;

    // Create properties
    await Property.create(properties);
    console.log('✅ Properties Created');

    // Create contacts
    await Contact.create(contacts);
    console.log('✅ Contacts Created');

    console.log('\n✨ Sample data imported successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('Admin: admin@newdayrealty.com / admin123');
    console.log('User: john@example.com / password123');
    console.log('User: jane@example.com / password123\n');

    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Property.deleteMany();
    await Contact.deleteMany();

    console.log('🗑️  Data Destroyed Successfully!');

    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Run based on command line argument
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please use: node seeder.js -i (import) or -d (delete)');
  process.exit();
}
