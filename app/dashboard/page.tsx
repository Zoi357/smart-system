"use client";


import { useState, useEffect, useRef } from "react";
import type React from "react";
import Link from "next/link";

type Panel = "home" | "grades" | "schedule" | "tuition" | "library";
type JMsg  = { role: "ai" | "user"; text: string; feedback?: "up" | "down" | null };

/* ══════════════════════════════════════════
   JOBERT MINI CHAT  (#1 — inside dashboard)
   Shared by all panels
══════════════════════════════════════════ */
function JobertChat({ initialPrompt }: { initialPrompt?: string }) {
  const [open, setOpen]     = useState(false);
  const [msgs, setMsgs]     = useState<JMsg[]>([
    { role: "ai", text: "Hi! I am JOBERT, your INFORM Assistant. I can help you understand your grades, schedule, tuition, library, and more. What do you need?" },
  ]);
  const [input, setInput]   = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef           = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  /* auto-open and pre-fill if a prompt is injected */
  useEffect(() => {
    if (initialPrompt) {
      setOpen(true);
      send(initialPrompt);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: JMsg = { role: "user", text: text.trim() };
    const newMsgs = [...msgs, userMsg];
    setMsgs(newMsgs);
    setInput("");
    setTyping(true);

    fetch("/api/jobert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text.trim(),
        history: newMsgs.slice(-6).map(m => ({ role: m.role, text: m.text })),
      }),
    })
      .then(r => r.json())
      .then(d => setMsgs(prev => [...prev, { role: "ai", text: d.reply ?? "Sorry, I could not respond. Please try again.", feedback: null }]))
      .catch(() => setMsgs(prev => [...prev, { role: "ai", text: "I am having trouble connecting. Please check your internet and try again.", feedback: null }]))
      .finally(() => setTyping(false));
  }

  function setFeedback(idx: number, val: "up" | "down") {
    setMsgs(prev => prev.map((m, i) => i === idx ? { ...m, feedback: val } : m));
  }

  const suggestions = [
    "Explain my GWA",
    "How do I pay tuition?",
    "How to request a TOR?",
    "Enrollment deadline?",
    "Library hours?",
  ];

  return (
    <>
      {/* floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
        style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)", boxShadow: "0 8px 32px rgba(37,99,235,0.45)" }}
      >
        {open
          ? <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-6 h-6"><path d="M18 6L6 18M6 6l12 12"/></svg>
          : <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-7 h-7"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.06-1.37L2 22l1.37-4.94A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2"/><path d="M8 10h.01M12 10h.01M16 10h.01" strokeLinecap="round"/></svg>
        }
        {!open && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white animate-pulse" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-3xl overflow-hidden flex flex-col"
          style={{ height:"500px", background:"white", boxShadow:"0 24px 64px rgba(37,99,235,0.18)", border:"1px solid rgba(37,99,235,0.1)" }}>
          {/* header */}
          <div className="px-5 py-4 flex items-center gap-3 shrink-0" style={{ background:"linear-gradient(135deg,#2563eb,#1d4ed8)" }}>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0">AI</div>
            <div className="flex-1">
              <div className="text-white font-bold text-sm">JOBERT</div>
              <div className="text-blue-200 text-xs">Powered by Gemini AI</div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-blue-200 text-xs">Online</span>
            </div>
          </div>
          {/* messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 bg-slate-50">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role==="user" ? "flex-row-reverse" : ""}`}>
                {m.role==="ai" && <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">AI</div>}
                <div className="flex flex-col gap-1 max-w-[80%]">
                  <div className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${m.role==="ai" ? "bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm" : "bg-blue-600 text-white rounded-tr-sm"}`}>
                    {m.text}
                  </div>
                  {m.role==="ai" && i>0 && (
                    <div className="flex gap-1 ml-1">
                      <button onClick={() => setFeedback(i,"up")} className={`text-xs px-1.5 py-0.5 rounded-lg transition-all ${m.feedback==="up" ? "bg-green-100 text-green-600" : "text-slate-300 hover:text-green-500"}`}>&#128077;</button>
                      <button onClick={() => setFeedback(i,"down")} className={`text-xs px-1.5 py-0.5 rounded-lg transition-all ${m.feedback==="down" ? "bg-red-100 text-red-500" : "text-slate-300 hover:text-red-400"}`}>&#128078;</button>
                      {m.feedback==="up" && <span className="text-xs text-slate-400 ml-1 self-center">Glad that helped!</span>}
                      {m.feedback==="down" && <span className="text-xs text-slate-400 ml-1 self-center">Thanks, we will improve this.</span>}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">AI</div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center shadow-sm">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay:"0ms"}}/>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay:"150ms"}}/>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay:"300ms"}}/>
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>
          {/* suggestions */}
          <div className="px-3 py-2 flex gap-1.5 overflow-x-auto shrink-0 bg-white border-t border-slate-100">
            {suggestions.map(s => (
              <button key={s} onClick={() => send(s)} className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 transition-colors whitespace-nowrap">{s}</button>
            ))}
          </div>
          {/* input */}
          <div className="px-3 pb-3 pt-2 flex gap-2 shrink-0 bg-white">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter" && send(input)}
              placeholder="Ask JOBERT anything..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition"/>
            <button onClick={() => send(input)} disabled={!input.trim()||typing}
              className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 flex items-center justify-center transition-colors shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-4 h-4"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const gradeData = [
  { subject:"Mathematics",        icon:"📐", grade:"A",  pct:92, teacher:"Mr. Dela Cruz",  status:"Excellent" },
  { subject:"Physics",            icon:"⚛️", grade:"B+", pct:87, teacher:"Ms. Villanueva", status:"Passing"   },
  { subject:"English Literature", icon:"📖", grade:"A+", pct:96, teacher:"Ms. Santos",     status:"Excellent" },
  { subject:"Chemistry",          icon:"🧪", grade:"B",  pct:81, teacher:"Mr. Fernandez",  status:"Passing"   },
  { subject:"History",            icon:"🏛️", grade:"B+", pct:85, teacher:"Ms. Reyes",      status:"Passing"   },
  { subject:"Computer Science",   icon:"💻", grade:"A",  pct:93, teacher:"Mr. Uy",         status:"Excellent" },
];

const timetable: Record<string, { time:string; subject:string; icon:string; room:string; color:string }[]> = {
  Monday:[
    { time:"07:30–08:30", subject:"Mathematics",        icon:"📐", room:"Room 301", color:"bg-blue-600"   },
    { time:"08:30–09:30", subject:"English Literature", icon:"📖", room:"Room 205", color:"bg-pink-600"   },
    { time:"10:00–11:00", subject:"Computer Science",   icon:"💻", room:"ICT Lab",  color:"bg-green-600"  },
    { time:"13:00–14:00", subject:"Physical Education", icon:"🏃", room:"Gym",      color:"bg-rose-500"   },
  ],
  Tuesday:[
    { time:"07:30–09:00", subject:"Physics",   icon:"⚛️", room:"Sci. Lab", color:"bg-purple-600" },
    { time:"09:00–10:30", subject:"Chemistry", icon:"🧪", room:"Chem Lab", color:"bg-cyan-600"   },
    { time:"13:00–14:30", subject:"History",   icon:"🏛️", room:"Room 108", color:"bg-amber-600"  },
  ],
  Wednesday:[
    { time:"07:30–08:30", subject:"Mathematics",        icon:"📐", room:"Room 301", color:"bg-blue-600"  },
    { time:"08:30–09:30", subject:"English Literature", icon:"📖", room:"Room 205", color:"bg-pink-600"  },
    { time:"10:00–11:00", subject:"Computer Science",   icon:"💻", room:"ICT Lab",  color:"bg-green-600" },
  ],
  Thursday:[
    { time:"07:30–09:00", subject:"Physics",   icon:"⚛️", room:"Sci. Lab", color:"bg-purple-600" },
    { time:"09:00–10:30", subject:"Chemistry", icon:"🧪", room:"Chem Lab", color:"bg-cyan-600"   },
    { time:"13:00–14:30", subject:"History",   icon:"🏛️", room:"Room 108", color:"bg-amber-600"  },
  ],
  Friday:[
    { time:"07:30–08:30", subject:"Mathematics",        icon:"📐", room:"Room 301", color:"bg-blue-600"  },
    { time:"08:30–09:30", subject:"Computer Science",   icon:"💻", room:"ICT Lab",  color:"bg-green-600" },
    { time:"10:00–11:00", subject:"English Literature", icon:"📖", room:"Room 205", color:"bg-pink-600"  },
  ],
};

const fees = [
  { label:"Tuition Fee",          amount:18500, paid:true  },
  { label:"Miscellaneous Fee",    amount: 2200, paid:true  },
  { label:"Laboratory Fee",       amount: 1500, paid:true  },
  { label:"Library Fee",          amount:  500, paid:false },
  { label:"Student Activity Fee", amount:  800, paid:false },
  { label:"ID / Registration",    amount:  350, paid:false },
];

const books = [
  { title:"Calculus: Early Transcendentals",  author:"James Stewart",       category:"Mathematics", available:true,  due:null    },
  { title:"Conceptual Physics",               author:"Paul G. Hewitt",      category:"Physics",     available:false, due:"Jun 2" },
  { title:"Complete Works of Shakespeare",    author:"W. Shakespeare",      category:"Literature",  available:true,  due:null    },
  { title:"Chemistry: The Central Science",   author:"Brown & LeMay",       category:"Chemistry",   available:true,  due:null    },
  { title:"Sapiens: A Brief History",         author:"Yuval Noah Harari",   category:"History",     available:false, due:"Jun 5" },
  { title:"Introduction to Algorithms",       author:"Cormen et al.",       category:"CS",          available:true,  due:null    },
  { title:"The Great Gatsby",                 author:"F. Scott Fitzgerald", category:"Literature",  available:true,  due:null    },
];

/* ══════════════════════════════════════════
   BACK BUTTON
══════════════════════════════════════════ */
function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm font-semibold transition-colors mb-2">
      ← Back to Dashboard
    </button>
  );
}

/* ══════════════════════════════════════════
   #2 GRADES VIEW — Ask JOBERT per subject
══════════════════════════════════════════ */
function GradesView({ onBack, onAskJobert }: { onBack: () => void; onAskJobert: (p: string) => void }) {
  const avg = Math.round(gradeData.reduce((a, g) => a + g.pct, 0) / gradeData.length);
  return (
    <div className="flex flex-col gap-5 w-full max-w-2xl mx-auto">
      <BackBtn onClick={onBack} />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-800 font-extrabold text-2xl">My Grades</h2>
          <p className="text-slate-400 text-sm">1st Semester · 2025–2026</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-3 text-center">
            <div className="text-xs text-slate-400">General Average</div>
            <div className="text-2xl font-extrabold text-blue-600">{avg}%</div>
          </div>
          {/* #2 — explain GWA */}
          <button
            onClick={() => onAskJobert(`My general average is ${avg}%. Can you explain what this means in the Philippine grading scale and what I need to improve?`)}
            className="text-xs text-blue-500 hover:text-blue-700 font-semibold transition-colors flex items-center gap-1"
          >
            🤖 Ask JOBERT to explain
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {gradeData.map((g, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-xl shrink-0">{g.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-slate-700 font-bold text-sm truncate">{g.subject}</div>
                <div className="text-slate-400 text-xs">{g.teacher}</div>
              </div>
              <div className="text-2xl font-extrabold text-blue-600 shrink-0">{g.grade}</div>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-blue-500 rounded-full" style={{ width:`${g.pct}%` }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs">{g.pct}%</span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${g.status==="Excellent" ? "bg-green-100 text-green-600" : "bg-blue-50 text-blue-500"}`}>{g.status}</span>
            </div>
            {/* #2 — per-subject ask JOBERT */}
            <button
              onClick={() => onAskJobert(`I got ${g.grade} (${g.pct}%) in ${g.subject} with ${g.teacher}. Can you explain this grade and give me tips to improve?`)}
              className="mt-3 w-full text-xs text-blue-500 hover:text-blue-700 border border-blue-100 hover:border-blue-300 rounded-xl py-1.5 transition-all flex items-center justify-center gap-1"
            >
              🤖 Ask JOBERT about this grade
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   #3 SCHEDULE VIEW — Study tips for today
══════════════════════════════════════════ */
function ScheduleView({ onBack, onAskJobert }: { onBack: () => void; onAskJobert: (p: string) => void }) {
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
  const todayIdx = Math.min(new Date().getDay() - 1, 4);
  const [day, setDay] = useState(days[todayIdx >= 0 ? todayIdx : 0]);

  const todayClasses = timetable[day];
  const subjectList  = todayClasses.map(c => c.subject).join(", ");

  return (
    <div className="flex flex-col gap-5 w-full max-w-2xl mx-auto">
      <BackBtn onClick={onBack} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-slate-800 font-extrabold text-2xl">My Schedule</h2>
          <p className="text-slate-400 text-sm">1st Semester · 2025–2026</p>
        </div>
        {/* #3 — study tips button */}
        <button
          onClick={() => onAskJobert(`Today is ${day}. My classes are: ${subjectList}. Can you give me study tips and how to prepare for each subject today?`)}
          className="shrink-0 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 text-xs font-semibold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5"
        >
          🤖 Study tips for today
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {days.map(d => (
          <button key={d} onClick={() => setDay(d)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${day===d ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"}`}>
            {d.slice(0,3)}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {timetable[day].map((cls, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4 hover:border-blue-200 transition-all">
            <div className="text-xs font-mono text-slate-400 w-28 shrink-0">{cls.time}</div>
            <div className={`w-11 h-11 rounded-xl ${cls.color} flex items-center justify-center text-2xl shrink-0`}>{cls.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-slate-700 font-bold text-sm">{cls.subject}</div>
              <div className="text-slate-400 text-xs mt-0.5">📍 {cls.room}</div>
            </div>
            {/* per-class tip */}
            <button
              onClick={() => onAskJobert(`Give me a quick study tip for ${cls.subject} class at ${cls.time} in ${cls.room}.`)}
              className="shrink-0 text-blue-400 hover:text-blue-600 text-xs transition-colors"
              title="Ask JOBERT for a tip"
            >🤖</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   #4 TUITION VIEW — Payment guide button
══════════════════════════════════════════ */
function TuitionView({ onBack, onAskJobert }: { onBack: () => void; onAskJobert: (p: string) => void }) {
  const total   = fees.reduce((a, f) => a + f.amount, 0);
  const paid    = fees.filter(f => f.paid).reduce((a, f) => a + f.amount, 0);
  const balance = total - paid;
  const unpaidList = fees.filter(f => !f.paid).map(f => f.label).join(", ");

  return (
    <div className="flex flex-col gap-5 w-full max-w-2xl mx-auto">
      <BackBtn onClick={onBack} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-slate-800 font-extrabold text-2xl">Tuition Fee</h2>
          <p className="text-slate-400 text-sm">1st Semester · 2025–2026</p>
        </div>
        {/* #4 — payment guide */}
        <button
          onClick={() => onAskJobert(`I have an unpaid balance of ₱${balance.toLocaleString()} for: ${unpaidList}. How do I pay my tuition at Benedicto College? What are the steps, where do I go, and what do I bring?`)}
          className="shrink-0 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 text-xs font-semibold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5"
        >
          🤖 How do I pay?
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label:"Total",   value:`₱${total.toLocaleString()}`,   color:"text-slate-800", bg:"bg-slate-50 border-slate-200" },
          { label:"Paid",    value:`₱${paid.toLocaleString()}`,    color:"text-green-600", bg:"bg-green-50 border-green-200" },
          { label:"Balance", value:`₱${balance.toLocaleString()}`, color:"text-red-500",   bg:"bg-red-50   border-red-200"   },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl border p-4 text-center ${s.bg}`}>
            <div className="text-slate-400 text-xs mb-1">{s.label}</div>
            <div className={`text-lg font-extrabold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {fees.map((f, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
            <span className="text-slate-700 text-sm font-medium">{f.label}</span>
            <div className="flex items-center gap-3">
              <span className="text-slate-600 text-sm font-semibold">₱{f.amount.toLocaleString()}</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${f.paid ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                {f.paid ? "Paid" : "Unpaid"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-colors shadow-md shadow-blue-200 text-base">
        Pay Balance
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════
   LIBRARY VIEW — #6 Document request helper
══════════════════════════════════════════ */
function LibraryView({ onBack, onAskJobert }: { onBack: () => void; onAskJobert: (p: string) => void }) {
  const [search, setSearch] = useState("");
  const borrowed = books.filter(b => !b.available);
  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex flex-col gap-5 w-full max-w-2xl mx-auto">
      <BackBtn onClick={onBack} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-slate-800 font-extrabold text-2xl">Library</h2>
          <p className="text-slate-400 text-sm">{books.filter(b=>b.available).length} available · {borrowed.length} borrowed</p>
        </div>
        <button
          onClick={() => onAskJobert("What are the library hours at Benedicto College? How do I borrow and return books? Are there any penalties for late returns?")}
          className="shrink-0 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 text-xs font-semibold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5"
        >
          🤖 Library guide
        </button>
      </div>
      {borrowed.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <div className="text-yellow-700 font-bold text-sm mb-2">📚 Currently Borrowed</div>
          {borrowed.map((b, i) => (
            <div key={i} className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 border border-yellow-100 mb-2 last:mb-0">
              <span className="text-slate-700 text-sm font-medium">{b.title}</span>
              <span className="text-xs font-semibold text-red-500 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full">Due {b.due}</span>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2.5 shadow-sm">
        <span className="text-slate-400">🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search books..."
          className="flex-1 text-sm text-slate-600 placeholder-slate-300 bg-transparent focus:outline-none" />
      </div>
      <div className="flex flex-col gap-3">
        {filtered.map((b, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4 hover:border-blue-200 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl shrink-0">📖</div>
            <div className="flex-1 min-w-0">
              <div className="text-slate-700 font-bold text-sm truncate">{b.title}</div>
              <div className="text-slate-400 text-xs">{b.author} · {b.category}</div>
            </div>
            {b.available
              ? <button className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors">Borrow</button>
              : <span className="shrink-0 text-xs font-semibold text-red-500 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full">Due {b.due}</span>
            }
          </div>
        ))}
      </div>

      {/* #6 — Document request helper */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <div className="text-slate-700 font-bold text-sm mb-3">📄 Need a Document?</div>
        <p className="text-slate-500 text-xs mb-3">Not sure which document to request? Ask JOBERT to guide you.</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label:"Transcript of Records", prompt:"How do I request a Transcript of Records (TOR) at Benedicto College? What are the steps, requirements, fees, and processing time?" },
            { label:"Certificate of Enrollment", prompt:"How do I get a Certificate of Enrollment at Benedicto College? What do I need to bring and how long does it take?" },
            { label:"Good Moral Certificate", prompt:"How do I request a Good Moral Certificate at Benedicto College? What are the requirements and processing time?" },
            { label:"Other Documents", prompt:"What documents can I request from the Registrar's Office at Benedicto College? I need help figuring out which one I need." },
          ].map(d => (
            <button key={d.label} onClick={() => onAskJobert(d.prompt)}
              className="bg-white border border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 text-xs font-semibold px-3 py-2.5 rounded-xl transition-all text-left flex items-center gap-2">
              🤖 {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   TILE ICONS
══════════════════════════════════════════ */
function IconGrades()   { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-12 h-12"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>; }
function IconSchedule() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-12 h-12"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>; }
function IconTuition()  { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-12 h-12"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><circle cx="12" cy="15" r="2"/></svg>; }
function IconLibrary()  { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-12 h-12"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>; }

/* ══════════════════════════════════════════
   EVENT SLIDESHOW
══════════════════════════════════════════ */
const events = [
  { title:"Now Accepting Enrollment", date:"S.Y. 2026 - 2027", desc:"Guaranteed No Tuition Fee for incoming Grade 11 students from public schools", bg:"from-orange-600 to-blue-800", emoji:"📋", img:"/event1.jpg" },
  { title:"BC Cheetahs — MLBB",       date:"February 21-22, 2026", desc:"Catch the games live at SM Seaside City Cebu Cube Wing Atrium!", bg:"from-blue-700 to-orange-600", emoji:"🎮", img:"/event2.jpg" },
  { title:"BC Cheetahs — MLBB S4",    date:"CESA Esports League Season 4", desc:"Shunix · Chas · Super K · Hurr Durr · 2EzyFor23 · Hades · Nicxy · Shion · Pewww", bg:"from-blue-800 to-yellow-600", emoji:"🏆", img:"/event3.jpg" },
  { title:"BC Valorant Team",          date:"CESA Esports League", desc:"Pintsu · PitchBlack · Ekhyle626 · Ichanze · Mokken · Papins", bg:"from-red-700 to-blue-800", emoji:"🎯", img:"/event4.jpg" },
  { title:"Sports Festival 2026",      date:"June 5, 2026", desc:"Compete in track, basketball, volleyball and more", bg:"from-green-500 to-teal-600", emoji:"🏆", img:"https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80" },
  { title:"Graduation Ceremony 2026",  date:"June 28, 2026", desc:"Celebrate the Class of 2026 at the Main Auditorium", bg:"from-blue-500 to-indigo-700", emoji:"🎓", img:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80" },
];

function EventSlideshow() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCurrent(p => (p+1) % events.length), 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="w-full relative" style={{ height:"280px" }}>
      {events.map((e, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i===current ? 1 : 0 }}>
          <img src={e.img} alt={e.title} className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-br ${e.bg} opacity-75`} />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            <span className="text-5xl mb-3 drop-shadow-lg">{e.emoji}</span>
            <div className="text-white font-extrabold text-2xl drop-shadow-md leading-tight">{e.title}</div>
            <div className="text-white/90 text-sm mt-1.5 font-semibold">{e.date}</div>
            <div className="text-white/75 text-sm mt-1 max-w-sm">{e.desc}</div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {events.map((_,i) => <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all duration-300 ${i===current ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}/>)}
      </div>
      <button onClick={() => setCurrent(p => (p-1+events.length)%events.length)} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center text-sm transition-all">&#8249;</button>
      <button onClick={() => setCurrent(p => (p+1)%events.length)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center text-sm transition-all">&#8250;</button>
    </div>
  );
}

/* ══════════════════════════════════════════
   #5 ENROLLMENT ASSISTANT — step-by-step
══════════════════════════════════════════ */
function EnrollmentAssistant({ onAskJobert }: { onAskJobert: (p: string) => void }) {
  const steps = [
    { step:1, title:"Check Pre-requisites",   desc:"Make sure you have passed all required subjects for the next semester.", prompt:"What are the pre-requisites I need to check before enrolling at Benedicto College?" },
    { step:2, title:"Visit the Registrar",    desc:"Go to the Registrar's Office (Admin Bldg, Room 101) during office hours.", prompt:"What are the Registrar's Office hours at Benedicto College and what do I need to bring for enrollment?" },
    { step:3, title:"Submit Enrollment Form", desc:"Fill out and submit your enrollment form with your chosen subjects.", prompt:"How do I fill out the enrollment form at Benedicto College? What subjects should I choose?" },
    { step:4, title:"Pay Tuition Fees",       desc:"Proceed to the Cashier's Office to pay your fees.", prompt:"How do I pay my tuition fees during enrollment at Benedicto College? What payment methods are accepted?" },
    { step:5, title:"Get Your Schedule",      desc:"Receive your official class schedule and student ID.", prompt:"After enrolling at Benedicto College, how do I get my official class schedule and student ID?" },
  ];
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-slate-700 font-bold text-sm">🎓 Enrollment Assistant</div>
          <div className="text-slate-400 text-xs mt-0.5">Deadline: June 15, 2026</div>
        </div>
        <button onClick={() => onAskJobert("Walk me through the complete enrollment process at Benedicto College step by step.")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5">
          🤖 Full guide
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {steps.map(s => (
          <button key={s.step} onClick={() => onAskJobert(s.prompt)}
            className="bg-white border border-blue-100 hover:border-blue-300 rounded-xl px-4 py-3 text-left flex items-center gap-3 transition-all hover:bg-blue-50 group">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">{s.step}</div>
            <div className="flex-1 min-w-0">
              <div className="text-slate-700 text-xs font-semibold">{s.title}</div>
              <div className="text-slate-400 text-xs truncate">{s.desc}</div>
            </div>
            <span className="text-blue-400 group-hover:text-blue-600 text-xs transition-colors shrink-0">Ask 🤖</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   KIOSK HOME
══════════════════════════════════════════ */
function KioskHome({ setPanel, onAskJobert }: { setPanel: (p: Panel) => void; onAskJobert: (p: string) => void }) {
  const tiles: { id: Panel; label: string; Icon: () => React.ReactElement }[] = [
    { id:"grades",   label:"View Grades",   Icon: IconGrades   },
    { id:"schedule", label:"View Schedule", Icon: IconSchedule },
    { id:"tuition",  label:"Tuition Fee",   Icon: IconTuition  },
    { id:"library",  label:"Library",       Icon: IconLibrary  },
  ];
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-blue-100 border border-slate-100">
      <div className="w-full" style={{ height:"280px" }}><EventSlideshow /></div>
      <div className="w-full bg-white px-8 pt-7 pb-3">
        <p className="text-center text-slate-800 font-extrabold text-2xl">Welcome, Jamie Santos</p>
        <p className="text-center text-slate-400 text-sm mt-1">STU-2024-00123 · BSCS Year 2</p>
      </div>
      <div className="w-full bg-white px-8 pb-8 pt-5 grid grid-cols-2 gap-5">
        {tiles.map(tile => (
          <button key={tile.id} onClick={() => setPanel(tile.id)}
            className="flex flex-col items-center justify-center gap-4 rounded-2xl py-10 px-4 text-white transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
            style={{ background:"linear-gradient(145deg,#1e3a6e,#1a3260)", boxShadow:"0 6px 24px rgba(30,58,110,0.4)" }}>
            <div className="opacity-90 w-12 h-12 flex items-center justify-center"><tile.Icon /></div>
            <span className="text-base font-bold tracking-wide">{tile.label}</span>
          </button>
        ))}
      </div>
      {/* #5 enrollment assistant on home */}
      <div className="w-full bg-white px-8 pb-6">
        <EnrollmentAssistant onAskJobert={onAskJobert} />
      </div>
      <div className="w-full bg-white border-t border-slate-100 px-8 py-5 flex flex-col items-center gap-2">
        <div className="text-4xl">🎓</div>
        <p className="text-slate-400 text-xs text-center">&copy; 2026 Benedicto College. All rights reserved.</p>
        <Link href="/" className="text-slate-300 hover:text-slate-500 text-xs transition-colors">&larr; Back to Kiosk</Link>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function DashboardPage() {
  const [panel, setPanel]           = useState<Panel>("home");
  const [jobertPrompt, setJobertPrompt] = useState<string | undefined>(undefined);

  function askJobert(prompt: string) {
    setJobertPrompt(undefined);
    setTimeout(() => setJobertPrompt(prompt), 50);
  }

  return (
    <div className="min-h-screen kiosk-bg flex flex-col items-center justify-start py-8 px-4" suppressHydrationWarning>
      {panel === "home"     && <KioskHome setPanel={setPanel} onAskJobert={askJobert} />}
      {panel === "grades"   && <div className="w-full max-w-2xl"><GradesView   onBack={() => setPanel("home")} onAskJobert={askJobert} /></div>}
      {panel === "schedule" && <div className="w-full max-w-2xl"><ScheduleView onBack={() => setPanel("home")} onAskJobert={askJobert} /></div>}
      {panel === "tuition"  && <div className="w-full max-w-2xl"><TuitionView  onBack={() => setPanel("home")} onAskJobert={askJobert} /></div>}
      {panel === "library"  && <div className="w-full max-w-2xl"><LibraryView  onBack={() => setPanel("home")} onAskJobert={askJobert} /></div>}

      {/* #1 — JOBERT floating on every panel */}
      <JobertChat initialPrompt={jobertPrompt} />
    </div>
  );
}
