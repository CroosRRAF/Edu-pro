# 📚 Edu-Pro School Management System

Complete MERN stack school management platform with support for Admin, Student, Teacher, Coach, and Librarian roles.

## ⚡ Quick Start

```bash
# 1. Clone repository
git clone <repository-url>
cd Edu-pro

# 2. Install dependencies
cd server && npm install
cd ../client && npm install

# 3. Set up environment variables
# Create server/.env and client/.env (see setup below)

# 4. Start MongoDB (ensure it's running)

# 5. Start both servers
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

**Default Login:** admin@school.com / admin123

## 📖 Documentation

**📌 Complete documentation is in the [`Docs/`](./Docs/) folder**

| Document                          | Description                 |
| --------------------------------- | --------------------------- |
| [SYSTEM.md](./Docs/SYSTEM.md)     | Complete system overview    |
| [SETUP.md](./Docs/SETUP.md)       | Detailed installation guide |
| [API.md](./Docs/API.md)           | Backend API reference       |
| [DATABASE.md](./Docs/DATABASE.md) | Database schemas            |
| [WORKFLOW.md](./Docs/WORKFLOW.md) | Development process         |
| [README.md](./Docs/README.md)     | Full documentation index    |

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, MongoDB, JWT, bcrypt
- **Frontend:** React 19, Vite 7, Tailwind CSS, Axios
- **Database:** MongoDB with Mongoose ODM

## 🔧 Environment Setup

### Backend (server/.env)

```env
PORT=5000
MONGO_URL=mongodb://127.0.0.1:27017/OnlineSchool
JWT_SECRET=your-secret-key-here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (client/.env)

```env
VITE_API_URL=http://localhost:5000
```

## 🎯 User Roles

- **Admin/Principal** - Complete school management
- **Teacher** - Class management, attendance, grading
- **Student** - View courses, grades, library
- **Librarian** - Book management, transactions
- **Coach** - Sports management, team organization

## 📁 Project Structure

```
Edu-pro/
├── client/          # React frontend
├── server/          # Express backend
├── Docs/            # Complete documentation
└── README.md        # This file
```

## 🔗 Links

- **Frontend:** [client/README.md](./client/README.md)
- **Backend:** [server/README.md](./server/README.md)
- **Full Docs:** [Docs/README.md](./Docs/README.md)

## 📄 License

MIT License - See [LICENSE](LICENSE) file

---

**For complete documentation, configuration, and deployment guides, see the [`Docs/`](./Docs/) directory.**
