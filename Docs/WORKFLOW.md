# 🚀 Development Workflow Guide

**Version:** 1.0.0
**Last Updated:** November 25, 2025
**Purpose:** Step-by-step guide for effective development using Edu-Pro documentation

---

## 📚 Table of Contents

1. [Getting Started](#1-getting-started)
2. [Day-to-Day Development](#2-day-to-day-development)
3. [Feature Development Workflow](#3-feature-development-workflow)
4. [API Integration Workflow](#4-api-integration-workflow)
5. [Database Operations Workflow](#5-database-operations-workflow)
6. [Testing Workflow](#6-testing-workflow)
7. [Deployment Workflow](#7-deployment-workflow)
8. [Troubleshooting Workflow](#8-troubleshooting-workflow)

---

## 1. Getting Started

### 🎯 First Week Checklist

#### **Day 1: Understanding the System**

**Morning (2-3 hours):**

```
1. Read: Docs/DOCUMENTATION_MASTER.md
   → Understand documentation structure

2. Read: Docs/updates/UNIFIED_SYSTEM_SPECIFICATION.md
   → Executive Summary (Section 1)
   → System Architecture (Section 2)
   → User Roles & Permissions (Section 4)

   Goal: Understand WHAT the system does
```

**Afternoon (2-3 hours):**

```
3. Read: Docs/client/PHASE_PLAN.md
   → All 4 phases
   → Current status

4. Read: Docs/client/ALL_ROLES_COMPLETE.md
   → What's already built

   Goal: Understand WHERE we are in development
```

---

#### **Day 2: Environment Setup**

**Morning (3-4 hours):**

```
1. Follow: Docs/updates/TECHNOLOGY_DEVELOPMENT_GUIDE.md
   → Section 6: Environment Setup
   → Section 7: Installation Guide

2. Set up:
   ✓ Install Node.js 22.16+
   ✓ Install MongoDB 8.0+
   ✓ Clone repository
   ✓ Install dependencies
   ✓ Configure .env files

3. Run:
   npm run dev
   → Backend: http://localhost:5000
   → Frontend: http://localhost:5173
```

**Afternoon (2-3 hours):**

```
4. Test the Application:
   ✓ Register as Admin
   ✓ Create school profile
   ✓ Login as Student
   ✓ Explore dashboards

5. Verify:
   ✓ All 5 roles can login
   ✓ Protected routes work
   ✓ API calls successful
```

---

#### **Day 3: Deep Dive - Backend**

**Focus: Data & APIs**

```
1. Read: Docs/updates/DATABASE_SCHEMA_REFERENCE.md
   → Section 3: User Models
   → Section 4: Academic Models

   Take notes on:
   - Model relationships
   - Validation rules
   - Index definitions

2. Read: Docs/updates/API_ENDPOINTS_REFERENCE.md
   → Section 2: Authentication
   → Section 3-5: Admin, Student, Teacher

   Test in Postman/Thunder Client:
   - Register Admin
   - Login Admin
   - Get Profile
   - Create Student
```

---

#### **Day 4: Deep Dive - Frontend**

**Focus: Components & Structure**

```
1. Read: Docs/client/FOLDER_STRUCTURE.md
   → Understand file organization
   → Locate key files

2. Read: Docs/client/COMPONENT_GUIDE.md
   → Common components
   → Custom hooks
   → Context usage

3. Explore Code:
   - Open: client/src/components/common/Button.jsx
   - Open: client/src/hooks/useAuth.js
   - Open: client/src/services/authService.js

   Goal: Understand code patterns
```

---

#### **Day 5: First Contribution**

**Pick a Small Task**

```
1. Review: Docs/client/PHASE_PLAN.md
   → Phase 2: Feature Pages
   → Pick one simple page (e.g., Student Profile View)

2. Plan:
   - Which components needed?
   - Which API calls?
   - Which hooks?

3. Code:
   - Follow patterns in existing code
   - Use QUICK_REFERENCE.md for snippets

4. Test & Submit PR
```

---

## 2. Day-to-Day Development

### 🔄 Daily Routine

#### **Morning Standup**

```
1. Review: Docs/client/PHASE_PLAN.md
   → Check current phase tasks

2. Check: Your assigned features

3. Plan: Today's work
   - Which docs you'll need
   - Which files you'll modify
```

#### **During Development**

**Keep These Docs Open:**

```
Tab 1: Docs/QUICK_REFERENCE.md
       → Code snippets, common tasks

Tab 2: Docs/updates/API_ENDPOINTS_REFERENCE.md
       → API endpoints

Tab 3: Docs/client/COMPONENT_GUIDE.md
       → Component usage

Tab 4: Docs/updates/DATABASE_SCHEMA_REFERENCE.md
       → Data models
```

#### **Before Committing**

```
1. Checklist:
   ✓ Code follows patterns in FOLDER_STRUCTURE.md
   ✓ API calls match API_ENDPOINTS_REFERENCE.md
   ✓ Components reuse from COMPONENT_GUIDE.md
   ✓ Business logic matches UNIFIED_SYSTEM_SPECIFICATION.md

2. Test:
   ✓ Feature works
   ✓ No console errors
   ✓ Responsive design

3. Commit:
   Use conventional commits (see QUICK_REFERENCE.md)
```

---

## 3. Feature Development Workflow

### 🎨 Building a New Feature (Frontend)

#### **Step 1: Planning (30 minutes)**

```
1. Read Specification:
   Docs/updates/UNIFIED_SYSTEM_SPECIFICATION.md
   → Find your feature's business rules
   → Understand user permissions

   Example: Building "Student Attendance View"
   → Read Section 8: Attendance System
   → Note: Students can view own attendance
   → Note: Monthly summaries needed

2. Check API:
   Docs/updates/API_ENDPOINTS_REFERENCE.md
   → Find required endpoints

   Example:
   GET /students/attendance
   Query: month, year
   Response: attendance array + summary

3. Check Existing Components:
   Docs/client/COMPONENT_GUIDE.md
   → List reusable components

   Example:
   - Table component for attendance list
   - Card component for summary stats
   - Loading component
```

#### **Step 2: File Setup (15 minutes)**

```
1. Create Files:
   Based on: Docs/client/FOLDER_STRUCTURE.md

   Example:
   client/src/pages/student/Attendance.jsx
   client/src/components/student/AttendanceTable.jsx
   client/src/components/student/AttendanceSummary.jsx

2. Import Boilerplate:
   From: Docs/QUICK_REFERENCE.md
   → React component template
   → Service call pattern
   → Hook usage pattern
```

#### **Step 3: Implementation (2-4 hours)**

```
1. Build UI:
   Reference: Docs/client/COMPONENT_GUIDE.md

   import { Table, Card, Loading } from '@/components/common';

   Use documented props and patterns

2. API Integration:
   Reference: Docs/client/API_REFERENCE.md

   import { studentService } from '@/services/studentService';

   const { data, loading, error } = useApi(
     () => studentService.getAttendance({ month, year })
   );

3. State Management:
   Use patterns from existing code

   const [month, setMonth] = useState(new Date().getMonth() + 1);
   const [year, setYear] = useState(new Date().getFullYear());
```

#### **Step 4: Testing (30 minutes)**

```
1. Manual Testing:
   ✓ Login as student
   ✓ Navigate to attendance page
   ✓ Select different months
   ✓ Check data displays correctly
   ✓ Test loading states
   ✓ Test error states

2. Cross-Reference:
   Docs/updates/UNIFIED_SYSTEM_SPECIFICATION.md
   → Verify business rules are followed
```

#### **Step 5: Documentation Update (15 minutes)**

```
1. If you created reusable components:
   → Add to Docs/client/COMPONENT_GUIDE.md

2. Update Phase Plan:
   → Mark task as complete in Docs/client/PHASE_PLAN.md
```

---

### ⚙️ Building a New Feature (Backend)

#### **Step 1: Planning (30 minutes)**

```
1. Understand Requirements:
   Docs/updates/UNIFIED_SYSTEM_SPECIFICATION.md
   → Find business logic

   Example: "Library Book Issue"
   → Read Section 10: Library Management
   → Note: Fine calculation rules
   → Note: Due date logic

2. Design Data Model:
   Docs/updates/DATABASE_SCHEMA_REFERENCE.md
   → Check existing models
   → Plan relationships

   Example:
   LibraryTransaction model
   → References: Student, Book
   → Fields: issueDate, dueDate, fine

3. Plan API Endpoint:
   Docs/updates/API_ENDPOINTS_REFERENCE.md
   → Check endpoint conventions
   → Design request/response

   Example:
   POST /library/issue
   Body: { bookId, studentId, dueDate }
```

#### **Step 2: Implementation (2-4 hours)**

```
1. Create/Update Model:
   Reference: Docs/updates/DATABASE_SCHEMA_REFERENCE.md

   server/src/models/LibraryTransaction.js
   → Copy schema pattern
   → Add validation
   → Add indexes

2. Create Controller:
   Reference: Docs/updates/TECHNOLOGY_DEVELOPMENT_GUIDE.md

   server/src/controllers/libraryController.js
   → Follow existing patterns
   → Add error handling
   → Validate permissions

3. Create Route:
   server/src/routes/libraryRoutes.js
   → Add middleware
   → Map to controller

4. Update Service:
   Add business logic
   → Fine calculation
   → Availability check
```

#### **Step 3: Testing (1 hour)**

```
1. API Testing:
   Reference: Docs/server/system_tests.md

   Use Thunder Client/Postman:
   ✓ Test successful issue
   ✓ Test book unavailable
   ✓ Test invalid student
   ✓ Test permissions
   ✓ Test fine calculation

2. Database Verification:
   ✓ Check transaction created
   ✓ Check book availability updated
   ✓ Check indexes work
```

---

## 4. API Integration Workflow

### 🔌 Connecting Frontend to Backend

#### **Step 1: Verify Backend API**

```
1. Check Documentation:
   Docs/updates/API_ENDPOINTS_REFERENCE.md
   → Find your endpoint
   → Note request format
   → Note response format

2. Test in Postman:
   → Send test request
   → Verify response matches docs
   → Copy working request for reference
```

#### **Step 2: Create/Update Service**

```
1. Locate Service File:
   Docs/client/FOLDER_STRUCTURE.md

   Example:
   client/src/services/studentService.js

2. Add Method:
   Reference: Docs/client/API_REFERENCE.md

   export const studentService = {
     getAttendance: (params) =>
       api.get('/students/attendance', { params }),

     // Copy pattern from existing methods
   };
```

#### **Step 3: Use in Component**

```
1. Import Service:
   import { studentService } from '@/services/studentService';

2. Use Hook:
   Reference: Docs/client/COMPONENT_GUIDE.md → useApi hook

   const { data, loading, error, refetch } = useApi(
     () => studentService.getAttendance({ month, year }),
     [month, year]
   );

3. Handle States:
   if (loading) return <Loading />;
   if (error) return <Alert type="error">{error}</Alert>;
   return <AttendanceTable data={data} />;
```

---

## 5. Database Operations Workflow

### 💾 Working with MongoDB

#### **Step 1: Understand the Model**

```
1. Read Schema:
   Docs/updates/DATABASE_SCHEMA_REFERENCE.md
   → Find your model
   → Understand fields
   → Note relationships
   → Check validation rules

Example: Student Model
   → Has classGroup reference
   → Email must be unique
   → Gender must match school type
```

#### **Step 2: Write Query**

```
1. Reference Mongoose Patterns:
   Docs/updates/DATABASE_SCHEMA_REFERENCE.md
   → Section 9: Index Definitions
   → Use indexed fields for queries

2. Common Patterns:
   From: Docs/QUICK_REFERENCE.md

   // Find with populate
   const student = await Student.findById(id)
     .populate('classGroup')
     .populate('enrolledCourses');

   // Find with filter
   const students = await Student.find({
     schoolID: req.user.schoolID,
     grade: 10
   });
```

#### **Step 3: Handle Relationships**

```
Reference: Docs/updates/DATABASE_SCHEMA_REFERENCE.md
           → Section 2: Entity Relationship Diagram

Example: Creating a Result
   → Verify student exists
   → Verify exam exists
   → Create result with references
   → Update aggregate scores
```

---

## 6. Testing Workflow

### 🧪 Comprehensive Testing

#### **Backend API Testing**

```
1. Reference Test Cases:
   Docs/server/system_tests.md

2. Create Test Collection:
   → Register admin
   → Login admin
   → Get token
   → Test protected routes
   → Test CRUD operations
   → Test error cases

3. Verify Business Rules:
   Cross-reference: Docs/updates/UNIFIED_SYSTEM_SPECIFICATION.md
   → Test attendance deadline (8:30 PM)
   → Test classroom capacity (max 30)
   → Test gender validation for schools
   → Test fine calculation
```

#### **Frontend Testing**

```
1. Manual Testing Checklist:
   ✓ Component renders
   ✓ Loading states work
   ✓ Error states work
   ✓ Data displays correctly
   ✓ Forms validate
   ✓ API calls succeed
   ✓ Permissions enforced

2. Cross-Browser Testing:
   ✓ Chrome
   ✓ Firefox
   ✓ Edge

3. Responsive Testing:
   ✓ Desktop (1920x1080)
   ✓ Tablet (768x1024)
   ✓ Mobile (375x667)
```

---

## 7. Deployment Workflow

### 🚀 Deploy to Production

#### **Pre-Deployment Checklist**

```
Reference: Docs/updates/TECHNOLOGY_DEVELOPMENT_GUIDE.md
           → Section 11: Deployment Guide

1. Environment Variables:
   ✓ NODE_ENV=production
   ✓ Strong JWT_SECRET (32+ chars)
   ✓ MongoDB Atlas connection
   ✓ CORS configured
   ✓ Rate limiting enabled

2. Security:
   ✓ All secrets in environment
   ✓ HTTPS enabled
   ✓ Helmet configured
   ✓ Input validation active

3. Testing:
   ✓ All features tested
   ✓ No console errors
   ✓ API endpoints working
   ✓ Database optimized
```

#### **Deployment Steps**

```
1. Backend (Railway/Render):
   - Connect repository
   - Set environment variables
   - Deploy
   - Verify health endpoint: /api/v1/health

2. Frontend (Vercel/Netlify):
   - Connect repository
   - Set VITE_API_URL
   - Build and deploy
   - Test login flow

3. Database (MongoDB Atlas):
   - Create cluster
   - Set up user
   - Whitelist IPs
   - Create indexes
```

---

## 8. Troubleshooting Workflow

### 🔧 Common Issues & Solutions

#### **Issue: API Call Failing**

```
1. Check:
   ✓ Backend is running
   ✓ Endpoint URL correct
   ✓ Request format matches docs
   ✓ Authentication token present

2. Reference:
   Docs/updates/API_ENDPOINTS_REFERENCE.md
   → Verify request format
   → Check required fields

3. Debug:
   → Check browser network tab
   → Check backend console logs
   → Verify database connection
```

#### **Issue: Permissions Error (403)**

```
1. Reference:
   Docs/updates/UNIFIED_SYSTEM_SPECIFICATION.md
   → Section 4.3: Permissions Matrix

2. Check:
   ✓ User role correct
   ✓ Route middleware configured
   ✓ hasPermission() returns true

3. Fix:
   → Update role in authMiddleware
   → Add role to authorize() array
```

#### **Issue: Database Validation Error**

```
1. Reference:
   Docs/updates/DATABASE_SCHEMA_REFERENCE.md
   → Check model schema
   → Check validation rules

2. Common Causes:
   → Missing required field
   → Invalid enum value
   → Unique constraint violation
   → Type mismatch

3. Fix:
   → Match request to schema
   → Check validation in controller
```

---

## 📋 Quick Reference Workflow Cards

### **Card 1: Starting a New Feature**

```
☐ Read: updates/UNIFIED_SYSTEM_SPECIFICATION.md (business rules)
☐ Check: updates/API_ENDPOINTS_REFERENCE.md (endpoints)
☐ Review: client/COMPONENT_GUIDE.md (reusable components)
☐ Plan: File structure from FOLDER_STRUCTURE.md
☐ Code: Follow existing patterns
☐ Test: Manual + API testing
☐ Update: PHASE_PLAN.md
```

### **Card 2: Fixing a Bug**

```
☐ Reproduce: Understand the issue
☐ Reference: Relevant documentation
☐ Check: Business rules in UNIFIED_SYSTEM_SPECIFICATION.md
☐ Debug: Use browser tools + console
☐ Fix: Follow established patterns
☐ Test: Verify fix works
☐ Regression: Test related features
```

### **Card 3: Code Review**

```
☐ Check: Follows FOLDER_STRUCTURE.md patterns
☐ Verify: Business logic matches UNIFIED_SYSTEM_SPECIFICATION.md
☐ API: Matches API_ENDPOINTS_REFERENCE.md
☐ Components: Uses patterns from COMPONENT_GUIDE.md
☐ Security: Follows security guidelines
☐ Tests: Feature is tested
```

---

## 🎯 Success Metrics

Track your progress:

- [ ] Can navigate all documentation easily
- [ ] Know which doc to use for each task
- [ ] Can build a feature start-to-finish
- [ ] Can integrate APIs without issues
- [ ] Can troubleshoot independently
- [ ] Follow established patterns
- [ ] Code passes review first time

---

## 📞 Need Help?

1. **Can't find information?**
   → Check Docs/DOCUMENTATION_MASTER.md for navigation

2. **Need code examples?**
   → Check Docs/QUICK_REFERENCE.md

3. **Stuck on a feature?**
   → Review related section in updates/UNIFIED_SYSTEM_SPECIFICATION.md

4. **API not working?**
   → Double-check updates/API_ENDPOINTS_REFERENCE.md

---

**Last Updated:** November 25, 2025
**Version:** 1.0.0
**Purpose:** Enable efficient, documentation-driven development

---

**Remember: Good documentation = Faster development + Fewer bugs + Better code quality!** 📚✨
