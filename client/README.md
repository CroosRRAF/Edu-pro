# Edu-Pro Frontend

Modern React application for school management system with 5 user roles.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env: VITE_API_URL=http://localhost:5000

# Start development server
npm run dev

# Open http://localhost:5173
```

**Prerequisites:** Node.js >= 16, Backend running on port 5000

## 🛠️ Tech Stack

- **React 19.1.0** - UI library
- **Vite 7.0.0** - Build tool
- **Tailwind CSS 3.4.17** - Styling
- **React Router 7.6.3** - Routing
- **Axios 1.10.0** - HTTP client
- **Lucide React** - Icons
- **Framer Motion** - Animations

## 📁 Structure

```
client/
├── src/
│   ├── components/      # UI components
│   │   ├── common/      # Button, Input, Modal, etc.
│   │   └── layout/      # Header, Sidebar
│   ├── pages/           # Dashboard pages
│   ├── services/        # API calls
│   ├── hooks/           # Custom hooks
│   ├── contexts/        # State management
│   ├── utils/           # Helpers
│   └── constants/       # Config
├── public/              # Static assets
└── .env                 # Environment variables
```

## 🔧 Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

## 📜 Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start dev server (port 5173) |
| `npm run build`   | Build for production         |
| `npm run preview` | Preview production build     |
| `npm run lint`    | Check code quality           |

## 👥 User Roles

1. **Admin** - School management, user management
2. **Teacher** - Classes, attendance, grading
3. **Student** - Courses, grades, library
4. **Librarian** - Books, transactions, fines
5. **Coach** - Sports, teams, events

## 📱 Features

- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Responsive design
- ✅ Dark/Light mode
- ✅ Form validation
- ✅ Loading states
- ✅ Toast notifications
- ✅ Accessibility support

## 📖 Documentation

**Complete documentation:** [`../Docs/`](../Docs/)

| Document                                     | Description          |
| -------------------------------------------- | -------------------- |
| [COMPONENTS.md](../Docs/COMPONENTS.md)       | UI component guide   |
| [CLIENT-API.md](../Docs/CLIENT-API.md)       | Service usage        |
| [WORKFLOW.md](../Docs/WORKFLOW.md)           | Development process  |
| [ACCESSIBILITY.md](../Docs/ACCESSIBILITY.md) | WCAG compliance      |
| [SETUP.md](../Docs/SETUP.md)                 | Detailed setup guide |

## 🚀 Deployment

```bash
# Build
npm run build

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

## 🔒 Security

- JWT token authentication
- Protected routes
- Input validation
- XSS protection
- CORS configuration

## 🐛 Troubleshooting

**Port 5173 in use:** Change port in `vite.config.js`

**API calls failing:** Check backend is running and `VITE_API_URL` is correct

**Build errors:** Clear cache with `rm -rf dist .vite && npm run build`

## 📄 License

MIT License

---

**For complete system documentation, see [`../Docs/README.md`](../Docs/README.md)**
