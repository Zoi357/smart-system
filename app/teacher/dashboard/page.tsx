"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

type Panel = "overview" | "subjects" | "students" | "grades" | "attendance";

/* ── Back Button ── */
function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="btn btn-link text-primary text-decoration-none ps-0 mb-4 d-flex align-items-center gap-1 small fw-semibold" style={{ fontSize: 13 }}>
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

  return (
    <div className="d-flex flex-column gap-4">
      {/* Welcome Banner */}
      <div className="rounded-3 p-4 d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3"
        style={{ background: "linear-gradient(135deg, #6366f1, #7c3aed)", boxShadow: "0 8px 32px rgba(99, 102, 241, 0.25)" }}>
        <div>
          <h2 className="text-white fw-black fs-4 mb-1">Welcome back, {teacherData.full_name} 👋</h2>
          <p className="text-white-50 small mb-0">Department: <span className="text-white fw-semibold">{teacherData.department}</span></p>
        </div>
        <div className="d-flex align-items-center gap-3 rounded-3 px-4 py-3 flex-shrink-0" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}>
          <span style={{ fontSize: 28 }}>👨‍🏫</span>
          <div><div className="text-white fw-black fs-3 lh-1">{stats.total_subjects}</div><div className="text-white-50 small">Classes</div></div>
        </div>
      </div>

      {/* Stats */}
      <div className="row g-3">
        {[
          { label: "Total Classes", value: stats.total_subjects, icon: "📚", cls: "border-primary-subtle bg-primary-subtle", val: "text-primary" },
          { label: "Total Students", value: stats.total_students, icon: "🎓", cls: "border-success-subtle bg-success-subtle", val: "text-success" },
          { label: "Class Avg. Grade", value: `${stats.avg_grade}%`, icon: "📈", cls: "border-warning-subtle bg-warning-subtle", val: "text-warning" },
        ].map(s => (
          <div key={s.label} className="col-6 col-lg-3">
            <div className={`card border rounded-3 h-100 ${s.cls}`}>
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small">{s.label}</span>
                  <span style={{ fontSize: 20 }}>{s.icon}</span>
                </div>
                <div className={`fw-black fs-3 ${s.val}`}>{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div>
        <p className="text-muted text-uppercase small fw-semibold mb-3" style={{ letterSpacing: "0.08em" }}>Quick Access</p>
        <div className="row g-3">
          {[
            { id: "subjects", label: "My Classes", icon: "📚", bg: "#3b82f6" },
            { id: "students", label: "My Students", icon: "🎓", bg: "#8b5cf6" },
            { id: "grades", label: "Submit Grades", icon: "📊", bg: "#14b8a6" },
            { id: "attendance", label: "Attendance", icon: "✓", bg: "#f59e0b" },
          ].map(q => (
            <div key={q.id} className="col-6 col-sm-4 col-lg-2">
              <button onClick={() => setPanel(q.id as Panel)}
                className="btn w-100 py-3 d-flex flex-column align-items-center gap-2 rounded-3 text-white border-0 shadow-sm"
                style={{ background: q.bg, transition: "transform 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
                <span style={{ fontSize: 28 }}>{q.icon}</span>
                <span className="small fw-bold">{q.label}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body p-4">
              <h3 className="fw-bold small text-dark mb-3">Recent Activity</h3>
              <div className="d-flex flex-column gap-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="d-flex align-items-center gap-3">
                    <div className="rounded-3 bg-light border d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 36, height: 36, fontSize: 18 }}>{a.icon}</div>
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="small fw-semibold text-dark text-truncate">{a.action}</div>
                      <div className="text-muted" style={{ fontSize: 11 }}>{a.name}</div>
                    </div>
                    <span className="text-muted flex-shrink-0" style={{ fontSize: 11 }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body p-4">
              <h3 className="fw-bold small text-dark mb-3">Class Summary</h3>
              <div className="d-flex flex-column gap-2">
                {subjects.map(s => (
                  <div key={s.id} className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-light border border-transparent">
                    <div>
                      <div className="small fw-semibold text-dark">{s.name}</div>
                      <div className="text-muted" style={{ fontSize: 11 }}>{s.code}</div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold text-primary small">{s.enrolled}/{s.max}</div>
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

/* ── Subjects Panel ── */
function SubjectsPanel({ setPanel }: { setPanel: (p: Panel) => void }) {
  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 text-dark mb-0">My Classes</h2><p className="text-muted small mb-0">{subjects.length} classes assigned</p></div>
      </div>
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="small text-muted fw-semibold text-uppercase ps-4" style={{ letterSpacing: "0.05em" }}>Code</th>
                <th className="small text-muted fw-semibold text-uppercase" style={{ letterSpacing: "0.05em" }}>Subject</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-sm-table-cell" style={{ letterSpacing: "0.05em" }}>Units</th>
                <th className="small text-muted fw-semibold text-uppercase text-end" style={{ letterSpacing: "0.05em" }}>Enrollment</th>
                <th className="small text-muted fw-semibold text-uppercase text-end pe-4" style={{ letterSpacing: "0.05em" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(s => (
                <tr key={s.id}>
                  <td className="ps-4 font-mono text-muted small fw-semibold">{s.code}</td>
                  <td className="small fw-medium text-dark">{s.name}</td>
                  <td className="d-none d-sm-table-cell text-muted small">{s.units}</td>
                  <td className="text-end">
                    <div className="d-flex align-items-center justify-content-end gap-2">
                      <div className="progress flex-shrink-0" style={{ width: 60, height: 6 }}>
                        <div className="progress-bar bg-primary" style={{ width: `${(s.enrolled / s.max) * 100}%` }} />
                      </div>
                      <span className="small fw-semibold text-dark">{s.enrolled}/{s.max}</span>
                    </div>
                  </td>
                  <td className="text-end pe-4">
                    <button className="btn btn-primary btn-sm" style={{ fontSize: 11 }}>Manage</button>
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
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 text-dark mb-0">My Students</h2><p className="text-muted small mb-0">{students.length} students in your classes</p></div>
      </div>
      <div className="input-group shadow-sm">
        <span className="input-group-text bg-white">🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or ID..." className="form-control border-start-0" />
      </div>
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="small text-muted fw-semibold text-uppercase ps-4" style={{ letterSpacing: "0.05em" }}>Name</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-sm-table-cell" style={{ letterSpacing: "0.05em" }}>ID</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-lg-table-cell" style={{ letterSpacing: "0.05em" }}>Pathway</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-lg-table-cell" style={{ letterSpacing: "0.05em" }}>Grade</th>
                <th className="small text-muted fw-semibold text-uppercase" style={{ letterSpacing: "0.05em" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0
                ? <tr><td colSpan={5} className="text-center text-muted py-4 small">No students found.</td></tr>
                : filtered.map(s => (
                  <tr key={s.id}>
                    <td className="ps-4 small fw-medium text-dark">{s.name}</td>
                    <td className="d-none d-sm-table-cell font-mono text-muted small">{s.id}</td>
                    <td className="d-none d-lg-table-cell text-muted small">{s.pathway}</td>
                    <td className="d-none d-lg-table-cell text-muted small">Grade {s.grade}</td>
                    <td><span className={`badge ${s.status === "Active" ? "bg-success-subtle text-success border border-success-subtle" : "bg-secondary-subtle text-secondary border border-secondary-subtle"}`}>{s.status}</span></td>
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
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 text-dark mb-0">Grade Management</h2><p className="text-muted small mb-0">Submit and manage student grades</p></div>
      </div>
      <div className="d-flex flex-column flex-sm-row gap-3">
        <div style={{ width: 220 }}>
          <label className="form-label text-muted fw-semibold text-uppercase mb-1" style={{ fontSize: 11 }}>Select Subject</label>
          <select value={selectedSubject} onChange={e => setSelectedSubject(Number(e.target.value))} className="form-select form-select-sm rounded-3">
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="flex-grow-1 rounded-3 p-3 d-flex align-items-center gap-3 bg-primary bg-opacity-10 border border-primary border-opacity-25">
          <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0" style={{ width: 44, height: 44, fontSize: 16 }}>📊</div>
          <div className="flex-grow-1"><div className="fw-bold text-dark">{subjects.find(s => s.id === selectedSubject)?.name}</div><div className="text-muted small">{subjectGrades.length} students graded</div></div>
          <div className="text-end"><div className="fw-black fs-3 text-primary">{avg}%</div><div className="text-muted small">Class Average</div></div>
        </div>
      </div>
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="small text-muted fw-semibold text-uppercase ps-4" style={{ letterSpacing: "0.05em" }}>Student</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-sm-table-cell" style={{ letterSpacing: "0.05em" }}>ID</th>
                <th className="small text-muted fw-semibold text-uppercase text-end" style={{ letterSpacing: "0.05em" }}>Score</th>
                <th className="small text-muted fw-semibold text-uppercase text-end pe-4" style={{ letterSpacing: "0.05em" }}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {subjectGrades.map((g, i) => (
                <tr key={i}>
                  <td className="ps-4 small fw-medium text-dark">{g.name}</td>
                  <td className="d-none d-sm-table-cell font-mono text-muted small">{g.student_id}</td>
                  <td className="text-end">
                    <div className="d-flex align-items-center justify-content-end gap-2">
                      <div className="progress flex-shrink-0" style={{ width: 60, height: 6 }}>
                        <div className="progress-bar bg-primary" style={{ width: `${g.percentage}%` }} />
                      </div>
                      <span className="small fw-semibold text-dark">{g.percentage}%</span>
                    </div>
                  </td>
                  <td className="text-end pe-4 fw-black small text-primary">{g.percentage >= 90 ? "A" : g.percentage >= 80 ? "B" : "C"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Attendance Panel ── */
function AttendancePanel({ setPanel }: { setPanel: (p: Panel) => void }) {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0].id);
  const subjectAttendance = attendance.filter(a => a.subject === subjects.find(s => s.id === selectedSubject)?.name);
  const avgAttendance = subjectAttendance.length > 0 ? Math.round(subjectAttendance.reduce((a, att) => a + att.percentage, 0) / subjectAttendance.length) : 0;

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 text-dark mb-0">Attendance Management</h2><p className="text-muted small mb-0">Track and manage student attendance</p></div>
      </div>
      <div className="d-flex flex-column flex-sm-row gap-3">
        <div style={{ width: 220 }}>
          <label className="form-label text-muted fw-semibold text-uppercase mb-1" style={{ fontSize: 11 }}>Select Subject</label>
          <select value={selectedSubject} onChange={e => setSelectedSubject(Number(e.target.value))} className="form-select form-select-sm rounded-3">
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="flex-grow-1 rounded-3 p-3 d-flex align-items-center gap-3 bg-success bg-opacity-10 border border-success border-opacity-25">
          <div className="rounded-circle bg-success d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0" style={{ width: 44, height: 44, fontSize: 16 }}>✓</div>
          <div className="flex-grow-1"><div className="fw-bold text-dark">{subjects.find(s => s.id === selectedSubject)?.name}</div><div className="text-muted small">{subjectAttendance.length} students tracked</div></div>
          <div className="text-end"><div className="fw-black fs-3 text-success">{avgAttendance}%</div><div className="text-muted small">Class Average</div></div>
        </div>
      </div>
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="small text-muted fw-semibold text-uppercase ps-4" style={{ letterSpacing: "0.05em" }}>Student</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-sm-table-cell" style={{ letterSpacing: "0.05em" }}>ID</th>
                <th className="small text-muted fw-semibold text-uppercase text-center" style={{ letterSpacing: "0.05em" }}>Present</th>
                <th className="small text-muted fw-semibold text-uppercase text-center" style={{ letterSpacing: "0.05em" }}>Total</th>
                <th className="small text-muted fw-semibold text-uppercase text-end pe-4" style={{ letterSpacing: "0.05em" }}>%</th>
              </tr>
            </thead>
            <tbody>
              {subjectAttendance.map((a, i) => (
                <tr key={i}>
                  <td className="ps-4 small fw-medium text-dark">{a.name}</td>
                  <td className="d-none d-sm-table-cell font-mono text-muted small">{a.student_id}</td>
                  <td className="text-center text-muted small">{a.present}</td>
                  <td className="text-center text-muted small">{a.total}</td>
                  <td className="text-end pe-4 fw-black small text-success">{a.percentage}%</td>
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
    <div className="d-flex flex-column align-items-center justify-content-start px-3 py-4 position-relative" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc 0%, #f0f4f8 50%, #f8fafc 100%)", padding: "20px" }}>
      <div className="card border-0 shadow-lg rounded-3 overflow-hidden position-relative" style={{ maxWidth: 1000, width: "100%" }}>
        {/* Header */}
        <div className="p-4 text-white text-center" style={{ background: "linear-gradient(135deg, #1e40af, #7c3aed)" }}>
          <h1 className="fw-black fs-4 mb-1">Teacher Dashboard</h1>
          <p className="text-white-50 small mb-0">Manage your classes, grades, and attendance</p>
        </div>

        {/* Content */}
        <div className="card-body p-4">
          {panel === "overview" && <OverviewPanel setPanel={setPanel} />}
          {panel === "subjects" && <><BackBtn onClick={() => setPanel("overview")} /><SubjectsPanel setPanel={setPanel} /></>}
          {panel === "students" && <><BackBtn onClick={() => setPanel("overview")} /><StudentsPanel setPanel={setPanel} /></>}
          {panel === "grades" && <><BackBtn onClick={() => setPanel("overview")} /><GradesPanel setPanel={setPanel} /></>}
          {panel === "attendance" && <><BackBtn onClick={() => setPanel("overview")} /><AttendancePanel setPanel={setPanel} /></>}
        </div>

        {/* Footer */}
        <div className="card-footer border-top text-center py-3" style={{ background: "#f9fafb" }}>
          <p className="text-muted small mb-1">© 2026 Cebu Far East Institute. All rights reserved.</p>
          <Link href="/teacher/login" className="btn btn-outline-primary btn-sm">↪ Log Out</Link>
        </div>
      </div>
    </div>
  );
}
