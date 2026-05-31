# INFORM Teacher System Guide
## Complete Teacher Portal Implementation

---

## 📋 Overview

The INFORM Teacher System provides comprehensive tools for teachers to:
- Manage their assigned classes and students
- Submit and track student grades
- Monitor student attendance
- View class statistics and analytics
- Access recent activity logs

---

## 🔐 Teacher Authentication

### Login Credentials (Demo)

| Teacher ID | Password | Name | Department |
|-----------|----------|------|-----------|
| T001 | Teacher@2026 | Maria Santos | Mathematics |
| T002 | Teacher@2026 | Juan Dela Cruz | English |
| T003 | Teacher@2026 | Ana Reyes | Science |
| T004 | Teacher@2026 | Carlos Fernandez | History |

### Login Flow

1. Navigate to `/teacher/login`
2. Enter Teacher ID (e.g., T001)
3. Enter Password (Teacher@2026)
4. Click "Access Teacher Portal"
5. Redirected to `/teacher/dashboard`

---

## 🎯 Teacher Dashboard Features

### 1. Overview Panel
**Default landing page showing:**
- Welcome message with teacher name and department
- Quick statistics:
  - Total classes assigned
  - Total students in classes
  - Class average grade
- Quick access buttons to main features
- Recent activity log
- Class summary with enrollment status

### 2. My Classes (Subjects Panel)
**View all assigned classes:**
- Subject code and name
- Units/credits
- Current enrollment vs. maximum capacity
- Enrollment progress bar
- Manage button for each class

**Data Displayed:**
```
Code    | Subject Name      | Units | Enrollment
--------|------------------|-------|------------
MATH101 | Algebra I        | 3     | 35/40
MATH102 | Geometry         | 3     | 32/40
MATH201 | Calculus I       | 4     | 28/35
```

### 3. My Students Panel
**View all students in teacher's classes:**
- Student name and ID
- Pathway (Academic/TechPro)
- Grade level (11 or 12)
- Enrollment status
- Search functionality by name or ID

**Features:**
- Real-time search filter
- Status badges (Active/Inactive)
- Sortable by name or ID

### 4. Grade Management Panel
**Submit and manage student grades:**
- Select subject from dropdown
- View all students in selected subject
- Display class average grade
- Show individual student grades
- Progress bars for visual representation
- Letter grades (A, B, C, etc.)

**Grade Calculation:**
- 90-100%: A
- 80-89%: B
- 70-79%: C
- Below 70%: D/F

### 5. Attendance Management Panel
**Track student attendance:**
- Select subject from dropdown
- View attendance records for all students
- Display days present vs. total meetings
- Calculate attendance percentage
- Class average attendance

**Attendance Tracking:**
- Total meetings held
- Days student was present
- Automatic percentage calculation
- Color-coded status indicators

---

## 🔌 API Endpoints

### Authentication

#### POST `/api/teacher/login`
**Submit teacher credentials**

Request:
```json
{
  "teacher_id": "T001",
  "password": "Teacher@2026"
}
```

Response (Success):
```json
{
  "message": "Login successful.",
  "teacher": {
    "teacher_id": "T001",
    "full_name": "Maria Santos",
    "department": "Mathematics"
  }
}
```

Response (Error):
```json
{
  "error": "Invalid Teacher ID or password."
}
```

---

### Dashboard

#### GET `/api/teacher/dashboard`
**Get teacher dashboard data**

Headers:
```
Cookie: teacher_id=T001
```

Response:
```json
{
  "teacher": {
    "teacher_id": "T001",
    "full_name": "Maria Santos",
    "department": "Mathematics",
    "email": "maria.santos@cfei.edu"
  },
  "subjects": [
    {
      "id": 1,
      "code": "MATH101",
      "name": "Algebra I",
      "units": 3,
      "enrolled": 35,
      "max": 40
    }
  ],
  "stats": {
    "total_subjects": 3,
    "total_students": 95,
    "avg_grade": 90.5
  },
  "activity": [
    {
      "action": "Grade Submitted",
      "name": "Jamie Santos",
      "time": "2h ago",
      "icon": "📊"
    }
  ]
}
```

---

### Grades Management

#### GET `/api/teacher/grades?subject_id=1`
**Get grades for a subject**

Response:
```json
{
  "subject_id": 1,
  "term": "Term 1",
  "grades": [
    {
      "student_id": "STU-2024-001",
      "name": "Jamie Santos",
      "percentage": 92,
      "term": "Term 1"
    }
  ],
  "count": 4
}
```

#### POST `/api/teacher/grades`
**Submit or update a grade**

Request:
```json
{
  "student_id": "STU-2024-001",
  "subject_id": 1,
  "percentage": 92
}
```

Response:
```json
{
  "message": "Grade submitted successfully.",
  "grade": {
    "student_id": "STU-2024-001",
    "subject_id": 1,
    "percentage": 92,
    "term": "Term 1",
    "submitted_by": "T001",
    "timestamp": "2026-06-01T10:30:00Z"
  }
}
```

---

### Attendance Management

#### GET `/api/teacher/attendance?subject_id=1`
**Get attendance records for a subject**

Response:
```json
{
  "subject_id": 1,
  "term": "Term 1",
  "attendance": [
    {
      "student_id": "STU-2024-001",
      "name": "Jamie Santos",
      "present": 18,
      "total": 20,
      "percentage": 90,
      "term": "Term 1"
    }
  ],
  "count": 4
}
```

#### POST `/api/teacher/attendance`
**Update attendance record**

Request:
```json
{
  "student_id": "STU-2024-001",
  "subject_id": 1,
  "total_meetings": 20,
  "days_present": 18
}
```

Response:
```json
{
  "message": "Attendance updated successfully.",
  "record": {
    "student_id": "STU-2024-001",
    "subject_id": 1,
    "total_meetings": 20,
    "days_present": 18,
    "attendance_percentage": 90,
    "term": "Term 1",
    "updated_by": "T001",
    "timestamp": "2026-06-01T10:30:00Z"
  }
}
```

---

## 📊 Teacher-Student Connection

### How Teachers Access Student Information

1. **View Students**: Teachers can see all students enrolled in their classes
2. **Track Grades**: Submit and monitor individual student grades
3. **Monitor Attendance**: Track attendance for each student
4. **View Performance**: See class averages and individual performance

### Student Data Visible to Teachers

- Student ID and name
- Pathway (Academic/TechPro)
- Grade level (11 or 12)
- Enrollment status
- Grades submitted by teacher
- Attendance records

### Data NOT Visible to Teachers

- Student passwords
- Student personal contact information (except name/ID)
- Other teachers' grades
- Financial/payment information
- Document requests

---

## 🔗 Teacher-Admin Connection

### Admin Dashboard Integration

**Admins can:**
- View all teachers and their assignments
- Monitor teacher activity
- Verify submitted grades
- Approve attendance records
- Generate teacher performance reports

**Admin Access to Teacher Data:**
- Teacher profile information
- Assigned subjects and students
- Grade submissions (audit trail)
- Attendance records (audit trail)
- Activity logs

### Data Flow

```
Teacher Dashboard
    ↓
Submit Grades/Attendance
    ↓
API Endpoint
    ↓
Database
    ↓
Admin Dashboard (View/Verify)
    ↓
Student Dashboard (View Grades)
```

---

## 📁 File Structure

### Frontend Files
```
app/
├── teacher/
│   ├── login/
│   │   └── page.tsx          # Teacher login page
│   └── dashboard/
│       └── page.tsx          # Teacher dashboard
└── api/
    └── teacher/
        ├── login/
        │   └── route.ts      # Login API
        ├── dashboard/
        │   └── route.ts      # Dashboard API
        ├── grades/
        │   └── route.ts      # Grades API
        └── attendance/
            └── route.ts      # Attendance API
```

### Backend Files
```
server/
├── models/
│   └── teacherModel.js       # Teacher data model
├── controllers/
│   ├── teacherAuthController.js      # Authentication
│   ├── teacherGradesController.js    # Grade management
│   └── teacherAttendanceController.js # Attendance management
└── middleware/
    └── teacherMiddleware.js  # Auth middleware
```

---

## 🔄 Data Synchronization

### Real-time Updates

**When a teacher submits grades:**
1. Grade saved to database
2. Student dashboard updated (if student is viewing)
3. Admin dashboard updated (for verification)
4. Notification sent to student (optional)

**When attendance is updated:**
1. Attendance record saved
2. Attendance percentage calculated
3. Admin dashboard updated
4. Student can view updated attendance

---

## 🛡️ Security Features

### Authentication
- Teacher ID and password verification
- Session-based authentication (cookies)
- Automatic logout after 24 hours

### Authorization
- Teachers can only access their own classes
- Teachers cannot modify other teachers' grades
- Teachers cannot access student personal information
- Admin verification required for sensitive operations

### Data Protection
- All API endpoints require authentication
- Input validation on all submissions
- Percentage validation (0-100)
- Attendance validation (present ≤ total)

---

## 📈 Teacher Statistics

### Dashboard Metrics

**Class Statistics:**
- Total classes assigned
- Total students across all classes
- Average grade across all classes
- Class enrollment rates

**Activity Tracking:**
- Recent grade submissions
- Attendance updates
- Student interactions
- System activity log

---

## 🎓 Integration with Student System

### Student View of Teacher Data

**Students can see:**
- Their grades submitted by teacher
- Their attendance records
- Class schedule
- Teacher information (name, department)

**Students cannot see:**
- Other students' grades
- Teacher's personal information
- Grade submission timestamps
- Attendance details of other students

---

## 🔧 Configuration

### Active Term
- Current active term: **Term 1**
- Term dates: June - September 2026
- 201 class days per school year

### Grade Scale
- A: 90-100%
- B: 80-89%
- C: 70-79%
- D/F: Below 70%

### Attendance Threshold
- Minimum attendance: 75% (recommended)
- Tracked per subject per term
- Calculated as: (days_present / total_meetings) × 100

---

## 📝 Usage Examples

### Example 1: Submit Grade

```javascript
// Teacher submits grade for student
const response = await fetch('/api/teacher/grades', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    student_id: 'STU-2024-001',
    subject_id: 1,
    percentage: 92
  })
});

const result = await response.json();
console.log(result.message); // "Grade submitted successfully."
```

### Example 2: Update Attendance

```javascript
// Teacher updates attendance
const response = await fetch('/api/teacher/attendance', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    student_id: 'STU-2024-001',
    subject_id: 1,
    total_meetings: 20,
    days_present: 18
  })
});

const result = await response.json();
console.log(result.record.attendance_percentage); // 90
```

---

## 🚀 Future Enhancements

- [ ] Bulk grade import (CSV/Excel)
- [ ] Grade distribution charts
- [ ] Attendance trend analysis
- [ ] Student performance alerts
- [ ] Class announcements
- [ ] Assignment submission tracking
- [ ] Parent communication portal
- [ ] Mobile app for teachers

---

## 📞 Support

For technical support or questions about the teacher system:
- Email: support@inform.edu
- System: INFORM v2.1.0 (Teacher Edition)
- Last Updated: June 1, 2026

---

*This comprehensive teacher system connects teachers, students, and administrators in a unified platform for academic management.*
