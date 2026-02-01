# newDay Realty Backend API

A comprehensive RESTful API for the newDay Realty real estate application built with Node.js, Express.js, MongoDB, and JWT authentication.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (User/Admin)
  - Secure password hashing with bcrypt
  - Token-based session management

- **Property Management**
  - CRUD operations for properties
  - Advanced search and filtering
  - Pagination support
  - Property approval workflow for admins
  - Featured properties
  - View tracking

- **Contact Management**
  - Contact form submissions
  - Admin dashboard for managing inquiries
  - Status tracking (new, read, replied, archived)
  - Reply functionality

- **Security Features**
  - Helmet.js for security headers
  - Rate limiting to prevent abuse
  - CORS configuration
  - Input validation and sanitization
  - MongoDB injection prevention

- **Error Handling**
  - Comprehensive error handling middleware
  - Custom error responses
  - Validation error handling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn

## 🛠️ Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   Edit the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/newdayrealty
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

## 🗄️ Database Setup

### Option 1: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

3. Use the connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/newdayrealty
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/newdayrealty?retryWrites=true&w=majority
   ```

## 🚀 Running the Server

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+977 9841234567",
  "address": "Kathmandu, Nepal",
  "role": "user"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update User Details
```http
PUT /api/auth/updatedetails
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "phone": "+977 9841234567",
  "address": "Lalitpur, Nepal"
}
```

#### Update Password
```http
PUT /api/auth/updatepassword
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "password123",
  "newPassword": "newpassword123"
}
```

#### Logout
```http
GET /api/auth/logout
Authorization: Bearer <token>
```

### Property Endpoints

#### Get All Properties
```http
GET /api/properties
GET /api/properties?type=Villa
GET /api/properties?minPrice=1000000&maxPrice=2000000
GET /api/properties?page=1&limit=10
```

#### Get Single Property
```http
GET /api/properties/:id
```

#### Create Property
```http
POST /api/properties
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Luxury Villa in Thamel",
  "description": "Beautiful villa with modern amenities",
  "price": 2500000,
  "type": "Villa",
  "location": "Thamel, Kathmandu",
  "address": "Thamel Marg, Kathmandu",
  "city": "Kathmandu",
  "bedrooms": 4,
  "bathrooms": 3,
  "area": 2800,
  "areaUnit": "sqft",
  "features": ["Swimming Pool", "Garden", "Parking"],
  "amenities": ["WiFi", "Security", "Gym"]
}
```

#### Update Property
```http
PUT /api/properties/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 2600000
}
```

#### Delete Property
```http
DELETE /api/properties/:id
Authorization: Bearer <token>
```

#### Approve Property (Admin Only)
```http
PUT /api/properties/:id/approve
Authorization: Bearer <token>
```

#### Get Featured Properties
```http
GET /api/properties/featured
```

#### Search Properties
```http
GET /api/properties/search?keyword=villa&city=Kathmandu&minPrice=1000000
```

### Contact Endpoints

#### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Property Inquiry",
  "message": "I'm interested in the villa in Thamel",
  "phone": "+977 9841234567"
}
```

#### Get All Contacts (Admin Only)
```http
GET /api/contact
GET /api/contact?status=new
Authorization: Bearer <token>
```

#### Get Single Contact (Admin Only)
```http
GET /api/contact/:id
Authorization: Bearer <token>
```

#### Update Contact Status (Admin Only)
```http
PUT /api/contact/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "read"
}
```

#### Reply to Contact (Admin Only)
```http
PUT /api/contact/:id/reply
Authorization: Bearer <token>
Content-Type: application/json

{
  "replyMessage": "Thank you for your inquiry. We will contact you soon."
}
```

#### Delete Contact (Admin Only)
```http
DELETE /api/contact/:id
Authorization: Bearer <token>
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. After logging in, you'll receive a token that must be included in the Authorization header for protected routes:

```
Authorization: Bearer <your_token_here>
```

## 👥 User Roles

- **User**: Can create properties (requires approval), view approved properties, update own profile
- **Admin**: Full access to all features, can approve properties, manage contacts, manage all properties

## 📝 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message here"
}
```

## 🛡️ Security Features

- **Rate Limiting**: 100 requests per 15 minutes for general API, 5 requests per 15 minutes for auth endpoints
- **Helmet.js**: Sets various HTTP headers for security
- **CORS**: Configured to allow requests only from the frontend URL
- **Password Hashing**: Passwords are hashed using bcrypt
- **JWT Expiration**: Tokens expire after 7 days (configurable)
- **Input Validation**: All inputs are validated using express-validator

## 🐛 Error Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── propertyController.js # Property management logic
│   └── contactController.js  # Contact form logic
├── middleware/
│   ├── auth.js              # Authentication middleware
│   ├── errorHandler.js      # Error handling middleware
│   └── validator.js         # Validation middleware
├── models/
│   ├── User.js              # User model
│   ├── Property.js          # Property model
│   └── Contact.js           # Contact model
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   ├── propertyRoutes.js    # Property routes
│   └── contactRoutes.js     # Contact routes
├── utils/
│   ├── errorResponse.js     # Custom error class
│   └── jwtUtils.js          # JWT utilities
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore file
├── package.json            # Dependencies
├── server.js               # Main server file
└── README.md              # This file
```

## 🧪 Testing the API

You can test the API using:
- **Postman**: Import the endpoints and test
- **Thunder Client** (VS Code extension)
- **cURL**: Command-line testing
- **Frontend Application**: Connect your React frontend

### Example cURL Request:
```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "user"
  }'
```

## 🔄 Development Workflow

1. Make changes to the code
2. Server auto-restarts (if using `npm run dev`)
3. Test endpoints using Postman or frontend
4. Check logs for any errors
5. Commit changes

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **dotenv**: Environment variables
- **cors**: CORS middleware
- **express-validator**: Input validation
- **helmet**: Security headers
- **morgan**: HTTP request logger
- **express-rate-limit**: Rate limiting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Support

For support, email info@newdayrealty.com or create an issue in the repository.

## 🎯 Next Steps

1. Install dependencies: `npm install`
2. Configure `.env` file
3. Start MongoDB
4. Run the server: `npm run dev`
5. Test the endpoints
6. Connect your frontend application

---

**Happy Coding! 🚀**
