"use client";

import { useState } from "react";
import Link from "next/link";

/* ── Data ── */
const students = [
  { id:"STU-2024-001", name:"Jamie Santos",    track:"STEM", grade:11, gwa:1.75, status:"Active",   tuition:"Paid",   room:1 },
  { id:"STU-2024-002", name:"Maria Reyes",     track:"HUMMS", grade:11, gwa:2.00, status:"Active",   tuition:"Unpaid", room:2 },
  { id:"STU-2024-003", name:"Carlo Dela Cruz", track:"ABM", grade:12, gwa:1.50, status:"Active",   tuition:"Paid",   room:3 },
  { id:"STU-2024-004", name:"Ana Villanueva",  track:"GAS",  grade:11, gwa:2.25, status:"Inactive", tuition:"Unpaid", room:4 },
  { id:"STU-2024-005", name:"Luis Fernandez",  track:"STEM", grade:12, gwa:1.25, status:"Active",   tuition:"Paid",   room:1 },
  { id:"STU-2024-006", name:"Rosa Bautista",   track:"TVL", grade:11, gwa:2.50, status:"Active",   tuition:"Paid",   room:2 },
  { id:"STU-2024-007", name:"Mark Uy",         track:"ABM", grade:12, gwa:3.00, status:"Active",   tuition:"Unpaid", room:3 },
  { id:"STU-2024-008", name:"Lena Cruz",       track:"HUMMS",  grade:11, gwa:1.75, status:"Active",   tuition:"Paid",   room:4 },
];

const teachers = [
  {
    id: "T001", name: "Maria Santos", employmentStatus: "Full Time",
    section: "STEM-1",
    subjects: [
      { name: "Mathematics", timeIn: "7:30 AM", timeOut: "9:30 AM" },
      { name: "Physics",     timeIn: "10:00 AM", timeOut: "12:00 PM" },
    ],
    room: 1,
  },
  {
    id: "T002", name: "Juan Dela Cruz", employmentStatus: "Part Time",
    section: "HUMMS-1",
    subjects: [
      { name: "English Literature", timeIn: "8:00 AM", timeOut: "10:00 AM" },
      { name: "History",            timeIn: "1:00 PM", timeOut: "3:00 PM" },
    ],
    room: 2,
  },
  {
    id: "T003", name: "Ana Reyes", employmentStatus: "Full Time",
    section: "ABM-1",
    subjects: [
      { name: "Chemistry", timeIn: "7:30 AM", timeOut: "9:30 AM" },
      { name: "Biology",   timeIn: "11:00 AM", timeOut: "1:00 PM" },
    ],
    room: 3,
  },
  {
    id: "T004", name: "Carlos Fernandez", employmentStatus: "Part Time",
    section: "TVL-1",
    subjects: [
      { name: "Computer Science",          timeIn: "9:00 AM", timeOut: "11:00 AM" },
      { name: "Information Technology",    timeIn: "2:00 PM", timeOut: "4:00 PM" },
    ],
    room: 4,
  },
];

const announcements = [
  { id:1, title:"Enrollment Period Open",       date:"May 20, 2026", target:"All Students",   status:"Active" },
  { id:2, title:"Final Exam Schedule Released", date:"May 18, 2026", target:"All Students",   status:"Active" },
  { id:3, title:"Library Hours Extended",       date:"May 15, 2026", target:"All Students",   status:"Active" },
  { id:4, title:"Tuition Deadline Reminder",    date:"May 10, 2026", target:"Unpaid Students",status:"Active" },
  { id:5, title:"Graduation Ceremony Details",  date:"May 5, 2026",  target:"4th Year",       status:"Draft"  },
];

const recentActivity = [
  { action:"New student enrolled",     name:"Rosa Bautista",   time:"2h ago",    icon:"🎓" },
  { action:"Tuition payment received", name:"Carlo Dela Cruz", time:"3h ago",    icon:"💰" },
  { action:"Grade submitted",          name:"Mr. Dela Cruz",   time:"5h ago",    icon:"📊" },
  { action:"Library book returned",    name:"Luis Fernandez",  time:"Yesterday", icon:"📚" },
  { action:"Announcement posted",      name:"Admin",           time:"Yesterday", icon:"📢" },
];

const allGradeRequests = [
  { id: 1, student: "Jamie Santos", teacher: "Mr. Dela Cruz", subject: "Algebra I", status: "pending", requestedAt: "2h ago" },
  { id: 2, student: "Maria Reyes", teacher: "Mr. Dela Cruz", subject: "Algebra I", status: "pending", requestedAt: "1h ago" },
  { id: 3, student: "Carlo Dela Cruz", teacher: "Mr. Fernandez", subject: "Calculus I", status: "approved", requestedAt: "30m ago" },
  { id: 4, student: "Luis Fernandez", teacher: "Ms. Villanueva", subject: "Physics", status: "rejected", requestedAt: "1h ago" },
];

const allDocumentRequests = [
  { id: 1, student: "Jamie Santos", type: "TOR", status: "pending", requestedAt: "May 18, 2026", teacher: "Mr. Dela Cruz" },
  { id: 2, student: "Maria Reyes", type: "Certificate", status: "pending", requestedAt: "May 17, 2026", teacher: "Mr. Dela Cruz" },
  { id: 3, student: "Carlo Dela Cruz", type: "TOR", status: "approved", requestedAt: "May 15, 2026", teacher: "Mr. Fernandez", approvedAt: "May 16, 2026" },
  { id: 4, student: "Ana Villanueva", type: "Good Standing", status: "approved", requestedAt: "May 14, 2026", teacher: "Ms. Villanueva", approvedAt: "May 15, 2026" },
];

const adminNotifications = [
  { id: 1, type: "document", title: "Document Request", message: "Jamie Santos requested a TOR", time: "1h ago", read: false, icon: "📄" },
  { id: 2, type: "grade", title: "Grade Submitted", message: "Mr. Dela Cruz submitted grades for Algebra I", time: "2h ago", read: false, icon: "✓" },
  { id: 3, type: "enrollment", title: "New Enrollment", message: "Rosa Bautista enrolled in the system", time: "1d ago", read: true, icon: "🎓" },
  { id: 4, type: "payment", title: "Payment Received", message: "Carlo Dela Cruz paid tuition fee", time: "2d ago", read: true, icon: "💰" },
];

const navItems = [
  { id:"overview",      label:"Overview",      icon:"🏠" },
  { id:"students",      label:"Students",      icon:"🎓" },
  { id:"teachers",      label:"Teachers",      icon:"👨‍🏫" },
  { id:"grades",        label:"Grades",        icon:"📊" },
  { id:"requests",      label:"Grade Requests", icon:"📨" },
  { id:"documents",     label:"Documents",     icon:"📄" },
  { id:"enrollment",    label:"Enrollment",    icon:"📋" },
  { id:"tuition",       label:"Tuition",       icon:"💰" },
  { id:"notifications", label:"Notifications", icon:"🔔" },
  { id:"announcements", label:"Announcements", icon:"📢" },
];

function initials(name: string) { return name.split(" ").map(n => n[0]).join("").slice(0, 2); }

/* ── Sidebar ── */
function Sidebar({ active, setActive, show, setShow, onExpandChange }: { active:string; setActive:(s:string)=>void; show:boolean; setShow:(b:boolean)=>void; onExpandChange?: (expanded: boolean) => void }) {
  const [expanded, setExpanded] = useState(false);

  const handleMouseEnter = () => {
    setExpanded(true);
    onExpandChange?.(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
    onExpandChange?.(false);
  };

  return (
    <>
      {show && <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none" style={{ zIndex:1040 }} onClick={() => setShow(false)} />}
      <div 
        className={`d-flex flex-column flex-shrink-0 position-fixed position-lg-static top-0 start-0 h-100 ${show ? "" : "d-none d-lg-flex"}`}
        style={{ 
          width: expanded ? 256 : 80, 
          zIndex: 1045, 
          background: "linear-gradient(180deg,#1e1b4b 0%,#312e81 100%)", 
          overflowY: "auto",
          transition: "width 0.3s ease",
          overflowX: "hidden"
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo */}
        <div className="d-flex align-items-center gap-3 px-4 py-4 border-bottom border-white border-opacity-10" style={{ minHeight: 80 }}>
          <img src="/cfei-logo.jpg" alt="CFEI" className="rounded-circle flex-shrink-0" style={{ width:32, height:32, objectFit:"cover", border:"1px solid rgba(255,255,255,0.2)" }} />
          {expanded && (
            <>
              <img src="/newimlogo.png" alt="INFORM" className="rounded-3 flex-shrink-0" style={{ width:36, height:36, objectFit:"cover" }} />
              <div><div className="text-white fw-bold lh-1" style={{ fontSize:15 }}>INFORM</div><div style={{ color:"#818cf8", fontSize:11 }}>Admin Panel</div></div>
            </>
          )}
          {expanded && <button className="btn-close btn-close-white ms-auto d-lg-none" onClick={() => setShow(false)} />}
        </div>
        
        {/* Admin badge */}
        {expanded && (
          <div className="mx-3 mt-3 mb-1 px-3 py-2 rounded-3 d-flex align-items-center gap-2" style={{ background:"rgba(99,102,241,0.2)", border:"1px solid rgba(99,102,241,0.35)" }}>
            <span>🛡️</span>
            <div><div style={{ color:"#a5b4fc", fontSize:12, fontWeight:700 }}>Administrator</div><div style={{ color:"rgba(165,180,252,0.6)", fontSize:11 }}>Full Access</div></div>
          </div>
        )}
        
        {/* Nav */}
        <nav className="flex-grow-1 px-3 py-2 d-flex flex-column gap-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setActive(item.id); setShow(false); }}
              className={`btn text-start d-flex align-items-center gap-3 px-3 py-2 rounded-3 small fw-medium border-0 ${active === item.id ? "text-white" : ""}`}
              style={{ 
                color: active === item.id ? "#fff" : "rgba(255,255,255,0.5)", 
                background: active === item.id ? "#4f46e5" : "transparent",
                justifyContent: expanded ? "flex-start" : "center",
                whiteSpace: "nowrap"
              }}
              title={item.label}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              {expanded && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        
        {/* User */}
        {expanded && (
          <div className="px-3 py-4 border-top border-white border-opacity-10">
            <div className="d-flex align-items-center gap-3 rounded-3 px-3 py-2" style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)" }}>
              <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0" style={{ width:32, height:32, fontSize:12, background:"linear-gradient(135deg,#6366f1,#7c3aed)" }}>AD</div>
              <div className="flex-grow-1 overflow-hidden"><div className="text-white small fw-semibold text-truncate">Admin User</div><div className="text-truncate" style={{ color:"rgba(255,255,255,0.3)", fontSize:11 }}>admin@inform.edu</div></div>
              <Link href="/" className="text-decoration-none" style={{ color:"rgba(255,255,255,0.3)", fontSize:16 }} title="Log out">↩</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* ── Overview ── */
function Overview({ setActive }: { setActive: (s: string) => void }) {
  const activeStudents = students.filter(s => s.status === "Active").length;
  const avgGwa         = (students.reduce((a, s) => a + s.gwa, 0) / students.length).toFixed(2);

  const quickLinks = [
    { id:"students",      label:"Students",      icon:"🎓", bg:"#3b82f6" },
    { id:"grades",        label:"Grades",        icon:"📊", bg:"#8b5cf6" },
    { id:"enrollment",    label:"Enrollment",    icon:"📋", bg:"#14b8a6" },
    { id:"tuition",       label:"Tuition",       icon:"💰", bg:"#f59e0b" },
    { id:"announcements", label:"Announcements", icon:"📢", bg:"#ec4899" },
  ];

  return (
    <div className="d-flex flex-column gap-4">
      {/* Welcome banner */}
      <div className="rounded-3 p-4"
        style={{ background:"linear-gradient(135deg,#6366f1,#7c3aed)", boxShadow:"0 8px 32px rgba(99,102,241,0.25)" }}>
        <h2 className="text-white fw-black fs-4 mb-1">Welcome back, Admin 👋</h2>
        <p className="text-white-50 small mb-0">Manage students, teachers, grades, and system records.</p>
      </div>

      {/* Stats */}
      <div className="row g-3">
        {[
          { label:"Active Students", value:activeStudents, icon:"✅", cls:"border-success-subtle bg-success-subtle", val:"text-success" },
          { label:"Class Avg. GWA",  value:avgGwa,         icon:"📈", cls:"border-purple-subtle bg-purple-subtle",  val:"text-purple"  },
        ].map(s => (
          <div key={s.label} className="col-6">
            <div className={`card border rounded-3 h-100 ${s.cls}`}>
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small">{s.label}</span>
                  <span style={{ fontSize:20 }}>{s.icon}</span>
                </div>
                <div className={`fw-black fs-3 ${s.val}`}>{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick access */}
      <div>
        <p className="text-muted text-uppercase small fw-semibold mb-3" style={{ letterSpacing:"0.08em" }}>Quick Access</p>
        <div className="row g-3">
          {quickLinks.map(q => (
            <div key={q.id} className="col-6 col-sm-4 col-lg-2">
              <button onClick={() => setActive(q.id)}
                className="btn w-100 py-3 d-flex flex-column align-items-center gap-2 rounded-3 text-white border-0 shadow-sm"
                style={{ background: q.bg, transition:"transform 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
                <span style={{ fontSize:28 }}>{q.icon}</span>
                <span className="small fw-bold">{q.label}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity + announcements */}
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body p-4">
              <h3 className="fw-bold small text-dark mb-3">Recent Activity</h3>
              <div className="d-flex flex-column gap-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="d-flex align-items-center gap-3">
                    <div className="rounded-3 bg-light border d-flex align-items-center justify-content-center flex-shrink-0" style={{ width:36, height:36, fontSize:18 }}>{a.icon}</div>
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="small fw-semibold text-dark text-truncate">{a.action}</div>
                      <div className="text-muted" style={{ fontSize:11 }}>{a.name}</div>
                    </div>
                    <span className="text-muted flex-shrink-0" style={{ fontSize:11 }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fw-bold small text-dark mb-0">Active Announcements</h3>
                <button onClick={() => setActive("announcements")} className="btn btn-link btn-sm p-0 text-primary" style={{ fontSize:12 }}>View all →</button>
              </div>
              <div className="d-flex flex-column gap-2">
                {announcements.filter(a => a.status === "Active").slice(0, 4).map(a => (
                  <div key={a.id} className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light border border-transparent" style={{ cursor:"pointer" }}>
                    <span style={{ fontSize:18 }}>📢</span>
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="small fw-semibold text-dark text-truncate">{a.title}</div>
                      <div className="text-muted" style={{ fontSize:11 }}>{a.target} · {a.date}</div>
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

/* ── Students Panel ── */
function StudentsPanel() {
  const [search, setSearch] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("All");
  const [selectedGrade, setSelectedGrade] = useState("All");

  const tracks = ["All", "STEM", "HUMMS", "ABM", "GAS", "TVL"];
  const grades = ["All", "11", "12"];

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchTrack  = selectedTrack === "All" || s.track === selectedTrack;
    const matchGrade  = selectedGrade === "All" || s.grade === Number(selectedGrade);
    return matchSearch && matchTrack && matchGrade;
  });

  return (
    <div className="d-flex flex-column gap-4">
      <div>
        <h2 className="fw-black fs-4 text-dark mb-0">Students</h2>
        <p className="text-muted small mb-0">{filtered.length} student{filtered.length !== 1 ? "s" : ""} found</p>
      </div>

      {/* Filters */}
      <div className="d-flex flex-column flex-sm-row gap-3">
        <div className="input-group shadow-sm flex-grow-1">
          <span className="input-group-text bg-white">🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or ID..." className="form-control border-start-0" />
        </div>
        <div className="d-flex gap-2">
          <div>
            <select value={selectedTrack} onChange={e => setSelectedTrack(e.target.value)} className="form-select form-select-sm rounded-3" style={{ minWidth: 120 }}>
              {tracks.map(t => <option key={t} value={t}>{t === "All" ? "All Tracks" : t}</option>)}
            </select>
          </div>
          <div>
            <select value={selectedGrade} onChange={e => setSelectedGrade(e.target.value)} className="form-select form-select-sm rounded-3" style={{ minWidth: 120 }}>
              {grades.map(g => <option key={g} value={g}>{g === "All" ? "All Grades" : `Grade ${g}`}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="small text-muted fw-semibold text-uppercase ps-4" style={{ letterSpacing:"0.05em" }}>#</th>
                <th className="small text-muted fw-semibold text-uppercase" style={{ letterSpacing:"0.05em" }}>Name</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-sm-table-cell" style={{ letterSpacing:"0.05em" }}>ID</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-lg-table-cell" style={{ letterSpacing:"0.05em" }}>Track & Grade</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-lg-table-cell" style={{ letterSpacing:"0.05em" }}>GWA</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-lg-table-cell" style={{ letterSpacing:"0.05em" }}>Room</th>
                <th className="small text-muted fw-semibold text-uppercase" style={{ letterSpacing:"0.05em" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0
                ? <tr><td colSpan={7} className="text-center text-muted py-4 small">No students found for the selected track/grade.</td></tr>
                : filtered.map((s, i) => (
                  <tr key={s.id}>
                    <td className="ps-4 text-muted small">{i + 1}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center text-primary fw-bold flex-shrink-0" style={{ width:28, height:28, fontSize:11 }}>{initials(s.name)}</div>
                        <span className="small fw-medium text-dark">{s.name}</span>
                      </div>
                    </td>
                    <td className="d-none d-sm-table-cell font-mono text-muted small">{s.id}</td>
                    <td className="d-none d-lg-table-cell text-muted small">{s.track} — Grade {s.grade}</td>
                    <td className="d-none d-lg-table-cell fw-bold text-primary small">{s.gwa}</td>
                    <td className="d-none d-lg-table-cell text-muted small"><span className="badge bg-info-subtle text-info border border-info-subtle">Room {s.room}</span></td>
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
function GradesPanel() {
  const [selected, setSelected] = useState(students[0].id);
  const student = students.find(s => s.id === selected)!;
  const grades = [
    { subject:"Mathematics",        grade:"A",  pct:92, units:3, teacher:"Mr. Dela Cruz"  },
    { subject:"Physics",            grade:"B+", pct:87, units:3, teacher:"Ms. Villanueva" },
    { subject:"English Literature", grade:"A+", pct:96, units:3, teacher:"Ms. Santos"     },
    { subject:"Chemistry",          grade:"B",  pct:81, units:3, teacher:"Mr. Fernandez"  },
    { subject:"History",            grade:"B+", pct:85, units:3, teacher:"Ms. Reyes"      },
    { subject:"Computer Science",   grade:"A",  pct:93, units:3, teacher:"Mr. Uy"         },
  ];
  const avg = Math.round(grades.reduce((a, g) => a + g.pct, 0) / grades.length);

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 text-dark mb-0">Grades Management</h2><p className="text-muted small mb-0">View and manage student grades</p></div>
        <button className="btn btn-primary btn-sm fw-bold shadow-sm">+ Submit Grades</button>
      </div>
      <div className="d-flex flex-column flex-sm-row gap-3">
        <div style={{ width: 220 }}>
          <label className="form-label text-muted fw-semibold text-uppercase mb-1" style={{ fontSize:11 }}>Select Student</label>
          <select value={selected} onChange={e => setSelected(e.target.value)} className="form-select form-select-sm rounded-3">
            {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="flex-grow-1 rounded-3 p-3 d-flex align-items-center gap-3 bg-primary bg-opacity-10 border border-primary border-opacity-25">
          <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0" style={{ width:44, height:44, fontSize:16 }}>{initials(student.name)}</div>
          <div className="flex-grow-1"><div className="fw-bold text-dark">{student.name}</div><div className="text-muted small">{student.id} · {student.track} Grade {student.grade}</div></div>
          <div className="text-end"><div className="fw-black fs-3 text-primary">{avg}%</div><div className="text-muted small">General Average</div></div>
        </div>
      </div>
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="small text-muted fw-semibold text-uppercase ps-4" style={{ letterSpacing:"0.05em" }}>Subject</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-sm-table-cell" style={{ letterSpacing:"0.05em" }}>Teacher</th>
                <th className="small text-muted fw-semibold text-uppercase text-center" style={{ letterSpacing:"0.05em" }}>Units</th>
                <th className="small text-muted fw-semibold text-uppercase text-end" style={{ letterSpacing:"0.05em" }}>Score</th>
                <th className="small text-muted fw-semibold text-uppercase text-end pe-4" style={{ letterSpacing:"0.05em" }}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => (
                <tr key={i}>
                  <td className="ps-4 small fw-medium text-dark">{g.subject}</td>
                  <td className="d-none d-sm-table-cell text-muted small">{g.teacher}</td>
                  <td className="text-center text-muted small">{g.units}</td>
                  <td className="text-end">
                    <div className="d-flex align-items-center justify-content-end gap-2">
                      <div className="progress flex-shrink-0" style={{ width:60, height:6 }}>
                        <div className="progress-bar bg-primary" style={{ width:`${g.pct}%` }} />
                      </div>
                      <span className="small fw-semibold text-dark">{g.pct}%</span>
                    </div>
                  </td>
                  <td className={`text-end pe-4 fw-black small ${g.pct >= 90 ? "text-success" : g.pct >= 80 ? "text-primary" : "text-warning"}`}>{g.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Enrollment Panel ── */
function EnrollmentPanel() {
  const enrollments = [
    { name:"Jamie Santos",    id:"STU-2024-001", track:"STEM", grade:11, date:"May 18, 2026", status:"Confirmed" },
    { name:"Maria Reyes",     id:"STU-2024-002", track:"HUMMS", grade:11, date:"May 19, 2026", status:"Pending"   },
    { name:"Carlo Dela Cruz", id:"STU-2024-003", track:"ABM", grade:12, date:"May 17, 2026", status:"Confirmed" },
    { name:"Ana Villanueva",  id:"STU-2024-004", track:"GAS",  grade:11, date:"May 20, 2026", status:"Pending"   },
    { name:"Luis Fernandez",  id:"STU-2024-005", track:"STEM", grade:12, date:"May 16, 2026", status:"Confirmed" },
    { name:"Rosa Bautista",   id:"STU-2024-006", track:"TVL", grade:11, date:"May 20, 2026", status:"Confirmed" },
  ];
  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 text-dark mb-0">Enrollment</h2><p className="text-muted small mb-0">School Year 2025–2026 · Deadline: June 15, 2026</p></div>
        <span className="badge bg-warning-subtle text-warning border border-warning-subtle px-3 py-2">🔔 Enrollment period is open</span>
      </div>
      <div className="row g-3">
        {[
          { label:"Total Enrolled", value:enrollments.length,                                     cls:"bg-primary-subtle border-primary-subtle text-primary" },
          { label:"Confirmed",      value:enrollments.filter(e=>e.status==="Confirmed").length,   cls:"bg-success-subtle border-success-subtle text-success" },
          { label:"Pending Review", value:enrollments.filter(e=>e.status==="Pending").length,     cls:"bg-warning-subtle border-warning-subtle text-warning" },
        ].map(s => (
          <div key={s.label} className="col-4">
            <div className={`card border rounded-3 ${s.cls}`}>
              <div className="card-body p-3 text-center">
                <div className="text-muted small mb-1">{s.label}</div>
                <div className="fw-black fs-2">{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="small text-muted fw-semibold text-uppercase ps-4" style={{ letterSpacing:"0.05em" }}>Student</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-sm-table-cell" style={{ letterSpacing:"0.05em" }}>ID</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-lg-table-cell" style={{ letterSpacing:"0.05em" }}>Track</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-sm-table-cell" style={{ letterSpacing:"0.05em" }}>Date</th>
                <th className="small text-muted fw-semibold text-uppercase" style={{ letterSpacing:"0.05em" }}>Status</th>
                <th className="small text-muted fw-semibold text-uppercase text-end pe-4" style={{ letterSpacing:"0.05em" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((e, i) => (
                <tr key={i}>
                  <td className="ps-4">
                    <div className="d-flex align-items-center gap-2">
                      <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center text-primary fw-bold flex-shrink-0" style={{ width:28, height:28, fontSize:11 }}>{initials(e.name)}</div>
                      <span className="small fw-medium text-dark">{e.name}</span>
                    </div>
                  </td>
                  <td className="d-none d-sm-table-cell font-mono text-muted small">{e.id}</td>
                  <td className="d-none d-lg-table-cell text-muted small">{e.track} Grade {e.grade}</td>
                  <td className="d-none d-sm-table-cell text-muted small">{e.date}</td>
                  <td><span className={`badge ${e.status==="Confirmed" ? "bg-success-subtle text-success border border-success-subtle" : "bg-warning-subtle text-warning border border-warning-subtle"}`}>{e.status}</span></td>
                  <td className="text-end pe-4">{e.status === "Pending" && <button className="btn btn-primary btn-sm" style={{ fontSize:11 }}>Confirm</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Tuition Panel ── */
function TuitionPanel() {
  const records = students.map(s => ({ ...s, total:22050, paid:s.tuition==="Paid"?22050:18500, balance:s.tuition==="Paid"?0:3550 }));
  const totalCollected = records.reduce((a,r)=>a+r.paid,0);
  const totalBalance   = records.reduce((a,r)=>a+r.balance,0);
  return (
    <div className="d-flex flex-column gap-4">
      <div><h2 className="fw-black fs-4 text-dark mb-0">Tuition Records</h2><p className="text-muted small mb-0">Term 1 · Academic Year 2025–2026</p></div>
      <div className="row g-3">
        {[
          { label:"Total Assessment",  value:`₱${(records.length*22050).toLocaleString()}`, cls:"bg-light border-secondary"                                },
          { label:"Total Collected",   value:`₱${totalCollected.toLocaleString()}`,          cls:"bg-success-subtle border-success-subtle text-success"    },
          { label:"Total Balance Due", value:`₱${totalBalance.toLocaleString()}`,            cls:"bg-danger-subtle  border-danger-subtle  text-danger"     },
        ].map(s => (
          <div key={s.label} className="col-4">
            <div className={`card border rounded-3 ${s.cls}`}>
              <div className="card-body p-3 text-center">
                <div className="text-muted small mb-1">{s.label}</div>
                <div className="fw-black fs-5">{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="small text-muted fw-semibold text-uppercase ps-4" style={{ letterSpacing:"0.05em" }}>Student</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-sm-table-cell" style={{ letterSpacing:"0.05em" }}>Track</th>
                <th className="small text-muted fw-semibold text-uppercase text-end d-none d-sm-table-cell" style={{ letterSpacing:"0.05em" }}>Total</th>
                <th className="small text-muted fw-semibold text-uppercase text-end d-none d-sm-table-cell" style={{ letterSpacing:"0.05em" }}>Paid</th>
                <th className="small text-muted fw-semibold text-uppercase text-end" style={{ letterSpacing:"0.05em" }}>Balance</th>
                <th className="small text-muted fw-semibold text-uppercase text-end pe-4" style={{ letterSpacing:"0.05em" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r,i) => (
                <tr key={i}>
                  <td className="ps-4">
                    <div className="d-flex align-items-center gap-2">
                      <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center text-primary fw-bold flex-shrink-0" style={{ width:28, height:28, fontSize:11 }}>{initials(r.name)}</div>
                      <span className="small fw-medium text-dark">{r.name}</span>
                    </div>
                  </td>
                  <td className="d-none d-sm-table-cell text-muted small">{r.track} Grade {r.grade}</td>
                  <td className="d-none d-sm-table-cell text-muted small text-end">₱{r.total.toLocaleString()}</td>
                  <td className="d-none d-sm-table-cell text-success small fw-semibold text-end">₱{r.paid.toLocaleString()}</td>
                  <td className={`small fw-semibold text-end ${r.balance>0?"text-danger":"text-muted"}`}>{r.balance>0?`₱${r.balance.toLocaleString()}`:"—"}</td>
                  <td className="text-end pe-4"><span className={`badge ${r.tuition==="Paid"?"bg-success-subtle text-success border border-success-subtle":"bg-danger-subtle text-danger border border-danger-subtle"}`}>{r.tuition}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Teachers Panel ── */
function TeachersPanel() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = teachers.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.section.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || t.employmentStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="d-flex flex-column gap-4">
      <div>
        <h2 className="fw-black fs-4 text-dark mb-0">Teachers</h2>
        <p className="text-muted small mb-0">{filtered.length} faculty member{filtered.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Filters */}
      <div className="d-flex flex-column flex-sm-row gap-3">
        <div className="input-group shadow-sm flex-grow-1">
          <span className="input-group-text bg-white">🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, ID, or section..." className="form-control border-start-0" />
        </div>
        <div className="d-flex gap-2">
          {["All", "Full Time", "Part Time"].map(f => (
            <button key={f} onClick={() => setFilterStatus(f)} className={`btn btn-sm ${filterStatus === f ? "btn-primary shadow-sm" : "btn-outline-secondary"}`}>{f}</button>
          ))}
        </div>
      </div>

      {/* Teacher Cards */}
      <div className="d-flex flex-column gap-3">
        {filtered.length === 0
          ? <div className="text-center text-muted py-4 small">No teachers found.</div>
          : filtered.map((t) => (
            <div key={t.id} className="card border-0 shadow-sm rounded-3 overflow-hidden">
              {/* Teacher Header Row */}
              <div
                className="d-flex align-items-center gap-3 p-3 px-4"
                style={{ cursor: "pointer", background: expanded === t.id ? "#f8f9ff" : "white" }}
                onClick={() => setExpanded(expanded === t.id ? null : t.id)}
              >
                {/* Avatar */}
                <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center text-success fw-bold flex-shrink-0" style={{ width: 40, height: 40, fontSize: 13 }}>
                  {initials(t.name)}
                </div>

                {/* Info */}
                <div className="flex-grow-1">
                  <div className="fw-bold text-dark small">{t.name}</div>
                  <div className="d-flex align-items-center gap-2 flex-wrap mt-1">
                    <span className="text-muted" style={{ fontSize: 11 }}>{t.id}</span>
                    <span className="text-muted" style={{ fontSize: 11 }}>·</span>
                    <span className="badge bg-info-subtle text-info border border-info-subtle" style={{ fontSize: 11 }}>📚 {t.section}</span>
                    <span className="badge bg-warning-subtle text-warning border border-warning-subtle" style={{ fontSize: 11 }}>Room {t.room}</span>
                  </div>
                </div>

                {/* Employment Status */}
                <span className={`badge px-3 py-2 flex-shrink-0 ${t.employmentStatus === "Full Time" ? "bg-success-subtle text-success border border-success-subtle" : "bg-secondary-subtle text-secondary border border-secondary-subtle"}`}>
                  {t.employmentStatus === "Full Time" ? "● Full Time" : "◑ Part Time"}
                </span>

                {/* Expand arrow */}
                <span className="text-muted ms-2" style={{ fontSize: 12, transition: "transform 0.2s", display: "inline-block", transform: expanded === t.id ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
              </div>

              {/* Expanded Schedule */}
              {expanded === t.id && (
                <div className="border-top px-4 py-3" style={{ background: "#f8f9ff" }}>
                  <p className="text-muted text-uppercase fw-semibold mb-2" style={{ fontSize: 11, letterSpacing: "0.08em" }}>Subject Schedule</p>
                  <div className="d-flex flex-column gap-2">
                    {t.subjects.map((s, idx) => (
                      <div key={idx} className="d-flex align-items-center gap-3 p-3 rounded-3 bg-white border">
                        <div className="rounded-3 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 36, height: 36, fontSize: 16 }}>📖</div>
                        <div className="flex-grow-1">
                          <div className="fw-semibold text-dark small">{s.name}</div>
                          <div className="text-muted" style={{ fontSize: 11 }}>Section: {t.section}</div>
                        </div>
                        <div className="text-end flex-shrink-0">
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-success-subtle text-success border border-success-subtle" style={{ fontSize: 11 }}>🕐 In: {s.timeIn}</span>
                            <span className="badge bg-danger-subtle text-danger border border-danger-subtle" style={{ fontSize: 11 }}>🕐 Out: {s.timeOut}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
}

/* ── Grade Requests Panel (Admin) ── */
function AdminRequestsPanel() {
  const [requests, setRequests] = useState(allGradeRequests);

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
  const approved = requests.filter(r => r.status === "approved");
  const rejected = requests.filter(r => r.status === "rejected");

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 text-dark mb-0">Grade Requests</h2><p className="text-muted small mb-0">Monitor all student grade requests for Term 3</p></div>
      </div>

      {/* Stats */}
      <div className="row g-3">
        {[
          { label: "Pending", value: pending.length, icon: "⏳", cls: "bg-warning-subtle border-warning-subtle text-warning" },
          { label: "Approved", value: approved.length, icon: "✓", cls: "bg-success-subtle border-success-subtle text-success" },
          { label: "Rejected", value: rejected.length, icon: "✕", cls: "bg-danger-subtle border-danger-subtle text-danger" },
        ].map(s => (
          <div key={s.label} className="col-4">
            <div className={`card border rounded-3 ${s.cls}`}>
              <div className="card-body p-3 text-center">
                <div className="text-muted small mb-1">{s.label}</div>
                <div className="fw-black fs-3">{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* All Requests Table */}
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="small text-muted fw-semibold text-uppercase ps-4" style={{ letterSpacing:"0.05em" }}>Student</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-sm-table-cell" style={{ letterSpacing:"0.05em" }}>Teacher</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-lg-table-cell" style={{ letterSpacing:"0.05em" }}>Subject</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-lg-table-cell" style={{ letterSpacing:"0.05em" }}>Requested</th>
                <th className="small text-muted fw-semibold text-uppercase" style={{ letterSpacing:"0.05em" }}>Status</th>
                <th className="small text-muted fw-semibold text-uppercase text-end pe-4" style={{ letterSpacing:"0.05em" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req.id}>
                  <td className="ps-4 small fw-medium text-dark">{req.student}</td>
                  <td className="d-none d-sm-table-cell text-muted small">{req.teacher}</td>
                  <td className="d-none d-lg-table-cell text-muted small">{req.subject}</td>
                  <td className="d-none d-lg-table-cell text-muted small">{req.requestedAt}</td>
                  <td>
                    <span className={`badge ${
                      req.status === "pending" ? "bg-warning-subtle text-warning border border-warning-subtle" :
                      req.status === "approved" ? "bg-success-subtle text-success border border-success-subtle" :
                      "bg-danger-subtle text-danger border border-danger-subtle"
                    }`}>
                      {req.status === "pending" ? "⏳ Pending" : req.status === "approved" ? "✓ Approved" : "✕ Rejected"}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    {req.status === "pending" && (
                      <div className="d-flex gap-1 justify-content-end">
                        <button onClick={() => handleRequest(req.id, "approve")} className="btn btn-success btn-sm" style={{ fontSize: 11 }}>✓</button>
                        <button onClick={() => handleRequest(req.id, "reject")} className="btn btn-danger btn-sm" style={{ fontSize: 11 }}>✕</button>
                      </div>
                    )}
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

/* ── Admin Document Management Panel ── */
function AdminDocumentsPanel() {
  const [docs, setDocs] = useState(allDocumentRequests);

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
    setDocs(prev =>
      prev.map(d =>
        d.id === id
          ? { ...d, status: "rejected" }
          : d
      )
    );
  }

  const pending = docs.filter(d => d.status === "pending");
  const approved = docs.filter(d => d.status === "approved");
  const rejected = docs.filter(d => d.status === "rejected");

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 text-dark mb-0">Document Management</h2><p className="text-muted small mb-0">Manage all student document requests</p></div>
      </div>

      {/* Stats */}
      <div className="row g-3">
        {[
          { label: "Pending", value: pending.length, icon: "⏳", cls: "bg-warning-subtle border-warning-subtle text-warning" },
          { label: "Approved", value: approved.length, icon: "✓", cls: "bg-success-subtle border-success-subtle text-success" },
          { label: "Rejected", value: rejected.length, icon: "✕", cls: "bg-danger-subtle border-danger-subtle text-danger" },
        ].map(s => (
          <div key={s.label} className="col-4">
            <div className={`card border rounded-3 ${s.cls}`}>
              <div className="card-body p-3 text-center">
                <div className="text-muted small mb-1">{s.label}</div>
                <div className="fw-black fs-3">{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="small text-muted fw-semibold text-uppercase ps-4" style={{ letterSpacing:"0.05em" }}>Student</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-sm-table-cell" style={{ letterSpacing:"0.05em" }}>Type</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-lg-table-cell" style={{ letterSpacing:"0.05em" }}>Teacher</th>
                <th className="small text-muted fw-semibold text-uppercase" style={{ letterSpacing:"0.05em" }}>Status</th>
                <th className="small text-muted fw-semibold text-uppercase text-end pe-4" style={{ letterSpacing:"0.05em" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {docs.map(doc => (
                <tr key={doc.id}>
                  <td className="ps-4 small fw-medium text-dark">{doc.student}</td>
                  <td className="d-none d-sm-table-cell text-muted small">{doc.type}</td>
                  <td className="d-none d-lg-table-cell text-muted small">{doc.teacher}</td>
                  <td>
                    <span className={`badge ${
                      doc.status === "pending" ? "bg-warning-subtle text-warning border border-warning-subtle" :
                      doc.status === "approved" ? "bg-success-subtle text-success border border-success-subtle" :
                      "bg-danger-subtle text-danger border border-danger-subtle"
                    }`}>
                      {doc.status === "pending" ? "⏳ Pending" : doc.status === "approved" ? "✓ Approved" : "✕ Rejected"}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    {doc.status === "pending" && (
                      <div className="d-flex gap-1 justify-content-end">
                        <button onClick={() => approveDocument(doc.id)} className="btn btn-success btn-sm" style={{ fontSize: 11 }}>✓</button>
                        <button onClick={() => rejectDocument(doc.id)} className="btn btn-danger btn-sm" style={{ fontSize: 11 }}>✕</button>
                      </div>
                    )}
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

/* ── Admin Notifications Panel ── */
function AdminNotificationsPanel() {
  const [notifs, setNotifs] = useState(adminNotifications);

  function markAsRead(id: number) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function deleteNotification(id: number) {
    setNotifs(prev => prev.filter(n => n.id !== id));
  }

  const unread = notifs.filter(n => !n.read);
  const read = notifs.filter(n => n.read);

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 text-dark mb-0">Notifications</h2><p className="text-muted small mb-0">{unread.length} unread</p></div>
      </div>

      {/* Unread */}
      {unread.length > 0 && (
        <div>
          <h3 className="fw-bold small text-dark mb-3">🔔 Unread</h3>
          <div className="d-flex flex-column gap-2">
            {unread.map(notif => (
              <div key={notif.id} className="card border-0 shadow-sm rounded-3" style={{ background: "rgba(59, 130, 246, 0.1)", border: "1px solid rgba(59, 130, 246, 0.25)" }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-start gap-3">
                    <span style={{ fontSize: 18 }}>{notif.icon}</span>
                    <div className="flex-grow-1">
                      <div className="fw-bold small text-dark">{notif.title}</div>
                      <div className="text-muted small mt-1">{notif.message}</div>
                      <div className="text-muted small mt-2" style={{ fontSize: 11 }}>{notif.time}</div>
                    </div>
                    <div className="d-flex gap-1 flex-shrink-0">
                      <button onClick={() => markAsRead(notif.id)} className="btn btn-link btn-sm p-0 text-primary" style={{ fontSize: 11 }}>✓</button>
                      <button onClick={() => deleteNotification(notif.id)} className="btn btn-link btn-sm p-0 text-danger" style={{ fontSize: 11 }}>✕</button>
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
          <h3 className="fw-bold small text-dark mb-3">✓ Read</h3>
          <div className="d-flex flex-column gap-2">
            {read.map(notif => (
              <div key={notif.id} className="card border-0 shadow-sm rounded-3 opacity-75">
                <div className="card-body p-3">
                  <div className="d-flex align-items-start justify-content-between gap-3">
                    <div className="d-flex align-items-start gap-3 flex-grow-1">
                      <span style={{ fontSize: 16 }}>{notif.icon}</span>
                      <div>
                        <div className="fw-bold small text-dark">{notif.title}</div>
                        <div className="text-muted small mt-1">{notif.message}</div>
                      </div>
                    </div>
                    <button onClick={() => deleteNotification(notif.id)} className="btn btn-link btn-sm p-0 text-danger flex-shrink-0" style={{ fontSize: 11 }}>✕</button>
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

/* ── Announcements Panel ── */
function AnnouncementsPanel() {
  const [items, setItems] = useState(announcements);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title:"", target:"All Students" });

  function addAnnouncement() {
    if (!form.title.trim()) return;
    setItems(prev => [{ id:Date.now(), title:form.title, date:"Today", target:form.target, status:"Active" }, ...prev]);
    setForm({ title:"", target:"All Students" }); setShowForm(false);
  }

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 text-dark mb-0">Announcements</h2><p className="text-muted small mb-0">{items.filter(a=>a.status==="Active").length} active</p></div>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary btn-sm fw-bold shadow-sm">+ New Announcement</button>
      </div>
      {showForm && (
        <div className="card border-primary border-opacity-25 rounded-3 shadow-sm">
          <div className="card-body p-4 d-flex flex-column gap-3">
            <h3 className="fw-bold small text-dark mb-0">New Announcement</h3>
            <input value={form.title} onChange={e => setForm({...form,title:e.target.value})} placeholder="Announcement title..." className="form-control rounded-3" />
            <select value={form.target} onChange={e => setForm({...form,target:e.target.value})} className="form-select rounded-3">
              {["All Students","Active Students","Unpaid Students","4th Year","New Students"].map(t=><option key={t}>{t}</option>)}
            </select>
            <div className="d-flex gap-3">
              <button onClick={() => setShowForm(false)} className="btn btn-outline-secondary flex-grow-1 rounded-3">Cancel</button>
              <button onClick={addAnnouncement} className="btn btn-primary flex-grow-1 rounded-3 fw-bold shadow-sm">Post</button>
            </div>
          </div>
        </div>
      )}
      <div className="d-flex flex-column gap-2">
        {items.map(a => (
          <div key={a.id} className="card border-0 shadow-sm rounded-3">
            <div className="card-body p-4 d-flex align-items-start gap-3">
              <div className="rounded-3 bg-primary bg-opacity-10 border border-primary border-opacity-25 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width:40, height:40, fontSize:20 }}>📢</div>
              <div className="flex-grow-1 overflow-hidden">
                <div className="fw-bold small text-dark">{a.title}</div>
                <div className="text-muted" style={{ fontSize:11 }}>Target: {a.target} · {a.date}</div>
              </div>
              <div className="d-flex align-items-center gap-2 flex-shrink-0">
                <span className={`badge ${a.status==="Active"?"bg-success-subtle text-success border border-success-subtle":"bg-secondary-subtle text-secondary border border-secondary-subtle"}`}>{a.status}</span>
                <button className="btn btn-link btn-sm p-0 text-muted" onClick={() => setItems(items.filter(i=>i.id!==a.id))}>✕</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Library Panel ── */
function LibraryPanel() {
  const libBooks = [
    { title:"Calculus: Early Transcendentals",   author:"James Stewart",       category:"Mathematics", copies:5, available:3 },
    { title:"Conceptual Physics",                author:"Paul G. Hewitt",      category:"Physics",     copies:4, available:1 },
    { title:"Complete Works of Shakespeare",     author:"W. Shakespeare",      category:"Literature",  copies:6, available:6 },
    { title:"Chemistry: The Central Science",    author:"Brown & LeMay",       category:"Chemistry",   copies:4, available:4 },
    { title:"Sapiens: A Brief History",          author:"Yuval Noah Harari",   category:"History",     copies:3, available:1 },
    { title:"Introduction to Algorithms",        author:"Cormen et al.",       category:"CS",          copies:5, available:5 },
  ];
  const [search, setSearch] = useState("");
  const filtered = libBooks.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()));
  const totalCopies = libBooks.reduce((a,b)=>a+b.copies,0);
  const totalAvail  = libBooks.reduce((a,b)=>a+b.available,0);

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
        <div><h2 className="fw-black fs-4 text-dark mb-0">Library Management</h2><p className="text-muted small mb-0">{libBooks.length} titles · {totalCopies} total copies</p></div>
        <button className="btn btn-primary btn-sm fw-bold shadow-sm">+ Add Book</button>
      </div>
      <div className="row g-3">
        {[
          { label:"Total Copies", value:totalCopies,           cls:"bg-primary-subtle border-primary-subtle text-primary" },
          { label:"Available",    value:totalAvail,            cls:"bg-success-subtle border-success-subtle text-success" },
          { label:"Borrowed",     value:totalCopies-totalAvail,cls:"bg-warning-subtle border-warning-subtle text-warning" },
        ].map(s => (
          <div key={s.label} className="col-4">
            <div className={`card border rounded-3 ${s.cls}`}>
              <div className="card-body p-3 text-center">
                <div className="text-muted small mb-1">{s.label}</div>
                <div className="fw-black fs-2">{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="input-group shadow-sm">
        <span className="input-group-text bg-white">🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search books..." className="form-control border-start-0 rounded-end-3" />
      </div>
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="small text-muted fw-semibold text-uppercase ps-4" style={{ letterSpacing:"0.05em" }}>Title</th>
                <th className="small text-muted fw-semibold text-uppercase d-none d-sm-table-cell" style={{ letterSpacing:"0.05em" }}>Author</th>
                <th className="small text-muted fw-semibold text-uppercase text-center" style={{ letterSpacing:"0.05em" }}>Copies</th>
                <th className="small text-muted fw-semibold text-uppercase text-center pe-4" style={{ letterSpacing:"0.05em" }}>Available</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b,i) => (
                <tr key={i}>
                  <td className="ps-4"><div className="small fw-medium text-dark">{b.title}</div><div className="text-muted" style={{ fontSize:11 }}>{b.category}</div></td>
                  <td className="d-none d-sm-table-cell text-muted small">{b.author}</td>
                  <td className="text-center small fw-semibold text-dark">{b.copies}</td>
                  <td className="text-center pe-4"><span className={`badge ${b.available>0?"bg-success-subtle text-success border border-success-subtle":"bg-danger-subtle text-danger border border-danger-subtle"}`}>{b.available}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Reports Panel ── */
function ReportsPanel() {
  const weekDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const logins   = [12,28,22,35,30,18,8];
  const maxL     = Math.max(...logins);
  return (
    <div className="d-flex flex-column gap-4">
      <div><h2 className="fw-black fs-4 text-dark mb-0">Reports</h2><p className="text-muted small mb-0">System analytics and summaries</p></div>
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body p-4">
              <h3 className="fw-bold small text-dark mb-4">Daily Portal Logins (This Week)</h3>
              <div className="d-flex align-items-end gap-2" style={{ height:128 }}>
                {logins.map((h,i) => (
                  <div key={i} className="flex-grow-1 d-flex flex-column align-items-center gap-1">
                    <span className="text-muted" style={{ fontSize:10 }}>{h}</span>
                    <div className="w-100 rounded-top bg-primary" style={{ height:`${(h/maxL)*100}%` }} />
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between mt-2">
                {weekDays.map(d => <span key={d} className="flex-grow-1 text-center text-muted" style={{ fontSize:10 }}>{d}</span>)}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body p-4">
              <h3 className="fw-bold small text-dark mb-4">Students by Course</h3>
              <div className="d-flex flex-column gap-3">
                {[{course:"BSCS",count:2,cls:"bg-primary"},{course:"BSED",count:2,cls:"bg-danger"},{course:"BSBA",count:2,cls:"bg-warning"},{course:"BSN",count:2,cls:"bg-info"}].map(c => (
                  <div key={c.course} className="d-flex align-items-center gap-3">
                    <span className="text-muted small fw-semibold" style={{ width:40 }}>{c.course}</span>
                    <div className="flex-grow-1 progress" style={{ height:10 }}>
                      <div className={`progress-bar ${c.cls}`} style={{ width:`${(c.count/students.length)*100}%` }} />
                    </div>
                    <span className="text-muted small" style={{ width:16 }}>{c.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3">
        {[
          { label:"Total Logins Today", value:"35",      icon:"🔐", cls:"bg-primary-subtle border-primary-subtle text-primary" },
          { label:"Files Uploaded",     value:"12",      icon:"📁", cls:"bg-info-subtle    border-info-subtle    text-info"    },
          { label:"Books Borrowed",     value:"7",       icon:"📚", cls:"bg-warning-subtle border-warning-subtle text-warning" },
          { label:"Payments Received",  value:"₱44,100", icon:"💰", cls:"bg-success-subtle border-success-subtle text-success" },
        ].map(s => (
          <div key={s.label} className="col-6 col-lg-3">
            <div className={`card border rounded-3 ${s.cls}`}>
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small">{s.label}</span>
                  <span style={{ fontSize:20 }}>{s.icon}</span>
                </div>
                <div className="fw-black fs-4">{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Page ── */
export default function AdminDashboardPage() {
  const [activeNav, setActiveNav]   = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [notifs, setNotifs] = useState(adminNotifications);

  const unreadCount = notifs.filter(n => !n.read).length;

  function markAsRead(id: number) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function markAllAsRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  }

  function deleteNotif(id: number) {
    setNotifs(prev => prev.filter(n => n.id !== id));
  }

  function renderPanel() {
    switch (activeNav) {
      case "students":      return <StudentsPanel />;
      case "teachers":      return <TeachersPanel />;
      case "grades":        return <GradesPanel />;
      case "requests":      return <AdminRequestsPanel />;
      case "documents":     return <AdminDocumentsPanel />;
      case "enrollment":    return <EnrollmentPanel />;
      case "tuition":       return <TuitionPanel />;
      case "notifications": return <AdminNotificationsPanel />;
      case "announcements": return <AnnouncementsPanel />;
      case "library":       return <LibraryPanel />;
      case "reports":       return <ReportsPanel />;
      default:              return <Overview setActive={setActiveNav} />;
    }
  }

  return (
    <div className="d-flex" style={{ height:"100vh", overflow:"hidden", background:"#f0f4ff" }} suppressHydrationWarning>
      <Sidebar active={activeNav} setActive={setActiveNav} show={mobileOpen} setShow={setMobileOpen} onExpandChange={setSidebarExpanded} />

      {/* Desktop layout with sidebar margin */}
      <div className="d-lg-flex d-none flex-column flex-grow-1 overflow-hidden" style={{ marginLeft: "80px", transition: "margin-left 0.3s ease" }}>
        {/* Topbar */}
        <header className="bg-white border-bottom px-3 px-sm-4 py-3 d-flex align-items-center gap-3 flex-shrink-0 shadow-sm">
          <button className="btn btn-link text-muted p-1 d-lg-none" onClick={() => setMobileOpen(true)}>
            <div style={{ width:20, height:2, background:"currentColor", marginBottom:4 }} />
            <div style={{ width:20, height:2, background:"currentColor", marginBottom:4 }} />
            <div style={{ width:20, height:2, background:"currentColor" }} />
          </button>
          <div className="input-group flex-grow-1" style={{ maxWidth:400 }}>
            <span className="input-group-text bg-light border-end-0 text-muted">🔍</span>
            <input type="text" placeholder="Search students, records..." className="form-control bg-light border-start-0" />
          </div>
          <div className="d-flex align-items-center gap-3 ms-auto">
            <span className="badge bg-success-subtle text-success border border-success-subtle d-none d-sm-flex align-items-center gap-1">
              <span className="rounded-circle bg-success d-inline-block" style={{ width:7, height:7 }} />System Online
            </span>
            <button className="btn btn-link text-muted p-1 position-relative" onClick={() => setShowNotifDropdown(!showNotifDropdown)}>
              <span style={{ fontSize:20 }}>🔔</span>
              {unreadCount > 0 && <span className="position-absolute top-0 end-0 rounded-circle bg-danger d-flex align-items-center justify-content-center text-white" style={{ width:16, height:16, fontSize:9, fontWeight:"bold" }}>{unreadCount}</span>}
            </button>
            <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style={{ width:32, height:32, fontSize:12, background:"linear-gradient(135deg,#6366f1,#7c3aed)", cursor:"pointer" }}>AD</div>
          </div>
        </header>

        <main className="flex-grow-1 overflow-auto p-3 p-sm-4">
          {renderPanel()}
        </main>
      </div>

      {/* Mobile layout without sidebar margin */}
      <div className="d-flex d-lg-none flex-column flex-grow-1 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-bottom px-3 px-sm-4 py-3 d-flex align-items-center gap-3 flex-shrink-0 shadow-sm">
          <button className="btn btn-link text-muted p-1" onClick={() => setMobileOpen(true)}>
            <div style={{ width:20, height:2, background:"currentColor", marginBottom:4 }} />
            <div style={{ width:20, height:2, background:"currentColor", marginBottom:4 }} />
            <div style={{ width:20, height:2, background:"currentColor" }} />
          </button>
          <div className="input-group flex-grow-1" style={{ maxWidth:400 }}>
            <span className="input-group-text bg-light border-end-0 text-muted">🔍</span>
            <input type="text" placeholder="Search students, records..." className="form-control bg-light border-start-0" />
          </div>
          <div className="d-flex align-items-center gap-3 ms-auto">
            <span className="badge bg-success-subtle text-success border border-success-subtle d-none d-sm-flex align-items-center gap-1">
              <span className="rounded-circle bg-success d-inline-block" style={{ width:7, height:7 }} />System Online
            </span>
            <button className="btn btn-link text-muted p-1 position-relative" onClick={() => setShowNotifDropdown(!showNotifDropdown)}>
              <span style={{ fontSize:20 }}>🔔</span>
              {unreadCount > 0 && <span className="position-absolute top-0 end-0 rounded-circle bg-danger d-flex align-items-center justify-content-center text-white" style={{ width:16, height:16, fontSize:9, fontWeight:"bold" }}>{unreadCount}</span>}
            </button>
            <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style={{ width:32, height:32, fontSize:12, background:"linear-gradient(135deg,#6366f1,#7c3aed)", cursor:"pointer" }}>AD</div>
          </div>
        </header>

        <main className="flex-grow-1 overflow-auto p-3 p-sm-4">
          {renderPanel()}
        </main>
      </div>

      {/* Notification Dropdown - shared for both desktop and mobile */}
      {showNotifDropdown && (
        <>
          <div style={{ position:"fixed", top:60, right:20, width:360, maxHeight:480, background:"white", borderRadius:"0.75rem", border:"1px solid rgba(0,0,0,0.1)", boxShadow:"0 10px 40px rgba(0,0,0,0.15)", zIndex:9999, overflowY:"auto", animation:"slideInDown 0.2s ease-out" }}>
            <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
              <div><div className="fw-bold text-dark small">Notifications</div><div className="text-muted" style={{ fontSize:11 }}>{unreadCount} unread</div></div>
              <div className="d-flex align-items-center gap-2">
                {unreadCount > 0 && <button onClick={markAllAsRead} className="btn btn-link btn-sm p-0 text-primary" style={{ fontSize:11 }}>Mark all read</button>}
                <button onClick={() => setShowNotifDropdown(false)} className="btn btn-link btn-sm p-0 text-muted" style={{ fontSize:18 }}>✕</button>
              </div>
            </div>
            {notifs.length === 0 ? (
              <div className="px-4 py-5 text-center text-muted"><div style={{ fontSize:32, marginBottom:8 }}>🔔</div><small>No notifications</small></div>
            ) : (
              notifs.map(n => (
                <div key={n.id} className="px-4 py-3 border-bottom d-flex gap-3" style={{ background: n.read ? "white" : "rgba(99,102,241,0.04)", opacity: n.read ? 0.7 : 1 }}>
                  <div style={{ fontSize:20, minWidth:24 }}>{n.icon}</div>
                  <div className="flex-grow-1">
                    <div className="fw-bold small text-dark">{n.title}</div>
                    <div className="text-muted" style={{ fontSize:12, lineHeight:1.4 }}>{n.message}</div>
                    <div className="text-muted" style={{ fontSize:11, marginTop:4 }}>{n.time}</div>
                  </div>
                  <div className="d-flex gap-1 flex-shrink-0">
                    {!n.read && <button onClick={() => markAsRead(n.id)} className="btn btn-link btn-sm p-0 text-primary" style={{ fontSize:12 }} title="Mark as read">✓</button>}
                    <button onClick={() => deleteNotif(n.id)} className="btn btn-link btn-sm p-0 text-danger" style={{ fontSize:14 }} title="Delete">✕</button>
                  </div>
                </div>
              ))
            )}
            {notifs.length > 0 && (
              <div className="px-4 py-2 border-top text-center">
                <button onClick={() => { setActiveNav("notifications"); setShowNotifDropdown(false); }} className="btn btn-link btn-sm p-0 text-primary" style={{ fontSize:12 }}>View all notifications →</button>
              </div>
            )}
          </div>
          <div className="position-fixed top-0 start-0 w-100 h-100" style={{ zIndex:9998 }} onClick={() => setShowNotifDropdown(false)} />
        </>
      )}
      )}
    </div>
  );
}
