# Edu-Pro LMS - Librarian User Guide

**Version:** 1.0
**Date:** November 27, 2025
**Role:** Librarian
**Target Audience:** School Librarians, Library Assistants

---

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Dashboard Overview](#dashboard-overview)
4. [Book Catalog Management](#book-catalog-management)
5. [Issuing & Returning Books](#issuing--returning-books)
6. [Transaction Management](#transaction-management)
7. [Member Management](#member-management)
8. [Reports & Analytics](#reports--analytics)
9. [Library Settings](#library-settings)
10. [Best Practices](#best-practices)
11. [FAQs](#faqs)

---

## Introduction

### Welcome, Librarian!

Edu-Pro LMS library module helps you:

- 📚 Manage book catalog efficiently
- 📖 Issue and return books quickly
- 👥 Track member borrowing history
- 💰 Manage fines and payments
- 📊 Generate reports and analytics
- 🔍 Search and organize inventory

---

## Getting Started

### Logging In

```
URL: https://your-school.edupro.com

Email: [your.email@school.edu]
Password: [your password]

[Login]
```

**First-Time Setup:**

- Change your password
- Complete your profile
- Configure library settings
- Review book catalog

---

## Dashboard Overview

### Library Dashboard

**1. Welcome Section**

```
┌──────────────────────────────────────┐
│ Welcome back, Librarian! 👋          │
│ School Library Management            │
└──────────────────────────────────────┘
```

**2. Quick Stats**

```
┌───────────────┐ ┌───────────────┐
│ 📚 Total Books│ │ 📖 Available  │
│ 1,245         │ │ 1,050         │
└───────────────┘ └───────────────┘

┌───────────────┐ ┌───────────────┐
│ 🔄 Issued     │ │ ⏰ Overdue    │
│ 195           │ │ 12            │
└───────────────┘ └───────────────┘
```

**3. Recent Transactions**

```
📌 Today's Activity:

8:30 AM  Issued: Advanced Math → John Doe
9:15 AM  Returned: English Grammar → Mary Smith
10:00 AM Issued: Science Book → Bob Johnson
11:30 AM Returned (Late): History Atlas → Alice Brown
         Fine: Rs. 30.00

[View All Transactions]
```

**4. Pending Tasks**

```
⚠️ Action Required:
- Process 5 book requests
- Follow up on 12 overdue books
- Collect fines: Rs. 450.00
- Catalog 8 new arrivals
```

**5. Quick Actions**

```
[Issue Book] [Return Book] [Add Book]
[View Overdue] [Generate Report]
```

---

## Book Catalog Management

### Viewing Book Catalog

1. **Navigate**: Sidebar → Books → Catalog

2. **Book List View**

   ```
   School Library Catalog (1,245 books)

   Search: [Type title, author, ISBN...]

   Filter By:
   Category: [All ▼]
   Status: [All ▼]
   Subject: [All ▼]

   Sort By: [Title A-Z ▼]

   ┌──────────────────────────────────────┐
   │ [Cover] Advanced Mathematics         │
   │                                      │
   │ Author: John Smith                   │
   │ ISBN: 978-0-123-45678-9              │
   │ Category: Textbook                   │
   │ Subject: Mathematics                 │
   │                                      │
   │ Available: 8/10 copies               │
   │ Location: Shelf A-12                 │
   │                                      │
   │ [View] [Edit] [Issue] [Delete]       │
   └──────────────────────────────────────┘

   Showing 1-50 of 1,245
   [1] [2] [3] ... [25]

   [Export Catalog] [Print List]
   ```

---

### Adding New Books

**Method 1: Single Book Entry**

1. **Navigate**: Books → Add New Book

2. **Book Information Form**

   ```
   Add New Book

   Basic Information:
   ISBN: [978-0-123-45678-9]
   Title: [Advanced Mathematics]
   Author: [John Smith]
   Publisher: [Education Press]
   Publication Year: [2023]
   Edition: [5th Edition]

   Language: [English ▼]
   Pages: [450]

   Categorization:
   Category: [Textbook ▼]
     Options: Fiction, Non-Fiction, Reference,
              Textbook, Magazine, Journal

   Subject: [Mathematics ▼]

   Grade Level: [10-12 ▼]

   Inventory:
   Total Copies: [10]
   Purchase Price: [Rs. 1,500.00]
   Purchase Date: [27/11/2025]

   Location:
   Shelf: [A-12]
   Row: [3]

   Book Cover:
   [Upload Image] (Optional)

   Description:
   [Comprehensive mathematics textbook
   covering advanced algebra, calculus...]

   Keywords:
   [mathematics, algebra, calculus, textbook]

   [Add Book] [Save as Draft]
   ```

3. **Confirmation**

   ```
   ✅ Book Added Successfully!

   Title: Advanced Mathematics
   ISBN: 978-0-123-45678-9
   Total Copies: 10
   Available: 10

   Book is now searchable in catalog.

   Next Steps:
   - Print barcode labels
   - Affix labels to books
   - Place on designated shelf

   [Print Labels] [Add Another] [View Book]
   ```

---

**Method 2: Bulk Import (Excel)**

1. **Navigate**: Books → Bulk Import

2. **Download Template**

   ```
   [Download Excel Template]

   Template includes columns:
   - ISBN (Required)
   - Title (Required)
   - Author (Required)
   - Publisher
   - Year
   - Category
   - Subject
   - Copies
   - Price
   - Shelf Location
   ```

3. **Fill Template**

   ```excel
   ISBN              Title                Author       Copies  Category
   978-0-123-45678-9 Advanced Math        John Smith   10      Textbook
   978-0-234-56789-0 English Grammar      Mary Jones   8       Textbook
   978-0-345-67890-1 World History        Bob Lee      5       Reference
   ```

4. **Upload & Verify**

   ```
   [Upload Excel File]

   Validation Results:
   ✅ 50 valid entries
   ❌ 2 errors found

   Errors:
   Row 15: Duplicate ISBN (978-0-123-45678-9)
   Row 23: Invalid category "Texbook" (typo)

   [Fix Errors] [Import Valid Entries]
   ```

5. **Import Confirmation**

   ```
   ✅ Import Complete!

   Successfully imported: 50 books
   Total copies added: 345

   Summary:
   - Textbooks: 30
   - Fiction: 12
   - Non-Fiction: 8

   [Print All Labels] [View Catalog]
   ```

---

### Editing Book Details

1. **From Catalog**, click "Edit" on any book

2. **Edit Form**

   ```
   Edit Book

   Title: [Advanced Mathematics]
   Author: [John Smith]

   Total Copies: [10]
   Available Copies: [8] (Auto-calculated)

   Location: [A-12]

   ⚠️ Cannot Edit:
   - ISBN (unique identifier)

   [Save Changes] [Cancel]
   ```

---

### Deleting Books

1. **From Catalog**, click "Delete"

2. **Confirmation**

   ```
   Delete Book?

   Title: Advanced Mathematics
   ISBN: 978-0-123-45678-9

   Current Status:
   Total Copies: 10
   Issued: 2
   Available: 8

   ⚠️ Warning:
   This book has 2 copies currently issued.

   Action:
   ○ Cannot delete (books are issued)
   ○ Delete after all copies returned
   ● Mark as Discontinued (keep records)

   [Confirm] [Cancel]
   ```

---

## Issuing & Returning Books

### Issuing Books

**Method 1: Quick Issue (Recommended)**

1. **Navigate**: Dashboard → Quick Actions → Issue Book

2. **Issue Form**

   ```
   Issue Book

   Student Information:
   Student ID or Name: [st001b1234]

   [Search]

   Student: John Doe (st001b1234)
   Grade: 10A
   Contact: +94712345678

   Current Borrowed: 2 books
   Limit: 5 books
   Remaining: 3 books ✅
   Overdue: 0 ✅
   Pending Fines: Rs. 0.00 ✅

   Book Information:
   ISBN or Title: [978-0-123-45678-9]

   [Search]

   Book: Advanced Mathematics
   Author: John Smith
   Available: 8/10 copies ✅
   Location: Shelf A-12

   Return Date: [11/12/2025] (14 days default)

   Notes (Optional):
   [For exam preparation]

   [Issue Book]
   ```

3. **Issue Confirmation**

   ```
   ✅ Book Issued Successfully!

   Student: John Doe (st001b1234)
   Book: Advanced Mathematics
   Issue Date: 27/11/2025
   Due Date: 11/12/2025

   Transaction ID: LT20251127001

   [Print Receipt] [Issue Another] [Done]
   ```

4. **Receipt (Auto-print)**
   ```
   ╔════════════════════════════════════╗
   ║     School Library Receipt         ║
   ╠════════════════════════════════════╣
   ║ Student: John Doe                  ║
   ║ ID: st001b1234                     ║
   ║ Grade: 10A                         ║
   ║                                    ║
   ║ Book: Advanced Mathematics         ║
   ║ ISBN: 978-0-123-45678-9            ║
   ║                                    ║
   ║ Issue Date: 27/11/2025             ║
   ║ Due Date: 11/12/2025               ║
   ║                                    ║
   ║ Fine: Rs. 10/day after due date    ║
   ║                                    ║
   ║ Transaction ID: LT20251127001      ║
   ╚════════════════════════════════════╝
   ```

---

**Method 2: Barcode Scanning**

1. **Click** "Issue Book" with barcode scanner mode

2. **Scan Process**

   ```
   Issue Book (Barcode Mode)

   1. Scan Student ID Card
   [Scanning...]
   ✅ Student: John Doe (st001b1234)

   2. Scan Book Barcode
   [Scanning...]
   ✅ Book: Advanced Mathematics

   Return Date: [11/12/2025]

   [Confirm Issue]
   ```

---

### Returning Books

**Method 1: Quick Return**

1. **Navigate**: Dashboard → Quick Actions → Return Book

2. **Return Form**

   ```
   Return Book

   Student ID or Book ISBN:
   [st001b1234] or [978-0-123-45678-9]

   [Search]

   Issued Books for John Doe:

   ┌──────────────────────────────────────┐
   │ ☑ Advanced Mathematics               │
   │   Due: 11/12/2025 (14 days left)     │
   │   Status: On Time ✅                 │
   │   Fine: Rs. 0.00                     │
   └──────────────────────────────────────┘

   ┌──────────────────────────────────────┐
   │ ☐ English Grammar                    │
   │   Due: 15/12/2025 (18 days left)     │
   │   Status: On Time ✅                 │
   │   Fine: Rs. 0.00                     │
   └──────────────────────────────────────┘

   [Return Selected Books]
   ```

3. **Return Confirmation**

   ```
   ✅ Book Returned Successfully!

   Student: John Doe
   Book: Advanced Mathematics
   Issue Date: 27/11/2025
   Return Date: 27/11/2025 (Today)
   Due Date: 11/12/2025

   Status: Returned On Time ✅
   Days Overdue: 0
   Fine: Rs. 0.00

   [Print Receipt] [Return Another] [Done]
   ```

---

**Handling Overdue Returns**

```
Return Overdue Book

Student: Bob Johnson (st001b1236)
Book: History Atlas
Issue Date: 01/11/2025
Due Date: 15/11/2025
Return Date: 27/11/2025 (Today)

Days Overdue: 12 days
Fine: Rs. 120.00 (Rs. 10/day)

Payment Status:
○ Paid (Cash/Card)
○ Pending (Collect later)
● Waive Fine (Reason: Medical emergency)

Reason for Waiver:
[Student was hospitalized...]

Approved By: [Librarian Name]

[Confirm Return] [Cancel]
```

**After Fine Collection:**

```
✅ Book Returned & Fine Collected

Fine Amount: Rs. 120.00
Payment Method: Cash
Receipt #: LR20251127001

[Print Receipt] [Done]
```

---

### Renewing Books

1. **Student Request** or **Direct Renewal**

2. **Renewal Form**

   ```
   Renew Book

   Student: John Doe (st001b1234)
   Book: Advanced Mathematics

   Current Due Date: 11/12/2025
   New Due Date: 25/12/2025 (+14 days)

   Renewal Count: 1/2

   ⚠️ Renewal Rules:
   - Maximum 2 renewals per book
   - Cannot renew if overdue
   - Cannot renew if another student requested

   Eligible: ✅

   [Confirm Renewal]
   ```

3. **Confirmation**

   ```
   ✅ Book Renewed Successfully!

   New Due Date: 25/12/2025
   Remaining Renewals: 1

   Student notified via email.

   [Print Receipt] [Done]
   ```

---

## Transaction Management

### Viewing All Transactions

1. **Navigate**: Transactions → Transaction History

2. **Transaction List**

   ```
   Library Transactions

   Date Range: [Last 30 Days ▼]

   Filter:
   Type: [All ▼] (Issue/Return/Renewal)
   Status: [All ▼] (On Time/Overdue/Pending)
   Student: [All ▼]

   ┌────────────────────────────────────────┐
   │ Date/Time  | Student    | Book    | Type │
   ├────────────────────────────────────────┤
   │ 27/11 8:30 | John Doe   | Math    | Issue│
   │ 27/11 9:15 | Mary Smith | English | Return│
   │ 27/11 10:00| Bob John   | Science | Issue│
   │ 26/11 14:30| Alice Brown| History | Return│
   │            |            | (Late)  | Fine: 30│
   └────────────────────────────────────────┘

   Showing 1-50 of 1,234

   [Export Excel] [Export PDF] [Print]
   ```

---

### Managing Overdue Books

1. **Navigate**: Transactions → Overdue Books

2. **Overdue List**

   ```
   Overdue Books (12)

   Sort By: [Days Overdue ▼]

   ┌──────────────────────────────────────┐
   │ Student: Bob Johnson (st001b1236)    │
   │ Book: History Atlas                  │
   │ Due Date: 15/11/2025                 │
   │ Days Overdue: 12                     │
   │ Fine: Rs. 120.00                     │
   │                                      │
   │ Last Reminder: 20/11/2025            │
   │ Contact: +94712345678                │
   │                                      │
   │ [Send Reminder] [Call] [Mark Paid]   │
   └──────────────────────────────────────┘

   Total Overdue Fines: Rs. 450.00

   Bulk Actions:
   [Send All Reminders] [Export List]
   [Suspend Library Access (30+ days)]
   ```

---

### Sending Reminders

**Individual Reminder:**

```
Send Reminder to Bob Johnson

Book: History Atlas
Days Overdue: 12
Fine: Rs. 120.00

Reminder Type:
☑ Email (bob.johnson@school.edu)
☑ SMS (+94712345678)
☑ Email to Parent (parent@email.com)

Message Template:
[Auto-generated reminder message]

[Customize Message] [Send Reminder]
```

**Bulk Reminders:**

```
Send Overdue Reminders

Recipients: 12 students with overdue books

Include:
☑ Students with 1-7 days overdue (3)
☑ Students with 8-14 days overdue (5)
☑ Students with 15+ days overdue (4)

Send Via:
☑ Email
☑ SMS
☑ Parent Email

[Send All Reminders]
```

---

### Fine Management

1. **Navigate**: Transactions → Fines

2. **Fine Summary**

   ```
   Fine Management

   Total Outstanding: Rs. 450.00
   Collected Today: Rs. 120.00
   Waived (This Month): Rs. 50.00

   Pending Fines (12):

   ┌──────────────────────────────────────┐
   │ Student         Book          Fine   │
   ├──────────────────────────────────────┤
   │ Bob Johnson     History       Rs. 120│
   │ Mary Lee        Science       Rs. 80 │
   │ Tom Brown       Math          Rs. 50 │
   └──────────────────────────────────────┘

   [Collect Fine] [Waive Fine] [Export Report]
   ```

3. **Collecting Fine**

   ```
   Collect Fine

   Student: Bob Johnson
   Book: History Atlas
   Fine Amount: Rs. 120.00

   Payment Method:
   ○ Cash
   ○ Card
   ○ Online Transfer

   Amount Received: [Rs. 120.00]

   Receipt #: LR20251127001

   [Print Receipt] [Confirm Collection]
   ```

---

## Member Management

### Viewing Members

1. **Navigate**: Members → All Members

2. **Member List**

   ```
   Library Members (450)

   Filter:
   Type: [All ▼] (Student/Teacher/Staff)
   Status: [Active ▼]
   Grade: [All ▼]

   ┌──────────────────────────────────────┐
   │ [Photo] John Doe - Grade 10A         │
   │         ID: st001b1234               │
   │         Type: Student                │
   │                                      │
   │ Books Borrowed: 24 (Total)           │
   │ Currently: 2 books                   │
   │ Overdue: 0                           │
   │ Fines Paid: Rs. 0.00                 │
   │                                      │
   │ [View History] [Issue Book]          │
   └──────────────────────────────────────┘

   [Export List]
   ```

---

### Member Borrowing History

1. **Click** "View History" on any member

2. **History Page**

   ```
   John Doe - Borrowing History
   Student ID: st001b1234
   Grade: 10A
   Member Since: 01/09/2024

   Statistics:
   - Total Books Borrowed: 24
   - Currently Borrowed: 2
   - Returned On Time: 22 (92%)
   - Late Returns: 2 (8%)
   - Total Fines Paid: Rs. 0.00

   Current Books (2):
   ┌────────────────────────────────────┐
   │ Advanced Mathematics               │
   │ Issued: 27/11/2025                 │
   │ Due: 11/12/2025 (14 days)          │
   └────────────────────────────────────┘

   History (Last 10):
   ┌────────────────────────────────────┐
   │ Date       Book            Status  │
   ├────────────────────────────────────┤
   │ 13/11/25   English Gr.    Returned │
   │ 01/11/25   History Atlas  Returned │
   │ 20/10/25   Science Book   Late     │
   └────────────────────────────────────┘

   [Export History] [Issue Book]
   ```

---

## Reports & Analytics

### Library Dashboard Analytics

```
Library Analytics
Period: November 2025

Key Metrics:
- Total Transactions: 245
- Books Issued: 185
- Books Returned: 198
- Renewals: 45

Circulation Rate: 15.7%
(195 issued / 1,245 total books)

Popular Categories:
1. Textbooks (45%)
2. Fiction (28%)
3. Non-Fiction (18%)
4. Reference (9%)

Most Borrowed Books:
1. Advanced Mathematics (15 issues)
2. English Grammar (12 issues)
3. Science Experiments (10 issues)

Active Members: 412/450 (91.5%)

Fine Collection: Rs. 1,250.00
```

---

### Generating Reports

1. **Navigate**: Reports → Report Builder

2. **Report Options**

   ```
   Create Library Report

   Report Type:
   ○ Book Catalog
   ○ Transaction History
   ● Circulation Report
   ○ Fine Report
   ○ Member Activity
   ○ Overdue Books
   ○ Popular Books

   Date Range:
   From: [01/11/2025]
   To: [30/11/2025]

   Include:
   ☑ Summary statistics
   ☑ Charts and graphs
   ☑ Detailed tables
   ☑ Member lists

   Format:
   ○ PDF
   ● Excel
   ○ CSV

   [Generate Report]
   ```

3. **Report Preview**

   ```
   Circulation Report - November 2025

   [Download] [Print] [Email]
   ```

---

## Library Settings

### Configuring Library Rules

1. **Navigate**: Settings → Library Settings

2. **Settings Page**

   ```
   Library Settings

   Borrowing Limits:
   Students: [5] books
   Teachers: [10] books
   Staff: [5] books

   Loan Period:
   Default: [14] days
   Renewals Allowed: [2] times
   Renewal Period: [14] days each

   Fine Structure:
   Daily Fine: [Rs. 10.00] per day
   Maximum Fine: [Rs. 500.00] per book
   Grace Period: [0] days

   Restrictions:
   ☑ Block issuing if overdue books exist
   ☑ Block if fines exceed Rs. 200.00
   ☑ Suspend after 30 days overdue

   Notifications:
   Due Soon (Days Before): [3]
   Overdue Reminders (Every): [3] days

   [Save Settings]
   ```

---

## Best Practices

### Catalog Management

✅ **DO:**

- Verify ISBN before adding
- Use consistent naming conventions
- Keep locations updated
- Perform regular inventory audits
- Remove outdated/damaged books
- Update book conditions

❌ **DON'T:**

- Add duplicate ISBNs
- Leave location empty
- Neglect damaged books
- Ignore missing books

---

### Transaction Management

✅ **DO:**

- Issue/return books promptly
- Print receipts always
- Verify student ID
- Check book condition
- Update status immediately
- Send timely reminders

❌ **DON'T:**

- Delay transaction entry
- Skip verification
- Ignore overdue books
- Forget to collect fines

---

### Member Relations

✅ **DO:**

- Be courteous and helpful
- Respond to requests promptly
- Provide book recommendations
- Educate on library rules
- Follow up on overdue politely

❌ **DON'T:**

- Be rude or impatient
- Ignore member requests
- Be overly strict
- Forget to send reminders

---

## FAQs

**Q1: How do I add multiple copies of the same book?**

A: Edit book → Update "Total Copies" field → Save

**Q2: Can I issue a book to a student with overdue books?**

A: Depends on settings. Default: No (blocked until returned)

**Q3: How do I waive a fine?**

A: Fines → Select fine → Waive → Enter reason → Approve

**Q4: Can I track damaged or lost books?**

A: Yes, edit book → Mark as "Damaged" or "Lost" → Update available copies

**Q5: How do I prevent issuing restricted books?**

A: Edit book → Set "Restricted" flag → Specify eligible members

**Q6: Can I export the entire catalog?**

A: Yes, Catalog → Export → Select format (Excel/CSV/PDF)

**Q7: How do I handle lost books?**

A: Mark as lost → Charge replacement cost → Update catalog

**Q8: Can students request books online?**

A: Yes, students can browse and request. You approve and prepare.

**Q9: How do I print barcode labels?**

A: Book → Print Label → Labels auto-generated with ISBN

**Q10: Can I search by partial title or author?**

A: Yes, search supports partial matches and auto-suggestions.

---

**Document Version:** 1.0
**Last Updated:** November 27, 2025
**For:** Edu-Pro LMS v1.0

---

**© 2025 Edu-Pro Learning Management System. All rights reserved.**
