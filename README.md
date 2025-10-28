# School Management System

A comprehensive web application for managing school operations including student registration, course management, sports activities, library management, attendance tracking, and academic results.

## 🚀 Features

### For Students

- **Dashboard**: View personal information, courses, and activities
- **Course Management**: Enroll in courses and track progress
- **Sports**: Join sports teams and view schedules
- **Library**: Browse and borrow books
- **Attendance**: View attendance records
- **Results**: Check academic performance and grades

### For Administrators

- **Comprehensive Dashboard**: Overview of all school operations
- **Student Management**: Add, edit, and manage student records
- **Course Management**: Create and manage courses
- **Sports Management**: Organize sports teams and activities
- **Library Management**: Manage book inventory and borrowing
- **Attendance Tracking**: Monitor student attendance
- **Results Management**: Record and manage academic results
- **Coach Management**: Manage sports coaches

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection

### Frontend

- **React.js** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Framer Motion** - Animations
- **React Hook Form** - Form handling

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd school-management-system
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. Environment Setup

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/OnlineSchool
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development

# Optional: Upstash Redis for rate limiting
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

### 4. Database Setup

Make sure MongoDB is running on your system, then seed the database:

```bash
cd server
npm run seed
```

This will create:

- Admin accounts with different permission levels
- Sample students, courses, sports, books, etc.
- Test data for all modules including attendance and results

### 5. Start the Application

```bash
# Start backend server
cd server
npm run dev

# Start frontend (in a new terminal)
cd client
npm run dev
```

## 🔐 Default Login Credentials

After seeding the database, you can use these credentials:

### Admin Accounts

- **Super Admin**: `admin@school.com` / `admin123`
- **Moderator**: `moderator@school.com` / `moderator123`

### Student Account

- **Student**: `john.brown@example.com` / `password123`

## 📁 Project Structure

```
school-management-system/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Static assets
│   └── public/            # Public assets
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── middlewares/   # Custom middlewares
│   │   ├── models/        # Database models
│   │   └── routes/        # API routes
│   └── seed.js           # Database seeding script
└── docs/                 # Documentation
```

## 🔧 Available Scripts

### Backend

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

### Frontend

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔐 Admin Setup & Permissions

### Admin Roles

- **super_admin**: Full access to all features
- **admin**: Standard admin access
- **moderator**: Limited access based on permissions

### Permission System

Each admin has granular permissions for:

- `students`: view, create, edit, delete
- `courses`: view, create, edit, delete
- `sports`: view, create, edit, delete
- `library`: view, create, edit, delete
- `attendance`: view, create, edit, delete
- `results`: view, create, edit, delete
- `coaches`: view, create, edit, delete

### JWT Token Configuration

- Tokens are valid for 24 hours (configurable)
- Include admin ID, role, and permissions
- Required for all protected admin routes

### Rate Limiting

The application includes configurable rate limiting:

- Default: 10 requests per 20 seconds per IP
- Uses Upstash Redis (optional, falls back gracefully)
- Can be disabled in development with `DISABLE_RATE_LIMITING=true`

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with salt rounds
- **Rate Limiting** - API protection against abuse
- **CORS Protection** - Cross-origin request handling
- **Security Headers** - Helmet.js for security headers
- **Input Validation** - Request data validation
- **Error Handling** - Comprehensive error management

## 📊 API Documentation

The API includes endpoints for:

### Authentication

- `POST /api/admin/login` - Admin login
- `POST /api/auth/login` - Student login
- `POST /api/auth/register` - Student registration

### Admin Management Endpoints

- `GET /api/admin/dashboard` - Dashboard overview
- `GET /api/admin/students` - Get all students
- `POST /api/admin/students` - Create new student
- `PUT /api/admin/students/:id` - Update student
- `DELETE /api/admin/students/:id` - Delete student
- `GET /api/admin/courses` - Get all courses
- `POST /api/admin/courses` - Create new course
- `GET /api/admin/sports` - Get all sports
- `GET /api/admin/books` - Get all books
- `GET /api/admin/attendance` - Get attendance records
- `GET /api/admin/results` - Get academic results
- `GET /api/admin/coaches` - Get all coaches

### Student Endpoints

- `GET /api/students/profile` - Get student profile
- `PUT /api/students/profile` - Update student profile
- `POST /api/students/courses/enroll` - Enroll in course
- `POST /api/students/sports/join` - Join sport
- `GET /api/students/:id/dashboard` - Get student dashboard data

For detailed API documentation, see the individual route files or use tools like Postman.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 📝 Changelog

### Recent Updates

- **Documentation Cleanup**: Consolidated setup and admin documentation into main README
- **Fixed React Rendering Issues**: Resolved object rendering errors in admin dashboard
- **Database Schema Updates**: Updated models to match frontend expectations
- **Security Enhancements**: Added rate limiting, CORS protection, and security headers

---

**Note**: This is a practice project for learning purposes. For production use, ensure proper security measures and testing.
