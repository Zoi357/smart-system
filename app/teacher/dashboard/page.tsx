"use client";

import { useState, useRef } from "react";
import { PremiumDashboardShell } from "../../components/PremiumDashboardShell";

/* ── Data ── */
const teacherData = {
  teacher_id: "T001",
  full_name: "Maria Santos",
  department: "Mathematics",
  email: "maria.santos@cfei.edu",
};

const subjects = [
  { id: 1, code: "MATH101", name: "Algebra I", units: 3, enrolled: 35, max: 40 },
  { id: 2, code: "MATH102", name: "Geometry", units: 3, enrolled: 32, max: 40 },
  { id: 3, code: "MATH201", name: "Calculus I", units: 4, enrolled: 28, max: 35 },
];

const teacherSchedule = [
  { day: "Monday", time: "07:30–08:30", subject: "Algebra I", room: "Room 301", enter: "07:25", leave: "08:35" },
  { day: "Monday", time: "08:30–09:30", subject: "Geometry", room: "Room 205", enter: "08:25", leave: "09:35" },
  { day: "Tuesday", time: "07:30–09:00", subject: "Calculus I", room: "Sci. Lab", enter: "07:20", leave: "09:05" },
  { day: "Wednesday", time: "07:30–08:30", subject: "Algebra I", room: "Room 301", enter: "07:25", leave: "08:35" },
  { day: "Thursday", time: "07:30–09:00", subject: "Calculus I", room: "Sci. Lab", enter: "07:20", leave: "09:05" },
  { day: "Friday", time: "07:30–08:30", subject: "Algebra I", room: "Room 301", enter: "07:25", leave: "08:35" },
];

const students = [
  { id: "STU-2024-001", name: "Jamie Santos", pathway: "Academic", grade: 11, status: "Active" },
  { id: "STU-2024-002", name: "Maria Reyes", pathway: "Academic", grade: 11, status: "Active" },
  { id: "STU-2024-003", name: "Carlo Dela Cruz", pathway: "Academic", grade: 12, status: "Active" },
  { id: "STU-2024-005", name: "Luis Fernandez", pathway: "Academic", grade: 12, status: "Active" },
  { id: "STU-2024-008", name: "Lena Cruz", pathway: "Academic", grade: 11, status: "Active" },
];

const grades = [
  { student_id: "STU-2024-001", name: "Jamie Santos", subject: "Algebra I", percentage: 92, term: "Term 1" },
  { student_id: "STU-2024-002", name: "Maria Reyes", subject: "Algebra I", percentage: 87, term: "Term 1" },
  { student_id: "STU-2024-003", name: "Carlo Dela Cruz", subject: "Calculus I", percentage: 95, term: "Term 1" },
  { student_id: "STU-2024-005", name: "Luis Fernandez", subject: "Calculus I", percentage: 88, term: "Term 1" },
];

const gradeRequestsTeacher = [
  { id: 1, student: "Jamie Santos", subject: "Algebra I", status: "pending", requestedAt: "2h ago" },
  { id: 2, student: "Maria Reyes", subject: "Algebra I", status: "pending", requestedAt: "1h ago" },
  { id: 3, student: "Carlo Dela Cruz", subject: "Calculus I", status: "approved", requestedAt: "30m ago" },
];

const attendance = [
  { student_id: "STU-2024-001", name: "Jamie Santos", subject: "Algebra I", present: 18, total: 20, percentage: 90 },
  { student_id: "STU-2024-002", name: "Maria Reyes", subject: "Algebra I", present: 19, total: 20, percentage: 95 },
  { student_id: "STU-2024-003", name: "Carlo Dela Cruz", subject: "Calculus I", present: 17, total: 20, percentage: 85 },
  { student_id: "STU-2024-005", name: "Luis Fernandez", subject: "Calculus I", present: 20, total: 20, percentage: 100 },
];

const recentActivity = [
  { action: "Grade Submitted", name: "Jamie Santos", time: "2h ago", icon: "📊" },
  { action: "Attendance Updated", name: "Maria Reyes", time: "3h ago", icon: "✓" },
  { action: "Grade Submitted", name: "Carlo Dela Cruz", time: "5h ago", icon: "📊" },
  { action: "Attendance Updated", name: "Luis Fernandez", time: "Yesterday", icon: "✓" },
];

const teacherNotifications = [
  { id: 1, type: "document", title: "Document Request", message: "Jamie Santos requested a TOR", time: "1h ago", read: false, icon: "📄" },
  { id: 2, type: "grade", title: "Grade Submitted", message: "Your grades for Algebra I have been submitted", time: "2h ago", read: false, icon: "✓" },
  { id: 3, type: "enrollment", title: "New Student Enrolled", message: "Rosa Bautista enrolled in your Geometry class", time: "1d ago", read: true, icon: "🎓" },
];

const documentApprovals = [
  { id: 1, student: "Jamie Santos", type: "TOR", status: "pending", requestedAt: "May 18, 2026", icon: "📄" },
  { id: 2, student: "Maria Reyes", type: "Certificate", status: "pending", requestedAt: "May 17, 2026", icon: "📜" },
  { id: 3, student: "Carlo Dela Cruz", type: "TOR", status: "approved", requestedAt: "May 15, 2026", approvedAt: "May 16, 2026", icon: "✓" },
];

type Panel = "overview" | "subjects" | "schedule" | "students" | "grades" | "attendance" | "requests" | "documents" | "notifications";

/* ── Back Button ── */
function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="dash-back-btn mb-2">
      ← Back to Dashboard
    </button>
  );
}

/* ── Overview Panel ── */
function OverviewPanel({ setPanel }: { setPanel: (p: Panel) => void }) {
  const stats = {
    total_subjects: subjects.length,
    total_students: students.length,
    avg_grade: 90.5,
  };
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleTiltMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (mouseY - centerY) / 15;
    const rotateY = (centerX - mouseX) / 15;
    card.style.setProperty('--rotateX', `${rotateX}deg`);
    card.style.setProperty('--rotateY', `${rotateY}deg`);
  };

  const handleTiltMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.setProperty('--rotateX', '0deg');
    card.style.setProperty('--rotateY', '0deg');
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* Welcome Banner */}
      <div className="dash-hero dash-reveal">
        <div className="dash-hero-title">Welcome back, {teacherData.full_name} 👋</div>
        <div className="dash-hero-sub">Department: {teacherData.department}</div>
        <div className="dash-hero-badges">
          <span className="dash-badge">👨‍🏫 Faculty Member</span>
          <span className="dash-badge dash-badge-gold">{stats.total_subjects} Active Classes</span>
        </div>
      </div>

      {/* Stats */}
      <div className="dash-body dash-reveal">
      <div className="dash-stat-grid">
        {[
          { label: "Total Classes", value: stats.total_subjects, icon: "📚", color: "linear-gradient(135deg, #0f172a, #1e293b)" },
          { label: "Total Students", value: stats.total_students, icon: "🎓", color: "linear-gradient(135deg, #fbbf24, #f59e0b)" },
          { label: "Class Avg. Grade", value: `${stats.avg_grade}%`, icon: "📈", color: "linear-gradient(135deg, #10b981, #059669)" },
          { label: "Pending Requests", value: gradeRequestsTeacher.filter(r => r.status === "pending").length, icon: "📨", color: "linear-gradient(135deg, #dc2626, #f97316)" },
        ].map((s, i) => (
          <div 
            key={s.label} 
            className="dash-stat-card"
            ref={(el) => { cardRefs.current[i] = el; }}
            onMouseMove={(e) => handleTiltMouseMove(e, i)}
            onMouseLeave={() => handleTiltMouseLeave(i)}
            style={{
              background: s.color,
              transform: 'translateY(0) rotateX(var(--rotateX, 0deg)) rotateY(var(--rotateY, 0deg))',
              transformStyle: 'preserve-3d',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            <span className="dash-stat-icon">{s.icon}</span>
            <div className="dash-stat-label" style={{ color: 'rgba(255,255,255,0.8)' }}>{s.label}</div>
            <div className="dash-stat-value" style={{ color: 'white' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div className="dash-reveal mt-4">
        <p className="dash-section-label">Quick Access</p>
        <div className="dash-quick-grid">
          {[
            { id: "subjects", label: "My Classes", icon: "📚" },
            { id: "schedule", label: "My Schedule", icon: "📅" },
            { id: "students", label: "My Students", icon: "🎓" },
            { id: "grades", label: "Submit Grades", icon: "📊" },
            { id: "requests", label: "Grade Requests", icon: "📨" },
            { id: "documents", label: "Documents", icon: "📄" },
            { id: "notifications", label: "Notifications", icon: "🔔" },
            { id: "attendance", label: "Attendance", icon: "✓" },
          ].map(q => (
            <button key={q.id} type="button" onClick={() => setPanel(q.id as Panel)} className="dash-quick-btn border-0">
              <span>{q.icon}</span>
              <span>{q.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row g-4 dash-reveal mt-4">
        <div className="col-12 col-lg-6">
          <div className="dash-list-card h-100 card-glow-border">
            <h3 style={{ 
              background: 'linear-gradient(135deg, #dc2626, #f97316, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Recent Activity</h3>
            <div className="d-flex flex-column gap-2">
              {recentActivity.map((a, i) => (
                <div key={i} className="dash-list-item">
                  <div className="dash-list-icon">{a.icon}</div>
                  <div className="flex-grow-1 overflow-hidden">
                    <div className="small fw-semibold text-truncate">{a.action}</div>
                    <div className="text-muted" style={{ fontSize: 11 }}>{a.name}</div>
                  </div>
                  <span className="text-muted flex-shrink-0" style={{ fontSize: 11 }}>{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="dash-list-card h-100 card-glow-border">
            <h3 style={{ 
              background: 'linear-gradient(135deg, #dc2626, #f97316, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Class Summary</h3>
            <div className="d-flex flex-column gap-2">
              {subjects.map(s => (
                <div key={s.id} className="dash-list-item">
                  <div>
                    <div className="small fw-semibold">{s.name}</div>
                    <div className="text-muted" style={{ fontSize: 11 }}>{s.code}</div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold small" style={{ color: "#fbbf24" }}>{s.enrolled}/{s.max}</div>
                    <div className="text-muted" style={{ fontSize: 11 }}>Enrolled</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

/* ── Schedule Panel ── */
function SchedulePanel({ setPanel }: { setPanel: (p: Panel) => void }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const todayIdx = Math.min(new Date().getDay() - 1, 4);
  const [day, setDay] = useState(days[todayIdx >= 0 ? todayIdx : 0]);
  const daySchedule = teacherSchedule.filter(s => s.day === day);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleTiltMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (mouseY - centerY) / 15;
    const rotateY = (centerX - mouseX) / 15;
    card.style.setProperty('--rotateX', `${rotateX}deg`);
    card.style.setProperty('--rotateY', `${rotateY}deg`);
  };

  const handleTiltMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.setProperty('--rotateX', '0deg');
    card.style.setProperty('--rotateY', '0deg');
  };

  return (
    <div className="d-flex flex-column gap-4 scroll-reveal">
      <div className="d-flex flex-column flex-sm-row align-items-start justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 mb-0" style={{
              background: 'linear-gradient(135deg, #dc2626, #f97316, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>My Teaching Schedule</h2><p className="text-white-50 small mb-0">Term 1 · 2025–2026</p></div>
      </div>
      <div className="d-flex gap-2 overflow-auto pb-1">
        {days.map(d => (
          <button key={d} onClick={() => setDay(d)}
            className={`btn btn-sm flex-shrink-0 ${day === d ? "shadow-sm" : "btn-outline-secondary"}`}
            style={day === d ? { background: 'linear-gradient(135deg, #dc2626, #f97316)', border: 'none', color: 'white' } : { borderColor: '#dc2626', color: '#dc2626' }}
            onMouseEnter={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(220,38,38,0.3)'; } }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {d.slice(0, 3)}
          </button>
        ))}
      </div>
      {daySchedule.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-3">
          <div className="card-body p-4 text-center text-muted">
            <p className="small mb-0">No classes scheduled for {day}</p>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column gap-2">
          {daySchedule.map((cls, i) => (
            <div key={i} className="card border-0 shadow-sm rounded-3 card-glow-border"
                 ref={(el) => { cardRefs.current[i] = el; }}
                 onMouseMove={(e) => handleTiltMouseMove(e, i)}
                 onMouseLeave={() => handleTiltMouseLeave(i)}
                 style={{
                   background: 'white',
                   transform: 'translateY(0) rotateX(var(--rotateX, 0deg)) rotateY(var(--rotateY, 0deg))',
                   transformStyle: 'preserve-3d',
                   transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                 }}
            >
              <div className="card-body p-4">
                <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                  <div>
                    <div className="fw-bold mb-1" style={{ color: '#0f172a' }}>{cls.subject}</div>
                    <div className="text-muted small">📍 {cls.room}</div>
                  </div>
                  <span className="badge" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white' }}>{cls.time}</span>
                </div>
                <div className="row g-3">
                  <div className="col-6 col-sm-3">
                    <div className="rounded-3 p-3 bg-light border">
                      <div className="text-muted small mb-1">📍 Room</div>
                      <div className="fw-bold text-dark">{cls.room}</div>
                    </div>
                  </div>
                  <div className="col-6 col-sm-3">
                    <div className="rounded-3 p-3 bg-success bg-opacity-10 border border-success border-opacity-25">
                      <div className="text-muted small mb-1">🚪 Enter</div>
                      <div className="fw-bold text-success">{cls.enter}</div>
                    </div>
                  </div>
                  <div className="col-6 col-sm-3">
                    <div className="rounded-3 p-3 bg-danger bg-opacity-10 border border-danger border-opacity-25">
                      <div className="text-muted small mb-1">🚪 Leave</div>
                      <div className="fw-bold text-danger">{cls.leave}</div>
                    </div>
                  </div>
                  <div className="col-6 col-sm-3">
                    <div className="rounded-3 p-3 bg-info bg-opacity-10 border border-info border-opacity-25">
                      <div className="text-muted small mb-1">👥 Students</div>
                      <div className="fw-bold text-info">{subjects.find(s => s.name === cls.subject)?.enrolled || 0}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Subjects Panel ── */
function SubjectsPanel({ setPanel }: { setPanel: (p: Panel) => void }) {
  return (
    <div className="d-flex flex-column gap-4 scroll-reveal">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 mb-0" style={{
              background: 'linear-gradient(135deg, #dc2626, #f97316, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>My Classes</h2><p className="text-white-50 small mb-0">{subjects.length} classes assigned</p></div>
      </div>
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden card-glow-border" style={{ background: 'white' }}>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.1), rgba(251,191,36,0.1))' }}>
              <tr>
                <th className="small fw-semibold text-uppercase ps-4" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>Code</th>
                <th className="small fw-semibold text-uppercase" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>Subject</th>
                <th className="small fw-semibold text-uppercase d-none d-sm-table-cell" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>Units</th>
                <th className="small fw-semibold text-uppercase text-end" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>Enrollment</th>
                <th className="small fw-semibold text-uppercase text-end pe-4" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(s => (
                <tr key={s.id}>
                  <td className="ps-4 font-mono small fw-semibold" style={{ color: '#64748b' }}>{s.code}</td>
                  <td className="small fw-medium" style={{ color: '#0f172a' }}>{s.name}</td>
                  <td className="d-none d-sm-table-cell small" style={{ color: '#64748b' }}>{s.units}</td>
                  <td className="text-end">
                    <div className="d-flex align-items-center justify-content-end gap-2">
                      <div className="progress flex-shrink-0" style={{ width: 60, height: 6 }}>
                        <div className="progress-bar" style={{ width: `${(s.enrolled / s.max) * 100}%`, background: 'linear-gradient(90deg, #dc2626, #f97316, #fbbf24)' }} />
                      </div>
                      <span className="small fw-semibold" style={{ color: '#0f172a' }}>{s.enrolled}/{s.max}</span>
                    </div>
                  </td>
                  <td className="text-end pe-4">
                    <button className="btn btn-sm" style={{ 
                      fontSize: 11, 
                      background: 'linear-gradient(135deg, #dc2626, #f97316)', 
                      border: 'none', 
                      color: 'white' 
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(220,38,38,0.3)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Students Panel ── */
function StudentsPanel({ setPanel }: { setPanel: (p: Panel) => void }) {
  const [search, setSearch] = useState("");
  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="d-flex flex-column gap-4 scroll-reveal">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 mb-0" style={{
              background: 'linear-gradient(135deg, #dc2626, #f97316, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>My Students</h2><p className="text-white-50 small mb-0">{students.length} students in your classes</p></div>
      </div>
      <div className="input-group shadow-sm">
        <span className="input-group-text bg-white">🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or ID..." className="form-control border-start-0" />
      </div>
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden card-glow-border" style={{ background: 'white' }}>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.1), rgba(251,191,36,0.1))' }}>
              <tr>
                <th className="small fw-semibold text-uppercase ps-4" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>Name</th>
                <th className="small fw-semibold text-uppercase d-none d-sm-table-cell" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>ID</th>
                <th className="small fw-semibold text-uppercase d-none d-lg-table-cell" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>Pathway</th>
                <th className="small fw-semibold text-uppercase d-none d-lg-table-cell" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>Grade</th>
                <th className="small fw-semibold text-uppercase" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0
                ? <tr><td colSpan={5} className="text-center py-4 small" style={{ color: '#64748b' }}>No students found.</td></tr>
                : filtered.map(s => (
                  <tr key={s.id}>
                    <td className="ps-4 small fw-medium" style={{ color: '#0f172a' }}>{s.name}</td>
                    <td className="d-none d-sm-table-cell font-mono small" style={{ color: '#64748b' }}>{s.id}</td>
                    <td className="d-none d-lg-table-cell small" style={{ color: '#64748b' }}>{s.pathway}</td>
                    <td className="d-none d-lg-table-cell small" style={{ color: '#64748b' }}>Grade {s.grade}</td>
                    <td><span className="badge" style={s.status === "Active" ? { background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' } : { background: 'linear-gradient(135deg, #64748b, #475569)', color: 'white' }}>{s.status}</span></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Grades Panel ── */
function GradesPanel({ setPanel }: { setPanel: (p: Panel) => void }) {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0].id);
  const subjectGrades = grades.filter(g => g.subject === subjects.find(s => s.id === selectedSubject)?.name);
  const avg = subjectGrades.length > 0 ? Math.round(subjectGrades.reduce((a, g) => a + g.percentage, 0) / subjectGrades.length) : 0;

  return (
    <div className="d-flex flex-column gap-4 scroll-reveal">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 mb-0" style={{
              background: 'linear-gradient(135deg, #dc2626, #f97316, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Grade Management</h2><p className="text-white-50 small mb-0">Submit and manage student grades</p></div>
      </div>
      <div className="d-flex flex-column flex-sm-row gap-3">
        <div style={{ width: 220 }}>
          <label className="form-label fw-semibold text-uppercase mb-1" style={{ fontSize: 11, color: '#0f172a' }}>Select Subject</label>
          <select value={selectedSubject} onChange={e => setSelectedSubject(Number(e.target.value))} className="form-select form-select-sm rounded-3">
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="flex-grow-1 rounded-3 p-3 d-flex align-items-center gap-3 card-glow-border" style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.1), rgba(251,191,36,0.1))', border: '1px solid rgba(220,38,38,0.2)' }}>
          <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0" style={{ width: 44, height: 44, fontSize: 16, background: 'linear-gradient(135deg, #dc2626, #f97316)' }}>📊</div>
          <div className="flex-grow-1"><div className="fw-bold" style={{ color: '#0f172a' }}>{subjects.find(s => s.id === selectedSubject)?.name}</div><div className="small" style={{ color: '#64748b' }}>{subjectGrades.length} students graded</div></div>
          <div className="text-end"><div className="fw-black fs-3" style={{ color: '#dc2626' }}>{avg}%</div><div className="small" style={{ color: '#64748b' }}>Class Average</div></div>
        </div>
      </div>
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden card-glow-border" style={{ background: 'white' }}>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.1), rgba(251,191,36,0.1))' }}>
              <tr>
                <th className="small fw-semibold text-uppercase ps-4" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>Student</th>
                <th className="small fw-semibold text-uppercase d-none d-sm-table-cell" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>ID</th>
                <th className="small fw-semibold text-uppercase text-end" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>Score</th>
                <th className="small fw-semibold text-uppercase text-end pe-4" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {subjectGrades.map((g, i) => (
                <tr key={i}>
                  <td className="ps-4 small fw-medium" style={{ color: '#0f172a' }}>{g.name}</td>
                  <td className="d-none d-sm-table-cell font-mono small" style={{ color: '#64748b' }}>{g.student_id}</td>
                  <td className="text-end">
                    <div className="d-flex align-items-center justify-content-end gap-2">
                      <div className="progress flex-shrink-0" style={{ width: 60, height: 6 }}>
                        <div className="progress-bar" style={{ width: `${g.percentage}%`, background: 'linear-gradient(90deg, #dc2626, #f97316, #fbbf24)' }} />
                      </div>
                      <span className="small fw-semibold" style={{ color: '#0f172a' }}>{g.percentage}%</span>
                    </div>
                  </td>
                  <td className="text-end pe-4 fw-black small" style={{ color: '#dc2626' }}>{g.percentage >= 90 ? "A" : g.percentage >= 80 ? "B" : "C"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Grade Requests Panel ── */
function RequestsPanel({ setPanel }: { setPanel: (p: Panel) => void }) {
  const [requests, setRequests] = useState(gradeRequestsTeacher);

  function handleRequest(id: number, action: "approve" | "reject") {
    setRequests(prev =>
      prev.map(r =>
        r.id === id
          ? { ...r, status: action === "approve" ? "approved" : "rejected" }
          : r
      )
    );
  }

  const pending = requests.filter(r => r.status === "pending");
  const processed = requests.filter(r => r.status !== "pending");

  return (
    <div className="d-flex flex-column gap-4 scroll-reveal">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 mb-0" style={{
              background: 'linear-gradient(135deg, #dc2626, #f97316, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Grade Requests</h2><p className="text-white-50 small mb-0">Manage student grade requests for Term 3</p></div>
      </div>

      {/* Stats */}
      <div className="row g-3">
        {[
          { label: "Pending", value: pending.length, icon: "⏳", color: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
          { label: "Approved", value: requests.filter(r => r.status === "approved").length, icon: "✓", color: 'linear-gradient(135deg, #10b981, #059669)' },
          { label: "Rejected", value: requests.filter(r => r.status === "rejected").length, icon: "✕", color: 'linear-gradient(135deg, #dc2626, #f97316)' },
        ].map(s => (
          <div key={s.label} className="col-4">
            <div className="card border-0 rounded-3 card-glow-border" style={{ background: s.color }}>
              <div className="card-body p-3 text-center">
                <div className="small mb-1" style={{ color: 'rgba(255,255,255,0.8)' }}>{s.label}</div>
                <div className="fw-black fs-3" style={{ color: 'white' }}>{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pending Requests */}
      {pending.length > 0 && (
        <div>
          <h3 className="fw-bold small mb-3" style={{ color: '#0f172a' }}>⏳ Pending Requests</h3>
          <div className="d-flex flex-column gap-2">
            {pending.map(req => (
              <div key={req.id} className="card border-0 shadow-sm rounded-3 card-glow-border" style={{ background: 'white' }}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                    <div>
                      <div className="fw-bold" style={{ color: '#0f172a' }}>{req.student}</div>
                      <div className="small" style={{ color: '#64748b' }}>{req.subject} · Requested {req.requestedAt}</div>
                    </div>
                    <span className="badge" style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: 'white' }}>Pending</span>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      onClick={() => handleRequest(req.id, "approve")}
                      className="btn btn-sm flex-grow-1"
                      style={{ fontSize: 12, background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: 'white' }}
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => handleRequest(req.id, "reject")}
                      className="btn btn-sm flex-grow-1"
                      style={{ fontSize: 12, background: 'linear-gradient(135deg, #dc2626, #f97316)', border: 'none', color: 'white' }}
                    >
                      ✕ Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Processed Requests */}
      {processed.length > 0 && (
        <div>
          <h3 className="fw-bold small mb-3" style={{ color: '#0f172a' }}>✓ Processed Requests</h3>
          <div className="d-flex flex-column gap-2">
            {processed.map(req => (
              <div key={req.id} className="card border-0 shadow-sm rounded-3 opacity-75" style={{ background: 'white' }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div className="fw-bold small" style={{ color: '#0f172a' }}>{req.student}</div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>{req.subject}</div>
                    </div>
                    <span className="badge" style={req.status === "approved" ? { background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' } : { background: 'linear-gradient(135deg, #dc2626, #f97316)', color: 'white' }}>
                      {req.status === "approved" ? "✓ Approved" : "✕ Rejected"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {requests.length === 0 && (
        <div className="card border-0 shadow-sm rounded-3">
          <div className="card-body p-4 text-center text-muted">
            <p className="small mb-0">No grade requests at this time.</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Document Approvals Panel (Teacher) ── */
function DocumentApprovalsPanel({ setPanel }: { setPanel: (p: Panel) => void }) {
  const [docs, setDocs] = useState(documentApprovals);

  function approveDocument(id: number) {
    setDocs(prev =>
      prev.map(d =>
        d.id === id
          ? { ...d, status: "approved", approvedAt: new Date().toLocaleDateString() }
          : d
      )
    );
  }

  function rejectDocument(id: number) {
    setDocs(prev => prev.filter(d => d.id !== id));
  }

  const pending = docs.filter(d => d.status === "pending");
  const approved = docs.filter(d => d.status === "approved");

  return (
    <div className="d-flex flex-column gap-4 scroll-reveal">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 mb-0" style={{
              background: 'linear-gradient(135deg, #dc2626, #f97316, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Document Approvals</h2><p className="text-white-50 small mb-0">Verify and approve student document requests</p></div>
      </div>

      {/* Stats */}
      <div className="row g-3">
        {[
          { label: "Pending", value: pending.length, icon: "⏳", color: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
          { label: "Approved", value: approved.length, icon: "✓", color: 'linear-gradient(135deg, #10b981, #059669)' },
        ].map(s => (
          <div key={s.label} className="col-6">
            <div className="card border-0 rounded-3 card-glow-border" style={{ background: s.color }}>
              <div className="card-body p-3 text-center">
                <div className="small mb-1" style={{ color: 'rgba(255,255,255,0.8)' }}>{s.label}</div>
                <div className="fw-black fs-3" style={{ color: 'white' }}>{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div>
          <h3 className="fw-bold small mb-3" style={{ color: '#0f172a' }}>⏳ Pending Approvals</h3>
          <div className="d-flex flex-column gap-2">
            {pending.map(doc => (
              <div key={doc.id} className="card border-0 shadow-sm rounded-3 card-glow-border" style={{ background: 'white' }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div>
                      <div className="fw-bold small" style={{ color: '#0f172a' }}>{doc.student}</div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>{doc.type} · Requested {doc.requestedAt}</div>
                    </div>
                    <span className="badge" style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: 'white' }}>Pending</span>
                  </div>
                  <div className="d-flex gap-2">
                    <button onClick={() => approveDocument(doc.id)} className="btn btn-sm flex-grow-1" style={{ fontSize: 11, background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: 'white' }}>✓ Approve</button>
                    <button onClick={() => rejectDocument(doc.id)} className="btn btn-sm flex-grow-1" style={{ fontSize: 11, background: 'linear-gradient(135deg, #dc2626, #f97316)', border: 'none', color: 'white' }}>✕ Reject</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved */}
      {approved.length > 0 && (
        <div>
          <h3 className="fw-bold small mb-3" style={{ color: '#0f172a' }}>✓ Approved Documents</h3>
          <div className="d-flex flex-column gap-2">
            {approved.map(doc => (
              <div key={doc.id} className="card border-0 shadow-sm rounded-3 opacity-75" style={{ background: 'white' }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div className="fw-bold small" style={{ color: '#0f172a' }}>{doc.student}</div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>{doc.type} · Approved {doc.approvedAt}</div>
                    </div>
                    <span className="badge" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}>✓ Approved</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Notifications Panel (Teacher) ── */
function TeacherNotificationsPanel({ setPanel }: { setPanel: (p: Panel) => void }) {
  const [notifs, setNotifs] = useState(teacherNotifications);

  function markAsRead(id: number) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function deleteNotification(id: number) {
    setNotifs(prev => prev.filter(n => n.id !== id));
  }

  const unread = notifs.filter(n => !n.read);
  const read = notifs.filter(n => n.read);

  return (
    <div className="d-flex flex-column gap-4 scroll-reveal">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 mb-0" style={{
              background: 'linear-gradient(135deg, #dc2626, #f97316, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Notifications</h2><p className="text-white-50 small mb-0">{unread.length} unread</p></div>
      </div>

      {/* Unread */}
      {unread.length > 0 && (
        <div>
          <h3 className="fw-bold small mb-3" style={{ color: '#0f172a' }}>🔔 Unread</h3>
          <div className="d-flex flex-column gap-2">
            {unread.map(notif => (
              <div key={notif.id} className="card border-0 shadow-sm rounded-3 card-glow-border" style={{ background: "rgba(220, 38, 38, 0.12)", border: "1px solid rgba(220, 38, 38, 0.3)" }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-start gap-3">
                    <span style={{ fontSize: 18 }}>{notif.icon}</span>
                    <div className="flex-grow-1">
                      <div className="fw-bold small" style={{ color: '#0f172a' }}>{notif.title}</div>
                      <div className="small mt-1" style={{ color: '#64748b' }}>{notif.message}</div>
                      <div className="small mt-2" style={{ fontSize: 11, color: '#64748b' }}>{notif.time}</div>
                    </div>
                    <div className="d-flex gap-1 flex-shrink-0">
                      <button onClick={() => markAsRead(notif.id)} className="btn btn-link btn-sm p-0" style={{ fontSize: 11, color: '#dc2626' }}>✓</button>
                      <button onClick={() => deleteNotification(notif.id)} className="btn btn-link btn-sm p-0" style={{ fontSize: 11, color: '#dc2626' }}>✕</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Read */}
      {read.length > 0 && (
        <div>
          <h3 className="fw-bold small mb-3" style={{ color: '#0f172a' }}>✓ Read</h3>
          <div className="d-flex flex-column gap-2">
            {read.map(notif => (
              <div key={notif.id} className="card border-0 shadow-sm rounded-3 opacity-75 card-glow-border" style={{ background: 'white' }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-start justify-content-between gap-3">
                    <div className="d-flex align-items-start gap-3 flex-grow-1">
                      <span style={{ fontSize: 16 }}>{notif.icon}</span>
                      <div>
                        <div className="fw-bold small" style={{ color: '#0f172a' }}>{notif.title}</div>
                        <div className="small mt-1" style={{ color: '#64748b' }}>{notif.message}</div>
                      </div>
                    </div>
                    <button onClick={() => deleteNotification(notif.id)} className="btn btn-link btn-sm p-0 flex-shrink-0" style={{ fontSize: 11, color: '#dc2626' }}>✕</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Attendance Panel ── */
function AttendancePanel({ setPanel }: { setPanel: (p: Panel) => void }) {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0].id);
  const subjectAttendance = attendance.filter(a => a.subject === subjects.find(s => s.id === selectedSubject)?.name);
  const avgAttendance = subjectAttendance.length > 0 ? Math.round(subjectAttendance.reduce((a, att) => a + att.percentage, 0) / subjectAttendance.length) : 0;

  return (
    <div className="d-flex flex-column gap-4 scroll-reveal">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 mb-0" style={{
              background: 'linear-gradient(135deg, #dc2626, #f97316, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Attendance Management</h2><p className="text-white-50 small mb-0">Track and manage student attendance</p></div>
      </div>
      <div className="d-flex flex-column flex-sm-row gap-3">
        <div style={{ width: 220 }}>
          <label className="form-label fw-semibold text-uppercase mb-1" style={{ fontSize: 11, color: '#0f172a' }}>Select Subject</label>
          <select value={selectedSubject} onChange={e => setSelectedSubject(Number(e.target.value))} className="form-select form-select-sm rounded-3">
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="flex-grow-1 rounded-3 p-3 d-flex align-items-center gap-3 card-glow-border" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(251, 191, 36, 0.1))', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0" style={{ width: 44, height: 44, fontSize: 16, background: 'linear-gradient(135deg, #10b981, #059669)' }}>✓</div>
          <div className="flex-grow-1"><div className="fw-bold" style={{ color: '#0f172a' }}>{subjects.find(s => s.id === selectedSubject)?.name}</div><div className="small" style={{ color: '#64748b' }}>{subjectAttendance.length} students tracked</div></div>
          <div className="text-end"><div className="fw-black fs-3" style={{ color: '#10b981' }}>{avgAttendance}%</div><div className="small" style={{ color: '#64748b' }}>Class Average</div></div>
        </div>
      </div>
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden card-glow-border" style={{ background: 'white' }}>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(251, 191, 36, 0.1))' }}>
              <tr>
                <th className="small fw-semibold text-uppercase ps-4" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>Student</th>
                <th className="small fw-semibold text-uppercase d-none d-sm-table-cell" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>ID</th>
                <th className="small fw-semibold text-uppercase text-center" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>Present</th>
                <th className="small fw-semibold text-uppercase text-center" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>Total</th>
                <th className="small fw-semibold text-uppercase text-end pe-4" style={{ letterSpacing: "0.05em", color: '#0f172a' }}>%</th>
              </tr>
            </thead>
            <tbody>
              {subjectAttendance.map((a, i) => (
                <tr key={i}>
                  <td className="ps-4 small fw-medium" style={{ color: '#0f172a' }}>{a.name}</td>
                  <td className="d-none d-sm-table-cell font-mono small" style={{ color: '#64748b' }}>{a.student_id}</td>
                  <td className="text-center small" style={{ color: '#64748b' }}>{a.present}</td>
                  <td className="text-center small" style={{ color: '#64748b' }}>{a.total}</td>
                  <td className="text-end pe-4 fw-black small" style={{ color: '#10b981' }}>{a.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function TeacherDashboardPage() {
  const [panel, setPanel] = useState<Panel>("overview");

  return (
    <PremiumDashboardShell
      portalTitle="INFORM"
      portalSubtitle="Teacher Portal"
      userName={teacherData.full_name}
      userMeta={`${teacherData.department} · ${teacherData.teacher_id}`}
      logoutHref="/teacher/login"
      maxWidth={1000}
    >
      <div className="dash-glass overflow-hidden">
        {panel === "overview" && <OverviewPanel setPanel={setPanel} />}
        {panel !== "overview" && (
          <div className="p-4">
            <BackBtn onClick={() => setPanel("overview")} />
            {panel === "subjects" && <SubjectsPanel setPanel={setPanel} />}
            {panel === "schedule" && <SchedulePanel setPanel={setPanel} />}
            {panel === "students" && <StudentsPanel setPanel={setPanel} />}
            {panel === "grades" && <GradesPanel setPanel={setPanel} />}
            {panel === "requests" && <RequestsPanel setPanel={setPanel} />}
            {panel === "documents" && <DocumentApprovalsPanel setPanel={setPanel} />}
            {panel === "notifications" && <TeacherNotificationsPanel setPanel={setPanel} />}
            {panel === "attendance" && <AttendancePanel setPanel={setPanel} />}
          </div>
        )}
      </div>
    </PremiumDashboardShell>
  );
}
