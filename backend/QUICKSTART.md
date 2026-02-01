# 🚀 Quick Start Guide - newDay Realty Backend

## Prerequisites Check
- [ ] Node.js installed (v14+)
- [ ] MongoDB installed or MongoDB Atlas account
- [ ] Git installed

## Step 1: Install Dependencies
```bash
cd backend
npm install
```

## Step 2: Configure Environment
The `.env` file has been created with default values. Update if needed:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Change to a secure random string in production
- `FRONTEND_URL`: Your frontend URL (default: http://localhost:5173)

## Step 3: Start MongoDB
### Windows:
```bash
net start MongoDB
```

### macOS/Linux:
```bash
sudo systemctl start mongod
```

### MongoDB Atlas:
Update `MONGODB_URI` in `.env` with your Atlas connection string.

## Step 4: Start the Server
```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running in development mode
📡 Port: 5000
```

## Step 5: Test the API
Open your browser or Postman and visit:
```
http://localhost:5000
```

You should see a welcome message.

## Step 6: Create an Admin User
Use Postman or cURL to create an admin account:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@newdayrealty.com",
    "password": "admin123",
    "role": "admin"
  }'
```

Save the token from the response!

## Step 7: Test Authentication
Use the token to access protected routes:

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Common Issues & Solutions

### Issue: MongoDB Connection Error
**Solution**: Make sure MongoDB is running
```bash
# Check MongoDB status
# Windows: services.msc (look for MongoDB)
# Linux: sudo systemctl status mongod
```

### Issue: Port 5000 already in use
**Solution**: Change PORT in `.env` file or kill the process using port 5000

### Issue: JWT errors
**Solution**: Make sure JWT_SECRET is set in `.env`

## Next Steps
1. ✅ Backend is running
2. 🔗 Connect your frontend
3. 📝 Test all endpoints
4. 🎨 Customize as needed

## Useful Commands

```bash
# Install dependencies
npm install

# Start development server (auto-restart)
npm run dev

# Start production server
npm start

# View logs
# Logs are displayed in the console
```

## API Endpoints Quick Reference

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user (Protected)
- PUT `/api/auth/updatedetails` - Update user details (Protected)
- PUT `/api/auth/updatepassword` - Update password (Protected)
- GET `/api/auth/logout` - Logout (Protected)

### Properties
- GET `/api/properties` - Get all properties
- GET `/api/properties/:id` - Get single property
- POST `/api/properties` - Create property (Protected)
- PUT `/api/properties/:id` - Update property (Protected)
- DELETE `/api/properties/:id` - Delete property (Protected)
- PUT `/api/properties/:id/approve` - Approve property (Admin)
- GET `/api/properties/featured` - Get featured properties
- GET `/api/properties/search` - Search properties

### Contact
- POST `/api/contact` - Submit contact form
- GET `/api/contact` - Get all contacts (Admin)
- GET `/api/contact/:id` - Get single contact (Admin)
- PUT `/api/contact/:id/status` - Update status (Admin)
- PUT `/api/contact/:id/reply` - Reply to contact (Admin)
- DELETE `/api/contact/:id` - Delete contact (Admin)

## Support
If you encounter any issues, check:
1. MongoDB is running
2. `.env` file is configured correctly
3. All dependencies are installed
4. Port 5000 is available

---
**Happy Coding! 🎉**
