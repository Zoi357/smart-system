"use client";

import { useState, useEffect, useRef } from "react";
import type React from "react";
import { PremiumDashboardShell } from "../components/PremiumDashboardShell";

type Panel = "home" | "grades" | "schedule" | "tuition" | "documents" | "notifications";
type JMsg  = { role: "ai" | "user"; text: string; feedback?: "up" | "down" | null };

/* ── JOBERT Chat ── */
function JobertChat({ initialPrompt }: { initialPrompt?: string }) {
  const [open, setOpen]     = useState(false);
  const [msgs, setMsgs]     = useState<JMsg[]>([{ role: "ai", text: "Hi! I am JOBERT, your INFORM Assistant. I can help you understand your grades, schedule, tuition, and more. What do you need?" }]);
  const [input, setInput]   = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef           = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);
  useEffect(() => { if (initialPrompt) { setOpen(true); send(initialPrompt); } }, [initialPrompt]); // eslint-disable-line

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: JMsg = { role: "user", text: text.trim() };
    const newMsgs = [...msgs, userMsg];
    setMsgs(newMsgs); setInput(""); setTyping(true);
    fetch("/api/jobert", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text.trim(), history: newMsgs.slice(-6).map(m => ({ role: m.role, text: m.text })) }) })
      .then(r => r.json())
      .then(d => setMsgs(prev => [...prev, { role: "ai", text: d.reply ?? "Sorry, I could not respond.", feedback: null }]))
      .catch(() => setMsgs(prev => [...prev, { role: "ai", text: "I am having trouble connecting. Please try again.", feedback: null }]))
      .finally(() => setTyping(false));
  }

  function setFeedback(idx: number, val: "up" | "down") {
    setMsgs(prev => prev.map((m, i) => i === idx ? { ...m, feedback: val } : m));
  }

  const suggestions = ["Explain my GWA","How do I pay tuition?","How to request a TOR?","Enrollment deadline?","Library hours?"];

  return (
    <>
      <button className="chat-fab" onClick={() => setOpen(!open)} style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 1050 }}>
        {open
          ? <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="22" height="22"><path d="M18 6L6 18M6 6l12 12"/></svg>
          : <img src="/jobert-avatar.png" alt="JOBERT" style={{ width: 48, height: 48, objectFit: "cover", objectPosition: "center top", borderRadius: "50%" }} />
        }
        {!open && <span className="position-absolute top-0 end-0 rounded-circle bg-success border border-white" style={{ width: 13, height: 13 }} />}
      </button>
      {open && (
        <div className="chat-panel">
          <div className="px-4 py-3 d-flex align-items-center gap-3 flex-shrink-0" style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)" }}>
            <div className="rounded-circle overflow-hidden flex-shrink-0 border border-white border-opacity-50" style={{ width: 36, height: 36 }}>
              <img src="/jobert-avatar.png" alt="JOBERT" style={{ width: 36, height: 36, objectFit: "cover", objectPosition: "center top" }} />
            </div>
            <div className="flex-grow-1"><div className="text-white fw-bold small">JOBERT</div><div className="text-white-50" style={{ fontSize: 11 }}>Powered by Zoilo Tomaquin</div></div>
            <span className="badge bg-success-subtle text-success border border-success-subtle" style={{ fontSize: 10 }}>Online</span>
          </div>
          <div className="flex-grow-1 overflow-auto p-3 d-flex flex-column gap-2" style={{ background: "#f8fafc" }}>
            {msgs.map((m, i) => (
              <div key={i} className={`d-flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                {m.role === "ai" && <div className="rounded-circle overflow-hidden flex-shrink-0 border border-primary border-opacity-25" style={{ width: 28, height: 28, marginTop: 2 }}>
                  <img src="/jobert-avatar.png" alt="JOBERT" style={{ width: 28, height: 28, objectFit: "cover", objectPosition: "center top" }} />
                </div>}
                <div className="d-flex flex-column gap-1" style={{ maxWidth: "80%" }}>
                  <div className={`rounded-3 px-3 py-2 small lh-base ${m.role === "ai" ? "bg-white border text-dark shadow-sm" : "bg-primary text-white"}`} style={{ whiteSpace: "pre-line" }}>{m.text}</div>
                  {m.role === "ai" && i > 0 && (
                    <div className="d-flex gap-1 ms-1">
                      <button onClick={() => setFeedback(i, "up")} className={`btn btn-sm py-0 px-1 border-0 ${m.feedback === "up" ? "text-success" : "text-secondary"}`} style={{ fontSize: 13 }}>👍</button>
                      <button onClick={() => setFeedback(i, "down")} className={`btn btn-sm py-0 px-1 border-0 ${m.feedback === "down" ? "text-danger" : "text-secondary"}`} style={{ fontSize: 13 }}>👎</button>
                      {m.feedback === "up" && <span className="text-muted" style={{ fontSize: 10, alignSelf: "center" }}>Glad that helped!</span>}
                      {m.feedback === "down" && <span className="text-muted" style={{ fontSize: 10, alignSelf: "center" }}>Thanks, we will improve this.</span>}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="d-flex gap-2">
                <div className="rounded-circle overflow-hidden flex-shrink-0 border border-primary border-opacity-25" style={{ width: 28, height: 28 }}>
                  <img src="/jobert-avatar.png" alt="JOBERT" style={{ width: 28, height: 28, objectFit: "cover", objectPosition: "center top" }} />
                </div>
                <div className="bg-white border rounded-3 px-3 py-2 d-flex gap-1 align-items-center shadow-sm">
                  {[0,150,300].map(d => <span key={d} className="rounded-circle bg-primary" style={{ width: 6, height: 6, display: "inline-block", animation: `blink 1s ${d}ms infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="px-3 py-2 d-flex gap-2 overflow-auto flex-shrink-0 bg-white border-top" style={{ flexWrap: "nowrap" }}>
            {suggestions.map(s => <button key={s} onClick={() => send(s)} className="btn btn-sm btn-outline-primary flex-shrink-0" style={{ fontSize: 11, whiteSpace: "nowrap" }}>{s}</button>)}
          </div>
          <div className="px-3 pb-3 pt-2 d-flex gap-2 flex-shrink-0 bg-white">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send(input)} placeholder="Ask JOBERT anything..." className="form-control form-control-sm" />
            <button onClick={() => send(input)} disabled={!input.trim() || typing} className="btn btn-primary btn-sm px-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="16" height="16"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Data ── */
const gradeData = [
  { subject:"Mathematics",        icon:"📐", term1:{grade:"A",  pct:92}, term2:{grade:"A-", pct:90}, term3:null, teacher:"Mr. Dela Cruz",  status:"Excellent" },
  { subject:"Physics",            icon:"⚛️", term1:{grade:"B+", pct:87}, term2:{grade:"B+", pct:88}, term3:null, teacher:"Ms. Villanueva", status:"Passing"   },
  { subject:"English Literature", icon:"📖", term1:{grade:"A+", pct:96}, term2:{grade:"A",  pct:94}, term3:null, teacher:"Ms. Santos",     status:"Excellent" },
  { subject:"Chemistry",          icon:"🧪", term1:{grade:"B",  pct:81}, term2:{grade:"B+", pct:84}, term3:null, teacher:"Mr. Fernandez",  status:"Passing"   },
  { subject:"History",            icon:"🏛️", term1:{grade:"B+", pct:85}, term2:{grade:"A-", pct:89}, term3:null, teacher:"Ms. Reyes",      status:"Passing"   },
  { subject:"Computer Science",   icon:"💻", term1:{grade:"A",  pct:93}, term2:{grade:"A",  pct:95}, term3:null, teacher:"Mr. Uy",         status:"Excellent" },
];

const gradeRequests = [
  { id:1, subject:"Mathematics", teacher:"Mr. Dela Cruz", status:"pending", requestedAt:"2h ago" },
];

const timetable: Record<string, { time:string; subject:string; icon:string; room:string; color:string; teacher:string; enter:string; leave:string }[]> = {
  Monday:[
    { time:"07:30–08:30", subject:"Mathematics",        icon:"📐", room:"Room 301", color:"primary",   teacher:"Ms. Maria Santos", enter:"07:25", leave:"08:35" },
    { time:"08:30–09:30", subject:"English Literature", icon:"📖", room:"Room 205", color:"danger",    teacher:"Mr. Juan Dela Cruz", enter:"08:25", leave:"09:35" },
    { time:"10:00–11:00", subject:"Computer Science",   icon:"💻", room:"ICT Lab",  color:"success",   teacher:"Mr. Carlos Fernandez", enter:"09:55", leave:"11:05" },
    { time:"13:00–14:00", subject:"Physical Education", icon:"🏃", room:"Gym",      color:"warning",   teacher:"Coach Maria", enter:"12:55", leave:"14:05" },
  ],
  Tuesday:[
    { time:"07:30–09:00", subject:"Physics",   icon:"⚛️", room:"Sci. Lab", color:"purple",  teacher:"Ms. Ana Reyes", enter:"07:20", leave:"09:05" },
    { time:"09:00–10:30", subject:"Chemistry", icon:"🧪", room:"Chem Lab", color:"info",    teacher:"Dr. Luis Fernandez", enter:"08:55", leave:"10:35" },
    { time:"13:00–14:30", subject:"History",   icon:"🏛️", room:"Room 108", color:"warning", teacher:"Mr. Juan Dela Cruz", enter:"12:55", leave:"14:35" },
  ],
  Wednesday:[
    { time:"07:30–08:30", subject:"Mathematics",        icon:"📐", room:"Room 301", color:"primary", teacher:"Ms. Maria Santos", enter:"07:25", leave:"08:35" },
    { time:"08:30–09:30", subject:"English Literature", icon:"📖", room:"Room 205", color:"danger",  teacher:"Mr. Juan Dela Cruz", enter:"08:25", leave:"09:35" },
    { time:"10:00–11:00", subject:"Computer Science",   icon:"💻", room:"ICT Lab",  color:"success", teacher:"Mr. Carlos Fernandez", enter:"09:55", leave:"11:05" },
  ],
  Thursday:[
    { time:"07:30–09:00", subject:"Physics",   icon:"⚛️", room:"Sci. Lab", color:"purple",  teacher:"Ms. Ana Reyes", enter:"07:20", leave:"09:05" },
    { time:"09:00–10:30", subject:"Chemistry", icon:"🧪", room:"Chem Lab", color:"info",    teacher:"Dr. Luis Fernandez", enter:"08:55", leave:"10:35" },
    { time:"13:00–14:30", subject:"History",   icon:"🏛️", room:"Room 108", color:"warning", teacher:"Mr. Juan Dela Cruz", enter:"12:55", leave:"14:35" },
  ],
  Friday:[
    { time:"07:30–08:30", subject:"Mathematics",        icon:"📐", room:"Room 301", color:"primary", teacher:"Ms. Maria Santos", enter:"07:25", leave:"08:35" },
    { time:"08:30–09:30", subject:"Computer Science",   icon:"💻", room:"ICT Lab",  color:"success", teacher:"Mr. Carlos Fernandez", enter:"08:25", leave:"09:35" },
    { time:"10:00–11:00", subject:"English Literature", icon:"📖", room:"Room 205", color:"danger",  teacher:"Mr. Juan Dela Cruz", enter:"09:55", leave:"11:05" },
  ],
};

const fees = [
  { label:"Tuition Fee",          amount:18500, paid:true  },
  { label:"Miscellaneous Fee",    amount: 2200, paid:true  },
  { label:"Laboratory Fee",       amount: 1500, paid:true  },
  { label:"Student Activity Fee", amount:  800, paid:false },
  { label:"ID / Registration",    amount:  350, paid:false },
];

const notifications = [
  { id:1, type:"grade", title:"Grade Submitted", message:"Mr. Dela Cruz submitted your Mathematics grade: A (92%)", time:"2h ago", read:false, icon:"📊" },
  { id:2, type:"document", title:"Document Approved", message:"Your TOR request has been approved by Admin", time:"4h ago", read:false, icon:"✓" },
  { id:3, type:"enrollment", title:"Enrollment Confirmed", message:"Your enrollment for Term 1 has been confirmed", time:"1d ago", read:true, icon:"🎓" },
  { id:4, type:"attendance", title:"Attendance Alert", message:"Your attendance in Physics is below 80%", time:"2d ago", read:true, icon:"⚠️" },
];

const documentRequests = [
  { id:1, type:"TOR", status:"approved", requestedAt:"May 15, 2026", approvedAt:"May 16, 2026", approvedBy:"Admin", releaseDate:"June 10, 2026", downloadUrl:"#" },
  { id:2, type:"Certificate", status:"pending", requestedAt:"May 18, 2026", approvedAt:null, approvedBy:null, releaseDate:null, downloadUrl:null },
];

const availableDocuments = [
  { id:1, type:"TOR", name:"Transcript of Records", description:"Official academic record with grades and GPA", icon:"📄" },
  { id:2, type:"Certificate", name:"Certificate of Enrollment", description:"Proof of current enrollment status", icon:"📜" },
  { id:3, type:"GoodStanding", name:"Good Standing Certificate", description:"Certificate showing no outstanding balances", icon:"✓" },
];

/* ── Back button ── */
function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="dash-back-btn mb-2">
      ← Back to Dashboard
    </button>
  );
}

/* ── Grades View ── */
function GradesView({ onBack, onAskJobert, darkMode }: { onBack: () => void; onAskJobert: (p: string) => void; darkMode: boolean }) {
  const [selectedTerm, setSelectedTerm] = useState<"term1" | "term2" | "term3">("term1");
  const [requests, setRequests] = useState(gradeRequests);
  
  const termGrades = gradeData.map(g => ({
    ...g,
    currentGrade: selectedTerm === "term1" ? g.term1 : selectedTerm === "term2" ? g.term2 : g.term3,
    hasRequested: requests.some(r => r.subject === g.subject),
  }));
  
  const avg = Math.round(
    termGrades
      .filter(g => g.currentGrade)
      .reduce((a, g) => a + (g.currentGrade?.pct || 0), 0) / 
    termGrades.filter(g => g.currentGrade).length
  );

  function requestTerm3Grade(subject: string, teacher: string) {
    if (!requests.some(r => r.subject === subject)) {
      setRequests([...requests, { id: Date.now(), subject, teacher, status: "pending", requestedAt: "just now" }]);
    }
  }

  return (
    <div className="d-flex flex-column gap-4 w-100">
      <BackBtn onClick={onBack} />
      <div className="d-flex flex-column flex-sm-row align-items-start justify-content-between gap-3">
        <div>
          <h2 className="fw-black fs-4 text-white mb-0">My Grades</h2>
          <p className="text-white-50 small mb-0">School Year 2025–2026</p>
        </div>
        <div className="d-flex flex-column align-items-center gap-1 flex-shrink-0">
          <div className="bg-primary bg-opacity-10 border border-primary border-opacity-25 rounded-3 px-4 py-2 text-center">
            <div className="text-muted" style={{ fontSize: 11 }}>General Average</div>
            <div className="fw-black fs-3 text-primary">{avg}%</div>
          </div>
          <button onClick={() => onAskJobert(`My general average is ${avg}%. Can you explain what this means in the Philippine grading scale?`)}
            className="btn btn-link btn-sm p-0 text-primary" style={{ fontSize: 12 }}>🤖 Ask JOBERT to explain</button>
        </div>
      </div>

      {/* Term Selector */}
      <div className="d-flex gap-2">
        {[
          { id: "term1" as const, label: "Term 1", color: "primary" },
          { id: "term2" as const, label: "Term 2", color: "success" },
          { id: "term3" as const, label: "Term 3", color: "warning" },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTerm(t.id)}
            className={`btn btn-sm flex-grow-1 ${selectedTerm === t.id ? `btn-${t.color} shadow-sm` : "btn-outline-secondary"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Term 3 Request Info */}
      {selectedTerm === "term3" && (
        <div className="alert alert-info border-0 rounded-3 d-flex align-items-start gap-3" role="alert">
          <span style={{ fontSize: 20 }}>ℹ️</span>
          <div>
            <div className="fw-bold small">Term 3 Grades</div>
            <div className="text-muted small">Request Term 3 grades from your teachers. Once approved, your grades will appear here.</div>
          </div>
        </div>
      )}

      {/* Pending Requests */}
      {requests.length > 0 && (
        <div className="card border-0 rounded-3 bg-warning bg-opacity-10 border border-warning border-opacity-25">
          <div className="card-body p-3">
            <div className="fw-bold small text-dark mb-2">📋 Pending Grade Requests</div>
            <div className="d-flex flex-column gap-2">
              {requests.map(req => (
                <div key={req.id} className="d-flex align-items-center justify-content-between p-2 rounded-2 bg-white">
                  <div className="small">
                    <div className="fw-semibold text-dark">{req.subject}</div>
                    <div className="text-muted" style={{ fontSize: 11 }}>{req.teacher} · {req.requestedAt}</div>
                  </div>
                  <span className={`badge ${req.status === "pending" ? "bg-warning-subtle text-warning border border-warning-subtle" : "bg-success-subtle text-success border border-success-subtle"}`}>
                    {req.status === "pending" ? "⏳ Pending" : "✓ Approved"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grades Grid */}
      <div className="row g-3">
        {termGrades.map((g, i) => {
          const hasGrade = g.currentGrade !== null;
          const hasRequested = g.hasRequested;

          return (
            <div key={i} className="col-12 col-sm-6">
              <div className={`card-elevated border-0 rounded-3 h-100 ${!hasGrade && selectedTerm === "term3" ? "opacity-75" : ""}`}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="rounded-3 bg-primary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 40, height: 40, fontSize: 20 }}>{g.icon}</div>
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="fw-bold small text-dark text-truncate">{g.subject}</div>
                      <div className="text-muted" style={{ fontSize: 11 }}>{g.teacher}</div>
                    </div>
                    {hasGrade && g.currentGrade && <div className="fw-black fs-4 text-primary flex-shrink-0">{g.currentGrade.grade}</div>}
                  </div>

                  {hasGrade && g.currentGrade ? (
                    <>
                      <div className="progress mb-2" style={{ height: 6 }}>
                        <div className="progress-bar bg-primary" style={{ width: `${g.currentGrade.pct}%` }} />
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted small">{g.currentGrade.pct}%</span>
                        <span className={`badge-status ${g.currentGrade.pct >= 90 ? "badge-active" : "badge-pending"}`}>{g.status}</span>
                      </div>
                      <button onClick={() => onAskJobert(`I got ${g.currentGrade!.grade} (${g.currentGrade!.pct}%) in ${g.subject} with ${g.teacher}. Can you explain this grade and give me tips to improve?`)}
                        className="btn btn-outline-primary btn-sm w-100" style={{ fontSize: 12 }}>🤖 Ask JOBERT about this grade</button>
                    </>
                  ) : selectedTerm === "term3" ? (
                    <button
                      onClick={() => requestTerm3Grade(g.subject, g.teacher)}
                      disabled={hasRequested}
                      className={`btn w-100 ${hasRequested ? "btn-secondary" : "btn-primary"}`}
                      style={{ fontSize: 12 }}
                    >
                      {hasRequested ? "✓ Request Sent" : "📨 Request Grade"}
                    </button>
                  ) : (
                    <div className="text-center text-muted small">No grade available</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Schedule View ── */
function ScheduleView({ onBack, onAskJobert, darkMode }: { onBack: () => void; onAskJobert: (p: string) => void; darkMode: boolean }) {
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
  const todayIdx = Math.min(new Date().getDay() - 1, 4);
  const [day, setDay] = useState(days[todayIdx >= 0 ? todayIdx : 0]);
  const subjectList = timetable[day].map(c => c.subject).join(", ");

  return (
    <div className="d-flex flex-column gap-4 w-100">
      <BackBtn onClick={onBack} />
      <div className="d-flex flex-column flex-sm-row align-items-start justify-content-between gap-3">
        <div>
          <h2 className="fw-black fs-4 text-white mb-0">My Schedule</h2>
          <p className="text-white-50 small mb-0">Term 1 · 2025–2026</p>
        </div>
        <button onClick={() => onAskJobert(`Today is ${day}. My classes are: ${subjectList}. Can you give me study tips for each subject?`)}
          className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 flex-shrink-0" style={{ fontSize: 12 }}>🤖 Study tips for today</button>
      </div>
      <div className="d-flex gap-2 overflow-auto pb-1">
        {days.map(d => (
          <button key={d} onClick={() => setDay(d)}
            className={`btn btn-sm flex-shrink-0 ${day === d ? "btn-primary shadow-sm" : "btn-outline-secondary"}`}>
            {d.slice(0, 3)}
          </button>
        ))}
      </div>
      <div className="d-flex flex-column gap-2">
        {timetable[day].map((cls, i) => (
          <div key={i} className="card-elevated border-0 rounded-3">
            <div className="card-body p-4">
              <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                <div className="d-flex align-items-center gap-3 flex-grow-1">
                  <div className={`rounded-3 bg-${cls.color} d-flex align-items-center justify-content-center flex-shrink-0`} style={{ width: 44, height: 44, fontSize: 22 }}>{cls.icon}</div>
                  <div className="flex-grow-1">
                    <div className="fw-bold small text-dark">{cls.subject}</div>
                    <div className="text-muted" style={{ fontSize: 11 }}>👨‍🏫 {cls.teacher}</div>
                  </div>
                </div>
                <span className="badge bg-primary-subtle text-primary border border-primary-subtle flex-shrink-0">{cls.time}</span>
              </div>
              <div className="row g-2">
                <div className="col-6 col-sm-3">
                  <div className="rounded-3 p-2 bg-light border text-center">
                    <div className="text-muted" style={{ fontSize: 10 }}>📍 Room</div>
                    <div className="fw-bold small text-dark">{cls.room}</div>
                  </div>
                </div>
                <div className="col-6 col-sm-3">
                  <div className="rounded-3 p-2 bg-success bg-opacity-10 border border-success border-opacity-25 text-center">
                    <div className="text-muted" style={{ fontSize: 10 }}>🚪 Enter</div>
                    <div className="fw-bold small text-success">{cls.enter}</div>
                  </div>
                </div>
                <div className="col-6 col-sm-3">
                  <div className="rounded-3 p-2 bg-danger bg-opacity-10 border border-danger border-opacity-25 text-center">
                    <div className="text-muted" style={{ fontSize: 10 }}>� Leave</div>
                    <div className="fw-bold small text-danger">{cls.leave}</div>
                  </div>
                </div>
                <div className="col-6 col-sm-3">
                  <button onClick={() => onAskJobert(`Give me a quick study tip for ${cls.subject} class at ${cls.time} in ${cls.room}.`)}
                    className="btn btn-link btn-sm p-0 text-primary w-100" title="Ask JOBERT" style={{ fontSize: 12 }}>🤖 Ask JOBERT</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Pay Balance Button ── */
function PayBalanceButton() {
  const [clicked, setClicked] = useState(false);
  if (clicked) {
    return (
      <div className="rounded-3 p-4 text-center" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)" }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏢</div>
        <div className="fw-bold text-success mb-1">Please pay at the Registrar's Office</div>
        <div className="text-muted small">Bring your student ID and go to Room 101, Admin Building.</div>
        <div className="text-muted small mt-1">Mon–Fri · 8AM–5PM</div>
      </div>
    );
  }
  return (
    <button onClick={() => setClicked(true)} className="btn btn-inform w-100 py-3 rounded-3 fw-bold fs-6">
      Pay Balance
    </button>
  );
}

/* ── Tuition View ── */
function TuitionView({ onBack, onAskJobert, darkMode }: { onBack: () => void; onAskJobert: (p: string) => void; darkMode: boolean }) {
  const total   = fees.reduce((a, f) => a + f.amount, 0);
  const paid    = fees.filter(f => f.paid).reduce((a, f) => a + f.amount, 0);
  const balance = total - paid;
  const unpaidList = fees.filter(f => !f.paid).map(f => f.label).join(", ");
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
    <div className="d-flex flex-column gap-4 w-100">
      <BackBtn onClick={onBack} />
      <div className="d-flex flex-column flex-sm-row align-items-start justify-content-between gap-3 scroll-reveal">
        <div>
          <h2 className="fw-black fs-4 text-white mb-0">
            <span style={{
              background: 'linear-gradient(135deg, #dc2626, #f97316, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Tuition Fee</span>
          </h2>
          <p className="text-white-50 small mb-0">Term 1 · 2025–2026</p>
        </div>
        <button onClick={() => onAskJobert(`I have an unpaid balance of ₱${balance.toLocaleString()} for: ${unpaidList}. How do I pay my tuition?`)}
          className="btn btn-outline-primary btn-sm flex-shrink-0" style={{ 
            fontSize: 12,
            borderColor: '#dc2626',
            color: '#dc2626'
          }} onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #dc2626, #f97316)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>🤖 How do I pay?</button>
      </div>
      <div className="row g-3 scroll-reveal">
        {[
          { label:"Total",   value:`₱${total.toLocaleString()}`,   color: 'linear-gradient(135deg, #0f172a, #1e293b)', textColor: 'white' },
          { label:"Paid",    value:`₱${paid.toLocaleString()}`,    color: 'linear-gradient(135deg, #10b981, #059669)', textColor: 'white' },
          { label:"Balance", value:`₱${balance.toLocaleString()}`, color: 'linear-gradient(135deg, #dc2626, #f97316)', textColor: 'white' },
        ].map((s, i) => (
          <div key={s.label} className="col-4">
            <div 
              ref={(el) => { cardRefs.current[i] = el; }}
              className="rounded-3 p-4 text-center card-3d-tilt"
              style={{ 
                background: s.color,
                color: s.textColor,
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                transformStyle: 'preserve-3d',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseMove={(e) => handleTiltMouseMove(e, i)}
              onMouseLeave={() => handleTiltMouseLeave(i)}
            >
              <div style={{ opacity: 0.9, fontSize: '0.875rem', marginBottom: '0.5rem' }}>{s.label}</div>
              <div className="fw-black fs-3">{s.value}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card-glow-border scroll-reveal">
        <div className="card-elevated border-0 shadow-sm rounded-3" style={{ background: 'white' }}>
          <ul className="list-group list-group-flush rounded-3">
            {fees.map((f, i) => (
              <li key={i} className="list-group-item d-flex align-items-center justify-content-between px-4 py-3" style={{ borderColor: 'rgba(220, 38, 38, 0.1)' }}>
                <span className="small fw-medium" style={{ color: '#0f172a' }}>{f.label}</span>
                <div className="d-flex align-items-center gap-3">
                  <span className="small fw-semibold" style={{ color: '#0f172a' }}>₱{f.amount.toLocaleString()}</span>
                  <span className={`badge-status ${f.paid ? "badge-active" : "badge-pending"}`}>
                    {f.paid ? "Paid" : "Unpaid"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="scroll-reveal">
        <PayBalanceButton />
      </div>
    </div>
  );
}

/* ── Dashboard Home ── */
const tiles = [
  { id: "grades"   as const, label: "View Grades",   icon: "📊", color: "#1e3a6e" },
  { id: "schedule" as const, label: "View Schedule", icon: "📅", color: "#1e3a6e" },
  { id: "tuition"  as const, label: "Tuition Fee",   icon: "💰", color: "#1e3a6e" },
  { id: "documents" as const, label: "Documents",    icon: "📄", color: "#1e3a6e" },
];

function DashboardHome({ setPanel, onAskJobert, darkMode, notifs, markAsRead, markAllAsRead, deleteNotification }: { 
  setPanel: (p: Panel) => void; 
  onAskJobert: (p: string) => void; 
  darkMode: boolean;
  notifs: typeof notifications;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: number) => void;
}) {
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const unreadCount = notifs.filter(n => !n.read).length;
  const unread = notifs.filter(n => !n.read);
  const read = notifs.filter(n => n.read);
  
  return (
    <div className="dash-glass position-relative dash-reveal">
      {/* Notifications */}
      <button
        type="button"
        onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
        className="dash-notif-btn"
        title="View notifications"
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742.37.142.765.214 1.175.214.72 0 1.404-.337 1.84-.999.46.666 1.19.999 2.003.999.8 0 1.538-.334 1.996-.999.42.675 1.07 1 1.79 1.035-.23-1.218-.711-4.471-.711-5.957 0-.922-.184-1.702-.522-2.256A4.996 4.996 0 0 0 8 1.918z"/>
          </svg>
          {unreadCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "10px", padding: "2px 5px", fontWeight: "bold" }}>
              {unreadCount}
            </span>
          )}
        </div>
      </button>

      {/* Notification Dropdown Panel */}
      {showNotificationDropdown && (
        <div
          style={{
            position: "fixed",
            top: 60,
            right: 20,
            width: "360px",
            maxHeight: "500px",
            background: "white",
            border: "1px solid rgba(0,0,0,0.1)",
            zIndex: 9999,
            overflowY: "auto",
            borderRadius: "0.75rem",
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            animation: "slideInDown 0.2s ease-out"
          }}
        >
          {/* Header */}
          <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
            <div>
              <h6 className="fw-bold text-dark mb-0">Notifications</h6>
              <small className="text-muted">{unreadCount} unread</small>
            </div>
            <div className="d-flex align-items-center gap-2">
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="btn btn-link btn-sm p-0 text-primary" style={{ fontSize: "11px" }}>
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setShowNotificationDropdown(false)}
                className="btn btn-link btn-sm p-0 text-muted"
                style={{ fontSize: "18px" }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {unread.length > 0 && (
              <>
                <div className="px-4 py-2" style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <small className="text-muted fw-semibold">UNREAD</small>
                </div>
                {unread.map(n => (
                  <div key={n.id} className="px-4 py-3 border-bottom d-flex gap-3" style={{ borderColor: "rgba(0,0,0,0.05)", background: "rgba(59,130,246,0.02)" }}>
                    <div style={{ fontSize: "20px", minWidth: "24px" }}>{n.icon}</div>
                    <div className="flex-grow-1">
                      <div className="fw-bold small text-dark">{n.title}</div>
                      <div className="text-muted" style={{ fontSize: "12px", lineHeight: "1.4" }}>{n.message}</div>
                      <div className="text-muted" style={{ fontSize: "11px", marginTop: "4px" }}>{n.time}</div>
                    </div>
                    <div className="d-flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="btn btn-link btn-sm p-0 text-primary"
                        style={{ fontSize: "12px" }}
                        title="Mark as read"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => deleteNotification(n.id)}
                        className="btn btn-link btn-sm p-0 text-danger"
                        style={{ fontSize: "14px" }}
                        title="Delete"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {read.length > 0 && (
              <>
                <div className="px-4 py-2" style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <small className="text-muted fw-semibold">READ</small>
                </div>
                {read.map(n => (
                  <div key={n.id} className="px-4 py-3 border-bottom d-flex gap-3" style={{ borderColor: "rgba(0,0,0,0.05)", opacity: 0.7 }}>
                    <div style={{ fontSize: "20px", minWidth: "24px" }}>{n.icon}</div>
                    <div className="flex-grow-1">
                      <div className="fw-bold small text-dark">{n.title}</div>
                      <div className="text-muted" style={{ fontSize: "12px", lineHeight: "1.4" }}>{n.message}</div>
                      <div className="text-muted" style={{ fontSize: "11px", marginTop: "4px" }}>{n.time}</div>
                    </div>
                    <button
                      onClick={() => deleteNotification(n.id)}
                      className="btn btn-link btn-sm p-0 text-danger flex-shrink-0"
                      style={{ fontSize: "14px" }}
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </>
            )}

            {notifs.length === 0 && (
              <div className="px-4 py-5 text-center text-muted">
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔔</div>
                <small>No notifications</small>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifs.length > 0 && (
            <div className="px-4 py-2 border-top text-center" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
              <button
                onClick={() => setPanel("notifications")}
                className="btn btn-link btn-sm p-0 text-primary"
                style={{ fontSize: "12px" }}
              >
                View all notifications →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {showNotificationDropdown && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ zIndex: 9998 }}
          onClick={() => setShowNotificationDropdown(false)}
        />
      )}

      {/* Hero banner */}
      <div className="dash-hero">
        <div className="dash-hero-title">Welcome, Jamie Santos 👋</div>
        <div className="dash-hero-sub">STU-2024-001 · STEM Grade 11 · Term 1 SY 2025–2026</div>
        <div className="dash-hero-badges">
          <span className="dash-badge">🎓 Active Student</span>
          <span className="dash-badge dash-badge-gold">🔔 Enrollment Open</span>
        </div>
      </div>

      {/* Service tiles */}
      <div className="dash-body">
        <p className="dash-section-label">Quick Access</p>
        <div className="dash-tiles">
          {tiles.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setPanel(t.id)}
              className={`dash-tile border-0 ${
                t.id === "grades" ? "dash-tile-student" :
                t.id === "schedule" ? "dash-tile-schedule" :
                t.id === "tuition" ? "dash-tile-tuition dash-tile-wide" :
                "dash-tile-docs"
              }`}
            >
              <span className="dash-tile-icon">{t.icon}</span>
              <span className="dash-tile-label">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Documents View ── */
function DocumentsView({ onBack, onAskJobert, darkMode }: { onBack: () => void; onAskJobert: (p: string) => void; darkMode: boolean }) {
  const [requests, setRequests] = useState(documentRequests);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  function requestDocument(type: string) {
    const newRequest = {
      id: Date.now(),
      type,
      status: "pending" as const,
      requestedAt: new Date().toLocaleDateString(),
      approvedAt: null,
      approvedBy: null,
      releaseDate: null,
      downloadUrl: null,
    };
    setRequests([...requests, newRequest]);
    setSelectedDoc(null);
  }

  const pending = requests.filter(r => r.status === "pending");
  const approved = requests.filter(r => r.status === "approved");

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
    <div className="d-flex flex-column gap-4 w-100">
      <BackBtn onClick={onBack} />
      <div className="d-flex flex-column flex-sm-row align-items-start justify-content-between gap-3 scroll-reveal">
        <div>
          <h2 className="fw-black fs-4 text-white mb-0">
            <span style={{
              background: 'linear-gradient(135deg, #dc2626, #f97316, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Documents</span>
          </h2>
          <p className="text-white-50 small mb-0">Request and download official documents</p>
        </div>
      </div>

      {/* Available Documents */}
      <div className="scroll-reveal">
        <p className="text-white-50 small fw-semibold mb-3">📋 Available Documents</p>
        <div className="row g-3">
          {availableDocuments.map((doc, i) => (
            <div key={doc.id} className="col-12 col-sm-6">
              <div 
                ref={(el) => { cardRefs.current[i] = el; }}
                className="card-glow-border card-3d-tilt h-100"
                onMouseMove={(e) => handleTiltMouseMove(e, i)}
                onMouseLeave={() => handleTiltMouseLeave(i)}
              >
                <div className="card-elevated border-0 rounded-3 h-100" style={{ 
                  background: 'white',
                  transform: 'translateY(0) rotateX(var(--rotateX, 0deg)) rotateY(var(--rotateY, 0deg))',
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  <div className="card-body p-4">
                    <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                      <div>
                        <div className="fw-bold" style={{ fontSize: 18, color: '#0f172a' }}>{doc.icon} {doc.name}</div>
                        <div className="text-muted small mt-1">{doc.description}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => requestDocument(doc.type)}
                      disabled={requests.some(r => r.type === doc.type && r.status === "pending")}
                      className={`btn w-100 ${requests.some(r => r.type === doc.type && r.status === "pending") ? "btn-secondary" : ""}`}
                      style={{ 
                        fontSize: 12,
                        background: requests.some(r => r.type === doc.type && r.status === "pending") ? undefined : 'linear-gradient(135deg, #dc2626, #f97316)',
                        border: 'none',
                        color: 'white'
                      }}
                      onMouseEnter={(e) => {
                        if (!e.currentTarget.disabled) {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 10px 30px rgba(220, 38, 38, 0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {requests.some(r => r.type === doc.type && r.status === "pending") ? "⏳ Request Pending" : "📨 Request Document"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Requests */}
      {pending.length > 0 && (
        <div className="scroll-reveal">
          <p className="text-white-50 small fw-semibold mb-3">⏳ Pending Requests</p>
          <div className="d-flex flex-column gap-2">
            {pending.map(req => (
              <div key={req.id} className="card border-0 rounded-3" style={{ 
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(249, 115, 22, 0.1))',
                border: '1px solid rgba(251, 191, 36, 0.2)'
              }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div className="fw-bold small" style={{ color: '#0f172a' }}>{req.type}</div>
                      <div style={{ fontSize: 11, color: 'rgba(15, 23, 42, 0.6)' }}>Requested {req.requestedAt}</div>
                    </div>
                    <span className="badge" style={{ background: 'linear-gradient(135deg, #fbbf24, #f97316)', color: 'white' }}>⏳ Pending</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved Documents */}
      {approved.length > 0 && (
        <div className="scroll-reveal">
          <p className="text-white-50 small fw-semibold mb-3">✓ Approved Documents</p>
          <div className="d-flex flex-column gap-2">
            {approved.map(req => (
              <div key={req.id} className="card border-0 rounded-3" style={{ 
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-start justify-content-between gap-3">
                    <div>
                      <div className="fw-bold small" style={{ color: '#0f172a' }}>{req.type}</div>
                      <div style={{ fontSize: 11, color: 'rgba(15, 23, 42, 0.6)' }}>Approved {req.approvedAt} by {req.approvedBy}</div>
                    </div>
                    <div className="text-end flex-shrink-0">
                      {req.releaseDate ? (
                        <div>
                          <span className="badge d-block mb-1" style={{ 
                            fontSize: 11, 
                            background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                            color: 'white' 
                          }}>
                            📅 Pick up: {req.releaseDate}
                          </span>
                          <div style={{ fontSize: 10, color: 'rgba(15, 23, 42, 0.6)' }}>Go to Registrar's Office</div>
                        </div>
                      ) : (
                        <span className="badge" style={{ fontSize: 11, background: 'linear-gradient(135deg, #fbbf24, #f97316)', color: 'white' }}>
                          ⏳ Schedule pending
                        </span>
                      )}
                    </div>
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

/* ── Notifications View ── */
function NotificationsView({ onBack, onAskJobert, darkMode, notifs, markAsRead, markAllAsRead, deleteNotification }: { 
  onBack: () => void; 
  onAskJobert: (p: string) => void; 
  darkMode: boolean;
  notifs: typeof notifications;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: number) => void;
}) {
  const unread = notifs.filter(n => !n.read);
  const read = notifs.filter(n => n.read);

  return (
    <div className="d-flex flex-column gap-4 w-100">
      <BackBtn onClick={onBack} />
      <div className="d-flex flex-column flex-sm-row align-items-start justify-content-between gap-3">
        <div>
          <h2 className="fw-black fs-4 text-white mb-0">Notifications</h2>
          <p className="text-white-50 small mb-0">{unread.length} unread notifications</p>
        </div>
        {unread.length > 0 && (
          <button onClick={markAllAsRead} className="btn btn-outline-primary btn-sm flex-shrink-0" style={{ fontSize: 12 }}>
            ✓ Mark all as read
          </button>
        )}
      </div>

      {/* Unread Notifications */}
      {unread.length > 0 && (
        <div>
          <p className="text-white-50 small fw-semibold mb-3">🔔 Unread</p>
          <div className="d-flex flex-column gap-2">
            {unread.map(notif => (
              <div key={notif.id} className="card border-0 rounded-3" style={{ background: "rgba(220, 38, 38, 0.15)", border: "1px solid rgba(220, 38, 38, 0.3)" }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-start gap-3">
                    <span style={{ fontSize: 20 }}>{notif.icon}</span>
                    <div className="flex-grow-1">
                      <div className="fw-bold small text-white">{notif.title}</div>
                      <div className="text-white-50 small mt-1">{notif.message}</div>
                      <div className="text-white-50 small mt-2" style={{ fontSize: 11 }}>{notif.time}</div>
                    </div>
                    <div className="d-flex gap-1 flex-shrink-0">
                      <button onClick={() => markAsRead(notif.id)} className="btn btn-link btn-sm p-0 text-primary" style={{ fontSize: 12 }}>✓ Read</button>
                      <button onClick={() => deleteNotification(notif.id)} className="btn btn-link btn-sm p-0 text-danger" style={{ fontSize: 12 }}>✕</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Read Notifications */}
      {read.length > 0 && (
        <div>
          <p className="text-white-50 small fw-semibold mb-3">✓ Read</p>
          <div className="d-flex flex-column gap-2">
            {read.map(notif => (
              <div key={notif.id} className="card border-0 rounded-3 opacity-75" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-start justify-content-between gap-3">
                    <div className="d-flex align-items-start gap-3 flex-grow-1">
                      <span style={{ fontSize: 18 }}>{notif.icon}</span>
                      <div>
                        <div className="fw-bold small text-white">{notif.title}</div>
                        <div className="text-white-50 small mt-1">{notif.message}</div>
                      </div>
                    </div>
                    <button onClick={() => deleteNotification(notif.id)} className="btn btn-link btn-sm p-0 text-danger flex-shrink-0" style={{ fontSize: 12 }}>✕</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {notifs.length === 0 && (
        <div className="card border-0 rounded-3" style={{ background: "rgba(255,255,255,0.05)" }}>
          <div className="card-body p-4 text-center text-white-50">
            <p className="small mb-0">No notifications</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Page ── */
export default function DashboardPage() {
  const [panel, setPanel]               = useState<Panel>("home");
  const [jobertPrompt, setJobertPrompt] = useState<string | undefined>(undefined);
  const [notifs, setNotifs]             = useState(notifications);

  function markAsRead(id: number) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function markAllAsRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  }

  function deleteNotification(id: number) {
    setNotifs(prev => prev.filter(n => n.id !== id));
  }

  function askJobert(prompt: string) {
    setJobertPrompt(undefined);
    setTimeout(() => setJobertPrompt(prompt), 50);
  }

  return (
    <PremiumDashboardShell
      portalTitle="INFORM"
      portalSubtitle="Student Portal"
      userName="Jamie Santos"
      userMeta="STEM Grade 11 · STU-2024-001"
      logoutHref="/login"
    >
      {panel === "home"     && <DashboardHome setPanel={setPanel} onAskJobert={askJobert} darkMode={true} notifs={notifs} markAsRead={markAsRead} markAllAsRead={markAllAsRead} deleteNotification={deleteNotification} />}
      {panel === "grades"   && <div className="dash-glass p-4 dash-reveal"><GradesView   onBack={() => setPanel("home")} onAskJobert={askJobert} darkMode={true} /></div>}
      {panel === "schedule" && <div className="dash-glass p-4 dash-reveal"><ScheduleView onBack={() => setPanel("home")} onAskJobert={askJobert} darkMode={true} /></div>}
      {panel === "tuition"  && <div className="dash-glass p-4 dash-reveal"><TuitionView  onBack={() => setPanel("home")} onAskJobert={askJobert} darkMode={true} /></div>}
      {panel === "documents" && <div className="dash-glass p-4 dash-reveal"><DocumentsView onBack={() => setPanel("home")} onAskJobert={askJobert} darkMode={true} /></div>}
      {panel === "notifications" && <div className="dash-glass p-4 dash-reveal"><NotificationsView onBack={() => setPanel("home")} onAskJobert={askJobert} darkMode={true} notifs={notifs} markAsRead={markAsRead} markAllAsRead={markAllAsRead} deleteNotification={deleteNotification} /></div>}
      <JobertChat initialPrompt={jobertPrompt} />
    </PremiumDashboardShell>
  );
}
