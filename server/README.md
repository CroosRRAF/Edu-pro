# Edu-Pro Backend

Enterprise Node.js/Express API for school management system with MongoDB.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB connection and JWT secret

# Ensure MongoDB is running

# Start development server
npm run dev

# Server runs at http://localhost:5000
```

**Prerequisites:** Node.js >= 16, MongoDB >= 5.0

## 🛠️ Tech Stack

- **Node.js 22.16** - Runtime
- **Express 4.19.2** - Web framework
- **MongoDB 8.0** - Database
- **Mongoose 8.16.1** - ODM
- **JWT 9.0.2** - Authentication
- **bcrypt 6.0.0** - Password hashing
- **Helmet 8.1.0** - Security headers

## 📁 Structure

```
server/
├── src/
│   ├── config/          # Database & configs
│   ├── models/          # 15 Mongoose models
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   ├── middlewares/     # Auth, errors, rate limiting
│   ├── utils/           # Helper functions
│   ├── app.js           # Express app
│   └── server.js        # Entry point
├── .env                 # Environment variables
└── package.json
```

## 🔧 Environment Setup

Create `.env` file:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URL=mongodb://127.0.0.1:27017/OnlineSchool
# Or MongoDB Atlas:
# MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/OnlineSchool

# JWT
JWT_SECRET=generate-strong-secret-with-openssl-rand-base64-64
JWT_EXPIRES_IN=24h

# Frontend
FRONTEND_URL=http://localhost:5173

# Rate Limiting (optional)
DISABLE_RATE_LIMITING=false
UPSTASH_REDIS_REST_URL=your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
```

**Generate JWT Secret:**

```bash
openssl rand -base64 64
```

## 📜 Scripts

| Command        | Description                       |
| -------------- | --------------------------------- |
| `npm run dev`  | Start with nodemon (auto-restart) |
| `npm start`    | Start production server           |
| `npm run lint` | Check code quality                |

## 🗄️ Database Models (15 total)

### User Models

- Admin, Student, Teacher, Coach, Librarian

### Academic Models

- ClassGroup, Course, Module, Attendance, Exam, Result

### Other Models

- Notice, Complain, Book, LibraryTransaction, Sport

## 🔌 API Endpoints

**Base URL:** `http://localhost:5000/api/v1`

### Authentication

```
POST /auth/admin/login
POST /auth/student/login
POST /auth/teacher/login
POST /auth/coach/login
POST /auth/librarian/login
```

### Admin Endpoints (Protected)

```
GET    /admin/students
POST   /admin/students
PUT    /admin/students/:id
DELETE /admin/students/:id

# Similar for: teachers, courses, sports, books, etc.
```

### Student Endpoints (Protected)

```
GET /students/dashboard
GET /students/courses
GET /students/attendance
GET /students/results
```

### Teacher Endpoints (Protected)

```
GET  /teachers/classes
POST /teachers/attendance
POST /teachers/results
```

**Complete API reference:** [`../Docs/API.md`](../Docs/API.md)

## 🔐 Authentication

- JWT token-based auth
- Tokens valid for 24 hours
- Password hashing with bcrypt (10 rounds)
- Role-based access control

**Header format:**

```
Authorization: Bearer <jwt_token>
```

## 📖 Documentation

**Complete documentation:** [`../Docs/`](../Docs/)

| Document                           | Description            |
| ---------------------------------- | ---------------------- |
| [API.md](../Docs/API.md)           | Complete API reference |
| [DATABASE.md](../Docs/DATABASE.md) | Database schemas       |
| [SYSTEM.md](../Docs/SYSTEM.md)     | System overview        |
| [SETUP.md](../Docs/SETUP.md)       | Detailed setup guide   |
| [SECURITY.md](../Docs/SECURITY.md) | Security practices     |

## 🚀 Deployment

### MongoDB Atlas

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster (free tier available)
3. Whitelist IP addresses
4. Get connection string
5. Update `MONGO_URL` in `.env`

### Heroku

```bash
heroku create your-app-name
heroku config:set MONGO_URL="your-mongodb-url"
heroku config:set JWT_SECRET="your-secret"
git push heroku Docs
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "src/server.js"]
```

## 🔒 Security Checklist

- [ ] Strong JWT secret (64+ characters)
- [ ] MongoDB authentication enabled
- [ ] `NODE_ENV=production`
- [ ] HTTPS/SSL enabled
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Regular security audits (`npm audit`)
- [ ] Environment variables secured

## 🐛 Troubleshooting

**MongoDB connection error:** Ensure MongoDB is running

```bash
# Windows: Check MongoDB service
# Linux/Mac: sudo systemctl status mongod
```

**Port 5000 in use:** Change PORT in `.env` or kill process

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <process_id> /F

# Linux/Mac
lsof -ti:5000 | xargs kill
```

**JWT errors:** Verify `JWT_SECRET` is set in `.env`

## 📄 License

MIT License

---

**For complete system documentation, see [`../Docs/README.md`](../Docs/README.md)**
