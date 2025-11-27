# Edu-Pro LMS - Administrator User Guide

**Version:** 1.0
**Date:** November 27, 2025
**Role:** School Administrator / Principal
**Target Audience:** School Administrators, Principals, Vice-Principals

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [School Setup & Onboarding](#school-setup--onboarding)
3. [Student Management](#student-management)
4. [Teacher Management](#teacher-management)
5. [Grade & Classroom Management](#grade--classroom-management)
6. [Course Management](#course-management)
7. [Attendance Management](#attendance-management)
8. [Examination & Results](#examination--results)
9. [Library Management](#library-management)
10. [Sports Management](#sports-management)
11. [Notices & Announcements](#notices--announcements)
12. [Complaint Management](#complaint-management)
13. [Reports & Analytics](#reports--analytics)
14. [Settings & Profile](#settings--profile)
15. [FAQs & Troubleshooting](#faqs--troubleshooting)

---

## Getting Started

### Welcome to Edu-Pro LMS

Edu-Pro is a comprehensive school management system designed to streamline administrative tasks, improve communication, and enhance educational outcomes. As an administrator, you have access to all system features and can manage all aspects of your school.

### System Requirements

**Browser Requirements:**

- Google Chrome 90+ (Recommended)
- Mozilla Firefox 88+
- Microsoft Edge 90+
- Safari 14+

**Screen Resolution:**

- Minimum: 1280x720
- Recommended: 1920x1080 or higher

**Internet Connection:**

- Minimum: 5 Mbps
- Recommended: 10 Mbps or higher

### Accessing the System

1. **Navigate to Login Page**

   - Open your web browser
   - Go to: `https://your-school.edupro.com`
   - Or use your custom domain

2. **Enter Credentials**

   - Email: Your registered email address
   - Password: Your secure password
   - Click **"Login"** button

3. **First-Time Login**
   - If logging in for the first time, you'll be redirected to school setup
   - Complete onboarding wizard (See [School Setup](#school-setup--onboarding))

### Dashboard Overview

After login, you'll see the **Admin Dashboard** with:

**Key Sections:**

- **Statistics Cards**: Quick overview of students, teachers, courses, attendance
- **Recent Activity Feed**: Latest system activities
- **Notifications**: Important alerts and updates
- **Charts & Analytics**: Visual data representation
  - Attendance trends (6-month line chart)
  - Grade distribution (bar chart)
  - Book categories (donut chart)
  - Enrollment growth (area chart)

**Navigation:**

- **Sidebar Menu** (Left): Access all features
- **Header** (Top): User menu, notifications, search
- **Main Content** (Center): Current page content

---

## School Setup & Onboarding

### First-Time Setup Wizard

**⚠️ CRITICAL: This must be completed before accessing other features**

#### Step 1: School Profile Setup

1. Navigate to **"School Profile Setup"** (auto-redirect on first login)

2. **Fill in School Information:**

   ```
   School Name: [Enter full school name]
   School Type: [Select one]
     ○ Boys' School
     ○ Girls' School
     ○ Mixed School

   Address: [Enter complete address]
   Contact Number: [+94XXXXXXXXX format]
   Email: [School official email]
   Website: [Optional]

   Established Year: [YYYY]
   Registration Number: [School registration number]
   ```

3. **Select School Type** (IMPORTANT!)

   - **Boys' School**: Only male students allowed
   - **Girls' School**: Only female students allowed
   - **Mixed School**: Both male and female students allowed

   ⚠️ This affects student registration validation

4. Click **"Save School Profile"**

**Result**: School ID will be auto-generated (Format: `sch_XXXb/g/m`)

- Example: `sch_001b` (Boys' School #1)
- Example: `sch_002g` (Girls' School #2)
- Example: `sch_003m` (Mixed School #3)

#### Step 2: Principal Profile Setup

1. After school profile, you'll be redirected to **"Principal Profile"**

2. **Fill in Personal Information:**

   ```
   Full Name: [Your full name]
   NIC Number: [National ID - 12 digits]
   Date of Birth: [DD/MM/YYYY]
   Gender: [Male/Female]

   Contact Number: [+94XXXXXXXXX]
   Personal Email: [Optional - different from login]

   Qualifications: [Your highest degree]
   Experience: [Years of experience]
   ```

3. **Upload Profile Photo** (Optional)

   - Click **"Upload Photo"**
   - Select image (JPG, PNG, max 2MB)
   - Photo will be displayed in profile and header

4. Click **"Complete Setup"**

**Result**: Setup complete! You can now access all features.

---

### Editing School Profile Later

1. **Navigate**: Sidebar → School Profile
2. Click **"Edit Profile"** button
3. Modify fields as needed
4. Click **"Save Changes"**

⚠️ **Note**: School Type cannot be changed once set (prevents data inconsistency)

---

## Student Management

### Student List Overview

**Access**: Sidebar → Students → Student List

**Features:**

- Search by name, ID, or NIC
- Filter by grade, section, status
- Sort by name, admission date, etc.
- Pagination (50 students per page)
- Export to CSV, Excel, PDF

**Student Card Display:**

```
┌─────────────────────────────────────┐
│ [Photo] John Doe                    │
│         Student ID: st001b1234      │
│         Grade: 10A                  │
│         Status: Active              │
│                                     │
│ [View] [Edit] [Delete]              │
└─────────────────────────────────────┘
```

---

### Adding a New Student

#### Method 1: Single Student Registration

1. **Navigate**: Students → Create Student

2. **Step 1: Personal Information**

   ```
   Full Name: [Student's full name]
   Date of Birth: [DD/MM/YYYY]
   Gender: [Male/Female - validated against school type]
   NIC Number: [Student's NIC - 12 digits]

   Blood Group: [A+, A-, B+, B-, O+, O-, AB+, AB-]
   Religion: [Optional]
   Nationality: [Default: Sri Lankan]
   ```

3. **Step 2: Contact Information**

   ```
   Address: [Home address]
   Contact Number: [+94XXXXXXXXX]
   Email: [Optional - for older students]

   Parent/Guardian Name: [Full name]
   Parent Contact: [+94XXXXXXXXX]
   Parent Email: [parent@email.com]
   Emergency Contact: [+94XXXXXXXXX]
   ```

4. **Step 3: Academic Information**

   ```
   Grade: [Select 1-14]
   Section: [Auto-assigned based on capacity]
   Admission Date: [DD/MM/YYYY - defaults to today]
   Previous School: [Optional]
   Transfer Certificate: [Upload if applicable]
   ```

5. **Step 4: Additional Information**

   ```
   Medical Conditions: [Optional - allergies, conditions]
   Special Needs: [Optional - learning disabilities, etc.]
   Transportation: [School Bus / Private]
   ```

6. **Review & Submit**
   - Review all entered information
   - Click **"Create Student"**

**Result**:

- Student ID generated: Format `stXXXb/g/m + 4-digit counter`
- Example: `st001b1234` (School #1, Boys, Student #1234)
- Student added to selected grade/section
- Confirmation email sent to parent (if email provided)

---

#### Method 2: Bulk Import Students

1. **Navigate**: Students → Bulk Import

2. **Download Template**

   - Click **"Download CSV Template"**
   - Template includes: Name, DOB, Gender, NIC, Grade, etc.

3. **Fill Template**

   ```csv
   Full Name,Date of Birth,Gender,NIC,Grade,Section,Parent Name,Parent Contact
   John Doe,01/01/2010,Male,200012345678,10,A,Jane Doe,+94712345678
   Mary Smith,02/02/2010,Female,200023456789,10,B,Bob Smith,+94723456789
   ```

4. **Upload CSV**

   - Click **"Upload CSV"**
   - Select filled template file
   - System validates data

5. **Review Validation**

   - ✅ Valid entries: Will be imported
   - ❌ Invalid entries: Shows errors (wrong format, duplicate NIC, etc.)
   - Click **"Fix Errors"** to edit invalid rows

6. **Confirm Import**
   - Click **"Import Students"**
   - Progress bar shows import status
   - Summary report displayed

**Result**:

- Multiple students added at once
- Student IDs auto-generated
- Sections auto-assigned based on grade capacity
- Validation errors highlighted for correction

---

### Viewing Student Details

1. **From Student List**, click **"View"** on any student card

2. **Student Profile Page** shows:

   - **Profile Header**: Photo, Name, ID, Grade, Status
   - **Personal Information**: DOB, Gender, NIC, Blood Group, etc.
   - **Contact Information**: Address, Phone, Email, Parent Details
   - **Academic Information**: Enrollment date, Previous school, etc.
   - **Enrolled Courses**: List of courses student is enrolled in
   - **Attendance Record**: Monthly attendance with percentage
   - **Exam Results**: All exam results with grades and analytics
   - **Library Activity**: Issued books and transaction history
   - **Sports Participation**: Joined sports and events

3. **Quick Actions:**
   - **Edit Student**: Modify student information
   - **View Attendance**: Detailed attendance history
   - **View Results**: Complete exam results
   - **Enroll in Course**: Add student to courses
   - **Issue Book**: Quick library book issue
   - **Deactivate**: Suspend or deactivate student

---

### Editing Student Information

1. **From Student Detail Page**, click **"Edit Student"**

2. **Modify Information:**

   - Update any field except Student ID and School ID
   - NIC cannot be changed once set
   - Grade can be promoted/demoted

3. **Save Changes**
   - Click **"Save Changes"**
   - Confirmation prompt shown
   - Changes logged in activity history

⚠️ **Note**: Changing grade will move student to new section automatically

---

### Deleting a Student

1. **From Student List** or **Detail Page**, click **"Delete"**

2. **Confirmation Dialog:**

   ```
   Are you sure you want to delete John Doe (st001b1234)?

   This action will:
   - Remove student from all courses
   - Delete attendance records
   - Remove exam results
   - Remove library transactions
   - This action CANNOT be undone

   Type student ID to confirm: [_____________]

   [Cancel] [Confirm Delete]
   ```

3. **Enter Student ID** and click **"Confirm Delete"**

**Result**: Student permanently removed from system

⚠️ **Best Practice**: Use "Deactivate" instead of "Delete" to preserve historical data

---

## Teacher Management

### Teacher List Overview

**Access**: Sidebar → Teachers → Teacher List

**Features:**

- Search by name, ID, or subject
- Filter by qualification, status, assigned classes
- Sort by name, join date, etc.
- Pagination
- Export options

**Teacher Card Display:**

```
┌─────────────────────────────────────┐
│ [Photo] Jane Smith                  │
│         Teacher ID: te001b9876      │
│         Subject: Mathematics        │
│         Classes: 10A, 10B, 10C      │
│         Status: Active              │
│                                     │
│ [View] [Edit] [Assign Classes]      │
└─────────────────────────────────────┘
```

---

### Adding a New Teacher

1. **Navigate**: Teachers → Create Teacher

2. **Step 1: Personal Information**

   ```
   Full Name: [Teacher's full name]
   NIC Number: [12 digits]
   Date of Birth: [DD/MM/YYYY]
   Gender: [Male/Female]

   Contact Number: [+94XXXXXXXXX]
   Email: [teacher@email.com]
   Address: [Home address]
   ```

3. **Step 2: Professional Information**

   ```
   Qualification: [B.Sc., M.Sc., B.Ed., M.Ed., etc.]
   Specialization: [Subject/Area]
   Experience: [Years]

   Employee ID: [Optional - internal HR ID]
   Join Date: [DD/MM/YYYY]
   Employment Type: [Permanent / Contract / Part-time]
   ```

4. **Step 3: Teaching Assignment**

   ```
   Primary Subject: [Select from list]
   Secondary Subjects: [Optional - multiple selections]

   Assign Classes:
     ☑ Grade 10A - Mathematics
     ☑ Grade 10B - Mathematics
     ☐ Grade 9A - Mathematics

   Class Teacher For: [Select one class - optional]
   ```

5. **Step 4: Additional Information**

   ```
   Upload Photo: [Click to upload]
   Documents:
     - Resume/CV [Upload]
     - Certificates [Upload]
     - ID Copy [Upload]

   Notes: [Optional - internal notes]
   ```

6. Click **"Create Teacher"**

**Result**:

- Teacher ID generated: Format `teXXXb/g/m + 4-digit counter`
- Example: `te001b9876` (School #1, Boys, Teacher #9876)
- Login credentials emailed to teacher
- Assigned classes updated

---

### Assigning Classes to Teacher

1. **From Teacher Detail Page**, click **"Assign Classes"**

2. **Select Classes:**

   ```
   Available Classes:

   Grade 10:
     ☐ 10A - Mathematics (30 students)
     ☑ 10B - Mathematics (28 students)
     ☐ 10C - Mathematics (29 students)

   Grade 9:
     ☐ 9A - Mathematics (25 students)
     ☑ 9B - Mathematics (27 students)

   [Save Assignments]
   ```

3. **Set as Class Teacher** (Optional)

   - Select **one** class for teacher to be class teacher
   - Class teacher responsibilities:
     - Mark daily attendance
     - Manage classroom notices
     - Handle classroom discipline

4. Click **"Save Assignments"**

**Result**: Teacher assigned to selected classes, can now access them

---

## Grade & Classroom Management

### Grade Overview

**Access**: Sidebar → Academic → Grades

**Grades Supported**: 1 to 14

- Grades 1-9: Primary & Junior Secondary
- Grades 10-11: Senior Secondary (O-Levels)
- Grades 12-14: Advanced Level (A/L)
  - Grade 12: A/L 1st Year
  - Grade 13: A/L 2nd Year
  - Grade 14: A/L Final Year

---

### Creating a Grade

1. **Navigate**: Academic → Grades → Create Grade

2. **Grade Information:**

   ```
   Grade Number: [Select 1-14]
   Grade Name: [Auto-filled - e.g., "Grade 10"]
   Academic Year: [2025]

   Stream: [For Grades 12-14 only]
     ○ Science
     ○ Commerce
     ○ Arts
     ○ Technology

   Number of Sections: [Auto-calculated based on student count]
     - 30 students = 1 section (A)
     - 31-60 students = 2 sections (A, B)
     - 61-90 students = 3 sections (A, B, C)
     - Maximum: 5 sections (A-E)
   ```

3. **Grade Incharge (Supervisor)**

   ```
   Assign Supervisor: [Select teacher]

   Supervisor Responsibilities:
   - Oversee all classrooms in grade
   - Coordinate with class teachers
   - Manage grade-level academic activities
   ```

4. Click **"Create Grade"**

**Result**: Grade created with auto-allocated sections

---

### Bulk Grade Creation

1. **Navigate**: Academic → Grades → Create All Grades

2. **Wizard Interface:**

   ```
   Create Grades 1-14 at once

   Academic Year: [2025]

   Estimated Students per Grade:
   Grade 1-5:  [30] students each
   Grade 6-9:  [40] students each
   Grade 10-11: [50] students each
   Grade 12-14: [30] students each

   [Calculate Sections]

   Preview:
   Grade 1: 1 section (A)
   Grade 2: 1 section (A)
   ...
   Grade 10: 2 sections (A, B)
   Grade 11: 2 sections (A, B)
   ...

   [Create All Grades]
   ```

3. Click **"Create All Grades"**

**Result**: All 14 grades created with appropriate sections

---

### Classroom Management

1. **Navigate**: Academic → Classrooms

2. **Classroom List View:**

   ```
   ┌─────────────────────────────────────┐
   │ Grade 10A                           │
   │ Capacity: 30/30 (Full)              │
   │ Class Teacher: Jane Smith           │
   │                                     │
   │ [View Students] [Manage]            │
   └─────────────────────────────────────┘
   ```

3. **Classroom Details:**

   - Student list (30 students max)
   - Assigned teachers for each subject
   - Attendance statistics
   - Timetable/Schedule

4. **Auto-Allocation Rules:**
   - New students automatically assigned to sections with available capacity
   - Sections balanced to ~30 students each
   - Maximum 5 sections (A-E) per grade

---

## Course Management

### Course List Overview

**Access**: Sidebar → Academic → Courses

**Features:**

- View all courses by grade
- Filter by subject, teacher, grade
- Search by course name/code
- Course enrollment statistics

---

### Creating a Course

1. **Navigate**: Courses → Create Course

2. **Course Information:**

   ```
   Course Name: [e.g., "Mathematics - Grade 10"]
   Course Code: [e.g., "MATH10"]
   Subject: [Mathematics]
   Grade: [10]

   Description: [Course objectives and content]

   Academic Year: [2025]
   Term: [Term 1 / Term 2 / Term 3 / Full Year]
   Credits: [e.g., 4]
   ```

3. **Teacher Assignment:**

   ```
   Assign Teacher: [Select teacher]

   Co-Teachers: [Optional - additional teachers]
   ```

4. **Course Schedule:**

   ```
   Weekly Hours: [e.g., 5 periods]

   Timetable:
   Monday:    Period 1 (8:00 AM - 8:45 AM)
   Tuesday:   Period 2 (8:45 AM - 9:30 AM)
   Wednesday: Period 3 (10:00 AM - 10:45 AM)
   ...

   [Add Period]
   ```

5. **Enrollment Settings:**

   ```
   Enrollment Type:
     ○ Automatic (All students in Grade 10)
     ○ Manual (Selected students only)

   Max Students: [150] (All 10A, 10B, 10C sections)
   ```

6. Click **"Create Course"**

**Result**: Course created and visible to enrolled students

---

### Module Management (Within Course)

1. **From Course Detail Page**, click **"Modules"** tab

2. **Add Module:**

   ```
   Module Name: [e.g., "Algebra"]
   Description: [Module content overview]
   Order: [1] (sequence in course)

   Duration: [2 weeks]
   Start Date: [DD/MM/YYYY]
   End Date: [DD/MM/YYYY]

   Resources:
   - Upload PDF: [Select file]
   - Add Video Link: [YouTube/Vimeo URL]
   - Add Document: [Word/PowerPoint]

   [Save Module]
   ```

3. **Module List:**

   ```
   ┌─────────────────────────────────────┐
   │ 1. Algebra                          │
   │    Duration: 2 weeks                │
   │    Status: In Progress              │
   │    Resources: 3 PDFs, 2 videos      │
   │                                     │
   │    [Edit] [Delete] [Reorder]        │
   └─────────────────────────────────────┘
   ```

4. **Manage Module Content:**
   - Add/remove resources
   - Edit module details
   - Reorder modules
   - Track completion

---

## Attendance Management

### Attendance Overview Dashboard

**Access**: Sidebar → Attendance → Overview

**Features:**

- Monthly attendance calendar
- Class-wise attendance statistics
- Student-wise attendance reports
- Attendance trends chart
- Finalization status

---

### Viewing Class Attendance

1. **Navigate**: Attendance → Attendance Report

2. **Select Filters:**

   ```
   Grade: [Select 1-14]
   Section: [Select A-E]
   Date Range: [From DD/MM/YYYY] [To DD/MM/YYYY]

   [Generate Report]
   ```

3. **Attendance Report View:**

   ```
   Grade 10A - November 2025

   ┌──────────────────────────────────────┐
   │ Student Name    | 1  2  3  4  5  ... │
   ├──────────────────────────────────────┤
   │ John Doe        | P  P  A  P  P  ... │
   │ Mary Smith      | P  P  P  P  P  ... │
   │ Bob Johnson     | A  P  P  P  A  ... │
   │                                      │
   │ Summary:                             │
   │ Total Students: 30                   │
   │ Avg Attendance: 92%                  │
   └──────────────────────────────────────┘

   Legend: P = Present, A = Absent, L = Late

   [Export to Excel] [Print] [Email Report]
   ```

---

### Attendance Finalization

**Purpose**: Lock attendance records after deadline to prevent tampering

**Access**: Attendance → Finalization

1. **View Pending Finalizations:**

   ```
   ┌─────────────────────────────────────┐
   │ October 2025                        │
   │ Status: Pending                     │
   │ Deadline: 15th November 2025        │
   │ Days Remaining: 3                   │
   │                                     │
   │ [Finalize Now]                      │
   └─────────────────────────────────────┘
   ```

2. **Finalization Process:**

   - After 15 days, attendance auto-finalizes
   - Or manually finalize early
   - Click **"Finalize Now"**
   - Confirmation required

3. **Finalized Attendance:**

   ```
   ✅ Finalized on: 10th November 2025

   - Cannot be edited
   - Locked for integrity
   - Available for official reports
   ```

⚠️ **Important**: Finalized attendance cannot be modified. Ensure accuracy before finalizing.

---

### Student Attendance History

1. **Navigate**: Students → [Select Student] → Attendance Tab

2. **View:**

   - Monthly attendance calendar
   - Attendance percentage by month
   - Trend chart (6-month view)
   - Reason for absences (if provided)

3. **Export Options:**
   - PDF Report Card
   - Excel Spreadsheet
   - Print-friendly view

---

## Examination & Results

### Creating an Examination

**⚠️ CRITICAL: Exams must be created before teachers can enter results**

**Access**: Sidebar → Examinations → Create Exam

1. **Exam Information:**

   ```
   Exam Name: [e.g., "Mid-Term Examination 2025"]
   Exam Type: [Mid-Term / Final / Monthly Test / Quiz]
   Academic Year: [2025]
   Term: [Term 1 / Term 2 / Term 3]

   Start Date: [DD/MM/YYYY]
   End Date: [DD/MM/YYYY]

   Grades: [Select applicable grades]
     ☑ Grade 10
     ☑ Grade 11
     ☐ Grade 12
   ```

2. **Exam Schedule:**

   ```
   Add Subjects for Grade 10:

   Subject: Mathematics
   Date: 01/12/2025
   Time: 9:00 AM - 12:00 PM
   Duration: 3 hours
   Total Marks: 100

   [Add Subject]

   Subject: English
   Date: 02/12/2025
   Time: 9:00 AM - 11:00 AM
   Duration: 2 hours
   Total Marks: 100

   [Add Subject]
   ```

3. **Additional Settings:**

   ```
   Passing Marks: [35] out of 100

   Grade Scale:
   A: 75-100
   B: 65-74
   C: 55-64
   D: 35-54
   F: 0-34

   Result Publication Date: [DD/MM/YYYY]
   ```

4. Click **"Create Examination"**

**Result**:

- Exam created and visible to teachers
- Teachers can now enter results
- Exam appears in student result view (after publication)

---

### Exam List & Management

1. **Navigate**: Examinations → Exam List

2. **Exam Card View:**

   ```
   ┌─────────────────────────────────────┐
   │ Mid-Term Examination 2025           │
   │ Dates: 01/12/2025 - 05/12/2025      │
   │ Grades: 10, 11                      │
   │ Status: Scheduled                   │
   │                                     │
   │ Results Entry: 45% Complete         │
   │                                     │
   │ [View Schedule] [Edit] [Results]    │
   └─────────────────────────────────────┘
   ```

3. **Exam Actions:**
   - **View Schedule**: See detailed timetable
   - **Edit**: Modify exam details (before start date)
   - **Results**: View results entry progress
   - **Publish Results**: Make results visible to students
   - **Delete**: Remove exam (if no results entered)

---

### Viewing Results Overview

1. **Navigate**: Examinations → [Select Exam] → Results

2. **Results Dashboard:**

   ```
   Mid-Term Examination 2025 - Results Overview

   Grade 10:
   Mathematics:  Results Entered: 25/30 (83%)
   English:      Results Entered: 30/30 (100%) ✅
   Science:      Results Entered: 18/30 (60%)

   Grade 11:
   Mathematics:  Results Entered: 28/30 (93%)
   ...

   Overall Progress: 78%

   [Remind Teachers] [Export Report]
   ```

3. **Results by Student:**
   - Class-wise results table
   - Individual student performance
   - Grade distribution chart
   - Top performers list
   - Students needing attention

---

### Publishing Results

1. **From Exam Detail Page**, click **"Publish Results"**

2. **Confirmation:**

   ```
   Publish Results for Mid-Term Examination 2025?

   This will:
   - Make results visible to students
   - Send notification emails to students/parents
   - Lock results from further editing (by teachers)

   Results Entry Progress: 95%

   ⚠️ Ensure all results are entered before publishing

   [Cancel] [Publish Results]
   ```

3. Click **"Publish Results"**

**Result**:

- Results visible to students
- Email notifications sent
- Results locked (admin can still edit if needed)

---

## Library Management

### Library Dashboard

**Access**: Sidebar → Library → Dashboard

**Overview:**

- Total books in catalog
- Books issued
- Books available
- Overdue books
- Recent transactions
- Popular books chart
- Category distribution

---

### Book Catalog Management

1. **Navigate**: Library → Books List

2. **Add New Book:**

   ```
   ISBN: [978-0-XXX-XXXXX-X]
   Title: [Book title]
   Author: [Author name]
   Publisher: [Publisher name]
   Publication Year: [YYYY]

   Category: [Fiction / Non-Fiction / Reference / Textbook]
   Subject: [Mathematics / Science / History / etc.]

   Total Copies: [10]
   Available Copies: [10] (auto-calculated)

   Location: [Shelf A-12]
   Price: [Rs. 1500.00]

   Cover Image: [Upload]

   [Add Book]
   ```

3. **Book List View:**
   ```
   ┌─────────────────────────────────────┐
   │ [Cover] Advanced Mathematics        │
   │         Author: John Smith          │
   │         ISBN: 978-0-123-45678-9     │
   │         Available: 8/10             │
   │                                     │
   │ [View] [Edit] [Issue] [Delete]      │
   └─────────────────────────────────────┘
   ```

---

### Issuing Books

1. **Navigate**: Library → Issue Books

2. **Quick Issue:**

   ```
   Student ID: [Enter or scan ID]
   Book ISBN: [Enter or scan ISBN]

   Return Date: [DD/MM/YYYY] (14 days default)

   [Issue Book]
   ```

3. **Bulk Issue:**

   - Select multiple books
   - Select student
   - Set return date
   - Issue all at once

4. **Issue Confirmation:**

   ```
   ✅ Book Issued Successfully

   Student: John Doe (st001b1234)
   Book: Advanced Mathematics
   Issue Date: 27/11/2025
   Due Date: 11/12/2025

   [Print Receipt] [Issue Another]
   ```

---

### Returning Books

1. **Navigate**: Library → Return Books

2. **Quick Return:**

   ```
   Student ID or Book ISBN: [Enter or scan]

   [Search]

   Issued Books for John Doe:
   ☑ Advanced Mathematics (Due: 11/12/2025)
   ☐ English Grammar (Due: 15/12/2025)

   [Return Selected]
   ```

3. **Overdue Fine Calculation:**

   ```
   Advanced Mathematics
   Due Date: 11/12/2025
   Return Date: 27/11/2025
   Days Overdue: 0
   Fine: Rs. 0.00

   [Confirm Return]
   ```

   If overdue:

   ```
   Days Overdue: 5
   Fine: Rs. 50.00 (Rs. 10/day)

   Payment Status: [Pending / Paid]

   [Collect Fine] [Waive Fine]
   ```

---

### Overdue Books Management

1. **Navigate**: Library → Overdue Books

2. **Overdue List:**

   ```
   ┌─────────────────────────────────────┐
   │ Student: John Doe (st001b1234)      │
   │ Book: Advanced Mathematics          │
   │ Due Date: 11/12/2025                │
   │ Days Overdue: 5                     │
   │ Fine: Rs. 50.00                     │
   │                                     │
   │ [Send Reminder] [Return Book]       │
   └─────────────────────────────────────┘
   ```

3. **Send Reminder:**

   - Email to student
   - Email to parent
   - SMS notification (if configured)

4. **Bulk Actions:**
   - Send reminders to all overdue
   - Export overdue report
   - Suspend library privileges (auto after 30 days overdue)

---

## Sports Management

### Sports Dashboard

**Access**: Sidebar → Sports → Dashboard

**Overview:**

- Active sports count
- Total participants
- Upcoming events
- Recent results
- Sports statistics chart

---

### Creating a Sport

1. **Navigate**: Sports → Create Sport

2. **Sport Information:**

   ```
   Sport Name: [e.g., "Cricket"]
   Category: [Team Sport / Individual / Both]

   Description: [Sport description and rules]

   Coaches:
     Primary Coach: [Select coach]
     Assistant Coach: [Optional]

   Facilities Required:
     ☑ Cricket Ground
     ☐ Indoor Hall
     ☐ Swimming Pool

   Max Participants: [50]
   Min Age: [10]
   Gender: [Boys / Girls / Mixed]
   ```

3. **Practice Schedule:**

   ```
   Days:
     ☑ Monday
     ☐ Tuesday
     ☑ Wednesday
     ☑ Friday

   Time: 3:00 PM - 5:00 PM
   Venue: Main Cricket Ground
   ```

4. Click **"Create Sport"**

**Result**: Sport created and visible for student enrollment

---

### Managing Sports Participants

1. **Navigate**: Sports → [Select Sport] → Participants

2. **Add Participant:**

   ```
   Search Student: [Type name or ID]

   John Doe - Grade 10A
   [Add to Cricket Team]

   Position/Role: [Batsman / Bowler / All-rounder]
   Skill Level: [Beginner / Intermediate / Advanced]

   [Confirm]
   ```

3. **Participant List:**
   ```
   ┌─────────────────────────────────────┐
   │ John Doe - Grade 10A                │
   │ Role: Batsman                       │
   │ Joined: 15/09/2025                  │
   │ Attendance: 85%                     │
   │                                     │
   │ [View Stats] [Remove]               │
   └─────────────────────────────────────┘
   ```

---

### Creating Sports Events

1. **Navigate**: Sports → Events → Create Event

2. **Event Information:**

   ```
   Event Name: [e.g., "Inter-House Cricket Tournament"]
   Sport: [Cricket]
   Event Type: [Tournament / Match / Practice / Trial]

   Date: [DD/MM/YYYY]
   Start Time: [9:00 AM]
   End Time: [5:00 PM]

   Venue: [Main Cricket Ground]

   Teams:
     Team 1: Red House
     Team 2: Blue House

   Max Participants: [22] (11 per team)
   ```

3. **Event Settings:**

   ```
   Registration Deadline: [DD/MM/YYYY]

   Spectators Allowed: [Yes / No]
   Live Streaming: [Yes / No]

   Prizes:
   Winner: [Gold Trophy + Rs. 5000]
   Runner-up: [Silver Trophy + Rs. 3000]
   ```

4. Click **"Create Event"**

**Result**: Event created, students can register, coaches notified

---

### Entering Event Results

1. **Navigate**: Sports → Events → [Select Event] → Results

2. **Enter Scores:**

   ```
   Inter-House Cricket Tournament
   Date: 15/12/2025

   Team 1 (Red House):
   Score: [145/7] in [20] overs

   Team 2 (Blue House):
   Score: [132/10] in [18.3] overs

   Winner: Red House

   Man of the Match: John Doe (Red House)
   Performance: 45 runs, 2 wickets

   [Save Results]
   ```

3. **Publish Results:**
   - Results visible to students
   - Notification sent to participants
   - Stats updated in participant profiles

---

## Notices & Announcements

### Creating a Notice

**Access**: Sidebar → Notices → Create Notice

1. **Notice Information:**

   ```
   Title: [e.g., "Sports Day - 15th December"]

   Content: [Use rich text editor]
   - Bold, italic, underline
   - Bullet points, numbered lists
   - Insert images
   - Add attachments

   Priority:
     ○ Low (Blue)
     ○ Medium (Yellow)
     ● High (Red)

   Target Audience:
     ☑ All Students
     ☐ Grade 10 Only
     ☐ Teachers
     ☐ Parents
   ```

2. **Attachments:**

   ```
   Add Files: [Click to upload]
   - PDF, Word, Excel, Images
   - Max 10 MB per file
   - Max 5 files

   Uploaded:
   ✅ sports_day_schedule.pdf (2.3 MB)

   [Upload More]
   ```

3. **Publishing Options:**

   ```
   Publish Date: [DD/MM/YYYY HH:MM]
     ○ Publish Now
     ● Schedule for Later

   Expiry Date: [DD/MM/YYYY]

   Notifications:
     ☑ Email Notification
     ☑ In-App Notification
     ☐ SMS Notification
   ```

4. Click **"Publish Notice"**

**Result**:

- Notice published to dashboard
- Email/notifications sent
- Visible in notice board
- Parents can view (if targeted)

---

### Notice List & Management

1. **Navigate**: Notices → Notice List

2. **Filter Options:**

   ```
   Status: [All / Active / Expired / Draft]
   Priority: [All / Low / Medium / High]
   Date Range: [From] - [To]

   [Apply Filters]
   ```

3. **Notice Card:**

   ```
   ┌─────────────────────────────────────┐
   │ 🔴 Sports Day - 15th December       │
   │ Published: 27/11/2025 10:00 AM      │
   │ Target: All Students                │
   │ Views: 245 | Attachments: 1         │
   │                                     │
   │ [View] [Edit] [Delete] [Republish]  │
   └─────────────────────────────────────┘
   ```

4. **Actions:**
   - **View**: See full notice with analytics
   - **Edit**: Modify content (updates for all viewers)
   - **Delete**: Remove notice
   - **Republish**: Resend notifications

---

## Complaint Management

### Complaint Dashboard

**Access**: Sidebar → Complaints → Dashboard

**Overview:**

- Total complaints
- Pending complaints
- In-review complaints
- Resolved complaints
- Average resolution time
- Complaint trends chart

---

### Viewing Complaints

1. **Navigate**: Complaints → Complaint List

2. **Filter Options:**

   ```
   Status:
     ○ All
     ○ Pending
     ○ In Review
     ○ Resolved

   Priority:
     ○ All
     ○ Low
     ○ Medium
     ○ High

   Category:
     ○ All
     ○ Academic
     ○ Infrastructure
     ○ Transport
     ○ Bullying
     ○ Other

   Date Range: [From] - [To]

   [Apply Filters]
   ```

3. **Complaint Card:**
   ```
   ┌─────────────────────────────────────┐
   │ 🔴 Complaint #C12345                │
   │ From: John Doe (Student)            │
   │ Category: Bullying                  │
   │ Status: Pending                     │
   │ Submitted: 26/11/2025 2:30 PM       │
   │                                     │
   │ [View Details] [Respond]            │
   └─────────────────────────────────────┘
   ```

---

### Responding to Complaints

1. **Click** on complaint to view details

2. **Complaint Detail View:**

   ```
   Complaint #C12345
   From: John Doe - Grade 10A (st001b1234)

   Category: Bullying
   Priority: High
   Status: Pending

   Description:
   "I am being bullied by classmates during lunch break..."

   Attachments:
   - screenshot.png

   Timeline:
   - 26/11/2025 2:30 PM: Complaint submitted
   ```

3. **Take Action:**

   ```
   Change Status:
     ○ Pending
     ● In Review
     ○ Resolved

   Assign To:
     [Select staff member]
     e.g., Counselor, Security Head

   Internal Notes:
   [For staff only - not visible to complainant]

   Response to Complainant:
   [This will be sent to student/parent]

   "Thank you for bringing this to our attention.
   We are investigating the matter and will take
   appropriate action..."

   [Save & Send Response]
   ```

4. **Follow-up:**

   ```
   Add Follow-up:
   Date: [DD/MM/YYYY]
   Note: [Action taken, next steps]

   [Save Follow-up]
   ```

---

### Resolving Complaints

1. **From Complaint Detail**, change status to **"Resolved"**

2. **Resolution Summary:**

   ```
   Resolution Details:

   Actions Taken:
   - Met with student and parents
   - Counseling session conducted
   - Disciplinary action against bullies
   - Increased supervision during breaks

   Resolution Date: [DD/MM/YYYY]

   Resolution Notes:
   [Summary of resolution]

   ☑ Send resolution email to complainant
   ☑ Close complaint

   [Resolve Complaint]
   ```

3. **Confirmation:**

   ```
   ✅ Complaint Resolved

   Student/Parent notified via email
   Complaint closed
   Resolution time: 3 days
   ```

---

## Reports & Analytics

### Report Builder

**Access**: Sidebar → Reports → Report Builder

1. **Select Report Type:**

   ```
   Pre-configured Templates:

   Academic Reports:
   - Attendance Summary
   - Exam Results Analysis
   - Student List
   - Course Enrollment

   Administrative Reports:
   - Teacher List
   - Staff Directory

   Library Reports:
   - Book Catalog
   - Transaction History
   - Overdue Books

   Sports Reports:
   - Participant List
   - Event Results

   Custom Report:
   - Build your own
   ```

2. **Customize Report:**

   ```
   Report: Attendance Summary

   Filters:
   Grade: [10]
   Section: [A]
   Date Range: [01/09/2025] - [30/11/2025]

   Columns:
     ☑ Student Name
     ☑ Student ID
     ☑ Total Days
     ☑ Present Days
     ☑ Absent Days
     ☑ Percentage
     ☐ Late Days

   Sort By: [Percentage] [Ascending / Descending]

   [Preview Report]
   ```

3. **Export Options:**

   ```
   Export Format:
     ○ PDF
     ○ Excel (XLSX)
     ○ CSV
     ○ Print

   [Export]
   ```

---

### Dashboard Analytics

1. **Navigate**: Dashboard (Home)

2. **Key Metrics:**

   ```
   ┌─────────────────────────────────────┐
   │ 👥 Total Students: 450              │
   └─────────────────────────────────────┘

   ┌─────────────────────────────────────┐
   │ 👨‍🏫 Total Teachers: 35               │
   └─────────────────────────────────────┘

   ┌─────────────────────────────────────┐
   │ 📚 Active Courses: 28                │
   └─────────────────────────────────────┘

   ┌─────────────────────────────────────┐
   │ 📊 Avg Attendance: 92%               │
   └─────────────────────────────────────┘
   ```

3. **Charts:**

   - **Attendance Trend** (Line Chart): 6-month attendance percentage
   - **Grade Distribution** (Bar Chart): Students by grade
   - **Book Categories** (Donut Chart): Library catalog breakdown
   - **Enrollment Growth** (Area Chart): Student enrollment over time

4. **Recent Activity Feed:**
   ```
   📌 New student registered: Mary Smith
   📝 Notice published: Holiday Schedule
   📖 Book issued: Advanced Mathematics
   ⚽ Sports event created: Cricket Tournament
   ```

---

## Settings & Profile

### School Settings

**Access**: Header → Settings Icon → School Settings

1. **General Settings:**

   ```
   School Name: [Current name]
   Email: [school@email.com]
   Phone: [+94XXXXXXXXX]
   Address: [Current address]
   Website: [www.school.edu]

   Time Zone: [Asia/Colombo]
   Academic Year Start: [January / April / September]

   [Save Changes]
   ```

2. **Notification Settings:**

   ```
   Email Notifications:
     ☑ Student Registration
     ☑ Exam Results Published
     ☑ Attendance Reports
     ☑ Overdue Library Books

   SMS Notifications:
     ☐ Emergency Alerts Only
     ☐ All Notifications

   [Save Preferences]
   ```

3. **Security Settings:**

   ```
   Session Timeout: [30] minutes

   Password Policy:
     ☑ Minimum 8 characters
     ☑ Require uppercase
     ☑ Require numbers
     ☑ Require special characters

   Two-Factor Authentication:
     ○ Disabled
     ○ Optional
     ● Required for Admins

   [Save Security Settings]
   ```

---

### Profile Management

1. **Access**: Header → User Icon → My Profile

2. **View/Edit Profile:**

   ```
   Profile Photo: [Upload new photo]

   Name: [Your name]
   Email: [your@email.com]
   Contact: [+94XXXXXXXXX]

   Role: Principal
   Admin ID: adm0001

   [Update Profile]
   ```

3. **Change Password:**

   ```
   Current Password: [••••••••]
   New Password: [••••••••]
   Confirm Password: [••••••••]

   [Change Password]
   ```

4. **Activity Log:**

   ```
   Recent Activity:
   - 27/11/2025 10:30 AM: Created student Mary Smith
   - 27/11/2025 10:15 AM: Published notice
   - 26/11/2025 3:45 PM: Updated attendance

   [View All Activity]
   ```

---

## FAQs & Troubleshooting

### Common Questions

**Q1: How do I recover a forgotten password?**

A: Click "Forgot Password" on login page → Enter email → Check email for reset link → Create new password

**Q2: Can I change school type after setup?**

A: No, school type (Boys/Girls/Mixed) cannot be changed once set. This prevents data inconsistency. Contact support if absolutely necessary.

**Q3: How many sections can a grade have?**

A: Maximum 5 sections (A, B, C, D, E). Each section can have up to 30 students.

**Q4: Can I edit finalized attendance?**

A: No, finalized attendance is locked. Contact system administrator for emergency corrections.

**Q5: How do I export data?**

A: Most lists have "Export" button → Select format (CSV, Excel, PDF) → Download

**Q6: Can students see draft exams?**

A: No, only published exams are visible to students. Draft/scheduled exams are admin-only.

**Q7: What happens to student data when they graduate?**

A: Student data is retained in "Graduated" status. Can be archived or deleted as per school policy.

**Q8: How do I bulk delete students?**

A: Not supported. Students must be deleted individually to prevent accidental data loss. Use "Deactivate" for bulk status changes.

**Q9: Can teachers delete students?**

A: No, only administrators can delete students. Teachers have view/edit access only.

**Q10: How do I get technical support?**

A: Click "Help" icon → Submit Support Ticket → Or email support@edupro.com

---

### Troubleshooting

**Issue: Cannot login**

✅ **Solution:**

1. Verify email and password
2. Check Caps Lock is off
3. Clear browser cache and cookies
4. Try "Forgot Password" to reset
5. Contact IT support if still unable to login

**Issue: Page loads slowly**

✅ **Solution:**

1. Check internet connection
2. Clear browser cache
3. Try different browser
4. Close unnecessary tabs
5. Refresh page (F5 or Ctrl+R)

**Issue: Export not working**

✅ **Solution:**

1. Check browser pop-up blocker
2. Enable downloads in browser settings
3. Try different export format
4. Reduce data size by applying filters
5. Try different browser

**Issue: Images not uploading**

✅ **Solution:**

1. Check file size (max 2MB for photos)
2. Check file format (JPG, PNG only)
3. Try compressing image
4. Check internet connection
5. Try different image

**Issue: Email notifications not received**

✅ **Solution:**

1. Check spam/junk folder
2. Verify email address in profile
3. Check notification settings enabled
4. Whitelist noreply@edupro.com
5. Contact support if persistent

**Issue: Dashboard charts not loading**

✅ **Solution:**

1. Refresh page
2. Clear browser cache
3. Check internet connection
4. Try different browser
5. Report to support if persistent

**Issue: Student ID not generating**

✅ **Solution:**

1. Ensure school profile is complete
2. Check school type is set
3. Verify student details are complete
4. Refresh page and try again
5. Contact support if error persists

---

## Keyboard Shortcuts

### Global Shortcuts

| Shortcut      | Action                               |
| ------------- | ------------------------------------ |
| `Ctrl + /`    | Open search                          |
| `Ctrl + K`    | Quick navigation                     |
| `Esc`         | Close modal/dialog                   |
| `Ctrl + S`    | Save current form (where applicable) |
| `Tab`         | Navigate forward through fields      |
| `Shift + Tab` | Navigate backward through fields     |

### List View Shortcuts

| Shortcut        | Action              |
| --------------- | ------------------- |
| `Arrow Up/Down` | Navigate list items |
| `Enter`         | Open selected item  |
| `Ctrl + F`      | Find in page        |

### Form Shortcuts

| Shortcut       | Action            |
| -------------- | ----------------- |
| `Ctrl + Enter` | Submit form       |
| `Esc`          | Cancel/Close form |

---

## Best Practices

### For Administrators

1. **Regular Backups**: Export important data weekly
2. **Attendance Monitoring**: Review attendance weekly, finalize monthly
3. **Result Verification**: Verify results before publishing
4. **Communication**: Use notices for important announcements
5. **Data Cleanup**: Archive old data annually
6. **Security**: Change password every 90 days
7. **Training**: Train teachers on system usage
8. **Support**: Respond to complaints within 48 hours
9. **Planning**: Schedule exams in advance
10. **Analytics**: Review dashboard metrics monthly

### Data Management

- **Backup Important Data**: Export critical lists monthly
- **Verify Before Delete**: Always confirm before deleting
- **Use Filters**: Filter data before exporting for better performance
- **Regular Cleanup**: Archive old notices, complaints, attendance
- **Consistent Naming**: Use clear, consistent names for courses, exams
- **Documentation**: Keep record of major system changes

### Communication

- **Clear Notices**: Write clear, concise notices with relevant details
- **Timely Responses**: Respond to complaints within 24-48 hours
- **Use Categories**: Properly categorize notices and complaints
- **Attachments**: Always attach relevant documents (schedules, forms)
- **Follow-up**: Follow up on resolved complaints after 1 week

---

## Getting Help

### Support Channels

**1. In-App Help**

- Click "?" icon in header
- Access context-sensitive help
- View video tutorials

**2. Email Support**

- support@edupro.com
- Response time: 24 hours

**3. Phone Support**

- +94 11 123 4567
- Monday-Friday, 9 AM - 5 PM

**4. Knowledge Base**

- https://help.edupro.com
- Tutorials, guides, FAQs

**5. Community Forum**

- https://community.edupro.com
- Ask questions, share tips

### Reporting Issues

**To Report a Bug:**

1. Click "Report Issue" in header
2. Describe the issue clearly
3. Include steps to reproduce
4. Attach screenshots if relevant
5. Submit ticket

**To Request a Feature:**

1. Click "Feature Request" in header
2. Describe desired feature
3. Explain use case
4. Submit request

---

## Conclusion

Congratulations! You now have a comprehensive understanding of the Edu-Pro LMS administrator features. This guide covers all major functionalities available to school administrators.

**Remember:**

- Regular practice improves efficiency
- Explore features to discover capabilities
- Keep data backed up
- Maintain security best practices
- Don't hesitate to contact support

**Next Steps:**

1. Complete school profile if not done
2. Import students and teachers
3. Set up courses and grades
4. Configure attendance system
5. Train staff on system usage

For detailed developer documentation, API reference, and advanced features, refer to the technical documentation in the `/Docs` folder.

---

**Document Version:** 1.0
**Last Updated:** November 27, 2025
**For:** Edu-Pro LMS v1.0
**Feedback:** documentation@edupro.com

---

**© 2025 Edu-Pro Learning Management System. All rights reserved.**
