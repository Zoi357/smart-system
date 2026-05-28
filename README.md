# INFORM - Smart Student Information Management System

A modern, web-based student academic records and service management system for **Cebu Far East Institute (CFEI)** designed specifically for Senior High School (SHS) students.

## 🎓 Overview

INFORM is a comprehensive platform that streamlines academic management for SHS institutions. It provides students, teachers, and administrators with an integrated system to manage enrollment, grades, schedules, tuition, and academic records.

## ✨ Key Features

### For Students
- **Dashboard**: Personalized student portal with quick access to grades, schedule, and tuition information
- **Enrollment System**: Complete SHS enrollment form with automatic Student ID and LRN generation
- **Grades Management**: View subject grades, GWA (General Weighted Average), and performance metrics
- **Schedule Viewer**: Class timetable with room locations and teacher information
- **Tuition Tracking**: Monitor tuition payments and outstanding balances
- **JOBERT AI Assistant**: Intelligent chatbot powered by Ollama/Mistral for academic guidance
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing
- **Credentials Display**: Auto-generated LRN, Student ID, and temporary password upon enrollment

### For Teachers
- **Teacher Login**: Dedicated teacher authentication portal
- **Grade Management**: Submit and manage student grades
- **Class Information**: View assigned classes and student rosters

### For Administrators
- **Admin Dashboard**: Comprehensive overview of student enrollment and academic metrics
- **Student Management**: View and manage all enrolled students
- **Grades Oversight**: Monitor grade submissions and academic performance
- **Enrollment Tracking**: Track new and returning student enrollments
- **Tuition Records**: Monitor payment status and outstanding balances
- **Announcements**: Post and manage school announcements

## 🏫 SHS Structure

The system is tailored for Senior High School with:
- **Tracks**: TVL, STEM, GAS, HUMMS, ABM
- **Grade Levels**: Grade 11 and Grade 12
- **Student Status**: New Student or Old Student
- **Auto-generated IDs**: Student ID (STU-YYYYMMDDXXXX) and LRN (12-digit unique number)

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Bootstrap 5** - Responsive UI components
- **CSS3** - Custom animations and gradients

### Backend
- **Node.js** - Runtime environment
- **Express.js** - API server
- **SQLite** - Database (with migration support)

### AI Integration
- **Ollama** - Local LLM server
- **Mistral Model** - Language model for JOBERT assistant

## 🎨 Design Features

- **Premium Dark Theme**: Sophisticated navy/slate gradient backgrounds
- **Animated Gradients**: Smooth, flowing background animations
- **Glowing Logo**: CFEI logo with RGB glow effect
- **Glass Morphism**: Modern frosted glass card effects
- **Responsive Design**: Mobile-first approach with Bootstrap grid
- **Color Scheme**: Blue (#1e40af), Red (#dc2626), Yellow (#fbbf24)

## 📋 Enrollment Process

1. Student selects "Enroll Now" from home page
2. Fills comprehensive enrollment form with:
   - Personal information (name, DOB, contact)
   - Educational background
   - Parent/Guardian information
   - 2x2 ID photo upload
3. Reviews and accepts Terms & Conditions
4. Receives auto-generated credentials:
   - **LRN**: Learner Reference Number
   - **Student ID**: Unique identifier
   - **Password**: Temporary password (CFEI@2026)

## 🔐 Authentication

### Student Login
- Student ID or LRN
- Password
- Secure session management

### Teacher Login
- Teacher ID (T001-T004)
- Password
- Demo credentials available for testing

### Admin Login
- Admin credentials
- Full system access

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Ollama (for AI features)
- Mistral model downloaded locally

### Installation

```bash
# Clone the repository
git clone https://github.com/Zoi357/smart-system.git
cd smart-system

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
npm run migrate

# Start development server
npm run dev
```

### Running Ollama

```bash
# Start Ollama server (runs on localhost:11434)
ollama serve

# In another terminal, pull Mistral model
ollama pull mistral
```

## 📁 Project Structure

```
├── app/
│   ├── admin/              # Admin dashboard and login
│   ├── dashboard/          # Student dashboard
│   ├── enrollment/         # Enrollment form
│   ├── login/              # Student login
│   ├── teacher/            # Teacher login
│   ├── api/                # API routes
│   ├── components/         # Reusable components
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── server/
│   ├── config/             # Database and environment config
│   ├── controllers/        # Business logic
│   ├── models/             # Data models
│   ├── middleware/         # Express middleware
│   ├── database/           # Database schema and migrations
│   └── index.js            # Server entry point
├── public/                 # Static assets
└── package.json            # Dependencies
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/login` - Student login
- `POST /api/auth/teacher-login` - Teacher login
- `POST /api/auth/logout` - Logout

### Student
- `GET /api/student/dashboard` - Get dashboard data
- `GET /api/student/grades` - Get student grades
- `GET /api/student/schedule` - Get class schedule
- `GET /api/student/tuition` - Get tuition information

### Enrollment
- `POST /api/enrollment/submit` - Submit enrollment form
- `GET /api/enrollment/status` - Check enrollment status

### JOBERT AI
- `POST /api/jobert` - Send message to AI assistant

## 🎯 Demo Credentials

### Student
- **Student ID**: STU-2024-001
- **Password**: (Set during enrollment)

### Teacher
- **Teacher ID**: T001
- **Password**: Teacher@2026

### Admin
- **Username**: admin
- **Password**: (Configure in environment)

## 🌙 Dark/Light Mode

Students can toggle between dark and light modes using the button in the top-right corner of the dashboard. Preferences are session-based.

## 📱 Responsive Design

- **Desktop**: Full-featured interface with all options visible
- **Tablet**: Optimized layout with touch-friendly buttons
- **Mobile**: Simplified interface with collapsible sections

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Input validation and sanitization
- SQL injection prevention
- Session management

## 📊 Database Schema

- **Users**: Student, teacher, and admin accounts
- **Students**: Student profile and enrollment information
- **Grades**: Subject grades and GWA calculations
- **Schedule**: Class timetables and room assignments
- **Tuition**: Fee records and payment tracking
- **Announcements**: School announcements and notifications
- **Audit**: Activity logging for compliance

## 🚧 Future Enhancements

- [ ] Payment gateway integration
- [ ] Document request system (TOR, certificates)
- [ ] Parent portal access
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Attendance tracking

## 📝 License

This project is proprietary software for Cebu Far East Institute.

## 👥 Contributors

- **Development**: Zoi357
- **Original Repository**: KazukiMutsiMutsi

## 📧 Support

For issues, questions, or feature requests, please contact the development team.

---

**Built with ❤️ for Cebu Far East Institute**

*Last Updated: May 28, 2026*
