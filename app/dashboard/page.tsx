"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   DARK MODE CONTEXT
───────────────────────────────────────────── */
const DarkCtx = createContext(false);
const useDark = () => useContext(DarkCtx);

/* helper — returns light or dark class based on context */
function cx(light: string, dark: string, isDark: boolean) {
  return isDark ? dark : light;
}

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
type NavId =
  | "overview"
  | "grades"
  | "schedule"
  | "notes"
  | "study-load";

interface Subject {
  id: number;
  name: string;
  icon: string;
  color: string;
  grade: string;
  gradeNum: number;
  trend: "up" | "down" | "stable";
  progress: number;
  teacher: string;
  nextDeadline: string;
  assignments: Assignment[];
}

interface Assignment {
  title: string;
  score: number;
  total: number;
  date: string;
  type: string;
}

interface Task {
  id: number;
  title: string;
  subject: string;
  due: string;
  urgent: boolean;
  done: boolean;
}

interface StudyLoad {
  id: number;
  subject: string;
  icon: string;
  color: string;
  units: number;
  type: "Core" | "Applied" | "Elective" | "Work Immersion";
  schedule: string;
  teacher: string;
  status: "In Progress" | "Completed" | "Upcoming";
}

/* ─────────────────────────────────────────────
   PHILIPPINE GRADING SYSTEM HELPERS
   DepEd / CHED scale: 1.00 (highest) → 5.00 (failed)
───────────────────────────────────────────── */
function toPhilGrade(pct: number): string {
  if (pct >= 99) return "1.00";
  if (pct >= 96) return "1.25";
  if (pct >= 93) return "1.50";
  if (pct >= 90) return "1.75";
  if (pct >= 87) return "2.00";
  if (pct >= 84) return "2.25";
  if (pct >= 81) return "2.50";
  if (pct >= 78) return "2.75";
  if (pct >= 75) return "3.00";
  return "5.00";
}

function philGradeLabel(pct: number): string {
  if (pct >= 90) return "Excellent";
  if (pct >= 85) return "Very Good";
  if (pct >= 80) return "Good";
  if (pct >= 75) return "Passing";
  return "Failed";
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const subjects: Subject[] = [
  {
    id: 1,
    name: "Oral Communication",
    icon: "�️",
    color: "from-indigo-500 to-blue-600",
    grade: "1.75",
    gradeNum: 90,
    trend: "up",
    progress: 88,
    teacher: "Ms. Santos",
    nextDeadline: "Recitation — Jun 3",
    assignments: [
      { title: "Persuasive Speech", score: 92, total: 100, date: "May 10", type: "Performance" },
      { title: "Group Discussion", score: 88, total: 100, date: "May 3", type: "Activity" },
      { title: "Long Quiz 2", score: 45, total: 50, date: "Apr 28", type: "Quiz" },
      { title: "Midterm Exam", score: 90, total: 100, date: "Apr 15", type: "Exam" },
    ],
  },
  {
    id: 2,
    name: "Komunikasyon at Pananaliksik",
    icon: "📜",
    color: "from-purple-500 to-violet-600",
    grade: "2.00",
    gradeNum: 87,
    trend: "stable",
    progress: 75,
    teacher: "Gng. Reyes",
    nextDeadline: "Sanaysay — May 28",
    assignments: [
      { title: "Pananaliksik Paper", score: 85, total: 100, date: "May 12", type: "Output" },
      { title: "Talumpati", score: 90, total: 100, date: "May 5", type: "Performance" },
      { title: "Long Quiz 1", score: 42, total: 50, date: "Apr 20", type: "Quiz" },
      { title: "Midterm Exam", score: 86, total: 100, date: "Apr 10", type: "Exam" },
    ],
  },
  {
    id: 3,
    name: "General Mathematics",
    icon: "�",
    color: "from-pink-500 to-rose-500",
    grade: "1.50",
    gradeNum: 93,
    trend: "up",
    progress: 90,
    teacher: "Mr. Dela Cruz",
    nextDeadline: "Problem Set — May 24",
    assignments: [
      { title: "Functions & Relations", score: 94, total: 100, date: "May 14", type: "Test" },
      { title: "Business Math Quiz", score: 96, total: 100, date: "May 6", type: "Quiz" },
      { title: "Seatwork 5", score: 48, total: 50, date: "Apr 25", type: "Seatwork" },
      { title: "Midterm Exam", score: 92, total: 100, date: "Apr 12", type: "Exam" },
    ],
  },
  {
    id: 4,
    name: "Earth & Life Science",
    icon: "🌍",
    color: "from-cyan-500 to-teal-500",
    grade: "2.25",
    gradeNum: 84,
    trend: "down",
    progress: 60,
    teacher: "Ms. Villanueva",
    nextDeadline: "Lab Report — Jun 1",
    assignments: [
      { title: "Ecosystem Lab", score: 82, total: 100, date: "May 11", type: "Lab" },
      { title: "Plate Tectonics Quiz", score: 86, total: 100, date: "May 2", type: "Quiz" },
      { title: "Long Test 2", score: 80, total: 100, date: "Apr 22", type: "Test" },
      { title: "Midterm Exam", score: 84, total: 100, date: "Apr 8", type: "Exam" },
    ],
  },
  {
    id: 5,
    name: "Personal Development",
    icon: "🧠",
    color: "from-amber-500 to-orange-500",
    grade: "1.75",
    gradeNum: 90,
    trend: "up",
    progress: 85,
    teacher: "Ms. Abella",
    nextDeadline: "Reflection Paper — Jun 7",
    assignments: [
      { title: "Self-Concept Essay", score: 92, total: 100, date: "May 9", type: "Essay" },
      { title: "Values Clarification", score: 88, total: 100, date: "May 1", type: "Activity" },
      { title: "Long Quiz 3", score: 44, total: 50, date: "Apr 18", type: "Quiz" },
      { title: "Midterm Exam", score: 90, total: 100, date: "Apr 5", type: "Exam" },
    ],
  },
  {
    id: 6,
    name: "Understanding Culture, Society & Politics",
    icon: "🏛️",
    color: "from-green-500 to-emerald-500",
    grade: "2.00",
    gradeNum: 87,
    trend: "up",
    progress: 78,
    teacher: "Mr. Fernandez",
    nextDeadline: "Research Paper — Jun 10",
    assignments: [
      { title: "Socialization Report", score: 88, total: 100, date: "May 13", type: "Report" },
      { title: "Culture Quiz", score: 90, total: 100, date: "May 4", type: "Quiz" },
      { title: "Group Project", score: 85, total: 100, date: "Apr 24", type: "Project" },
      { title: "Midterm Exam", score: 86, total: 100, date: "Apr 11", type: "Exam" },
    ],
  },
  {
    id: 7,
    name: "Physical Education & Health",
    icon: "🏃",
    color: "from-rose-500 to-red-500",
    grade: "1.25",
    gradeNum: 96,
    trend: "up",
    progress: 95,
    teacher: "Coach Bautista",
    nextDeadline: "Fitness Test — Jun 5",
    assignments: [
      { title: "Fitness Assessment", score: 96, total: 100, date: "May 15", type: "Performance" },
      { title: "Health Quiz 2", score: 98, total: 100, date: "May 7", type: "Quiz" },
      { title: "Dance Routine", score: 95, total: 100, date: "Apr 26", type: "Performance" },
      { title: "Midterm Exam", score: 94, total: 100, date: "Apr 13", type: "Exam" },
    ],
  },
  {
    id: 8,
    name: "Empowerment Technologies",
    icon: "💻",
    color: "from-violet-500 to-purple-600",
    grade: "1.50",
    gradeNum: 93,
    trend: "up",
    progress: 88,
    teacher: "Mr. Uy",
    nextDeadline: "ICT Project — Jun 12",
    assignments: [
      { title: "Web Design Output", score: 95, total: 100, date: "May 16", type: "Project" },
      { title: "Spreadsheet Quiz", score: 92, total: 100, date: "May 8", type: "Quiz" },
      { title: "Digital Literacy Test", score: 90, total: 100, date: "Apr 27", type: "Test" },
      { title: "Midterm Exam", score: 94, total: 100, date: "Apr 14", type: "Exam" },
    ],
  },
];

const initialTasks: Task[] = [
  { id: 1, title: "Reflection Paper — Personal Dev.", subject: "Personal Development", due: "Today", urgent: true, done: false },
  { id: 2, title: "Sanaysay — Komunikasyon", subject: "Komunikasyon", due: "May 28", urgent: true, done: false },
  { id: 3, title: "Lab Report — Earth & Life Sci.", subject: "Earth & Life Science", due: "Jun 1", urgent: false, done: false },
  { id: 4, title: "Problem Set — Gen. Math", subject: "General Mathematics", due: "May 24", urgent: true, done: false },
  { id: 5, title: "Research Paper — UCSP", subject: "UCSP", due: "Jun 10", urgent: false, done: false },
  { id: 6, title: "ICT Project — Emp. Tech.", subject: "Empowerment Technologies", due: "Jun 12", urgent: false, done: false },
];

const studyLoadData: StudyLoad[] = [
  { id: 1, subject: "Oral Communication", icon: "🗣️", color: "from-indigo-500 to-blue-600", units: 2, type: "Core", schedule: "MWF 7:30–8:30", teacher: "Ms. Santos", status: "In Progress" },
  { id: 2, subject: "Komunikasyon at Pananaliksik", icon: "📜", color: "from-purple-500 to-violet-600", units: 2, type: "Core", schedule: "TTh 7:30–9:00", teacher: "Gng. Reyes", status: "In Progress" },
  { id: 3, subject: "General Mathematics", icon: "📐", color: "from-pink-500 to-rose-500", units: 3, type: "Core", schedule: "MWF 8:30–9:30", teacher: "Mr. Dela Cruz", status: "In Progress" },
  { id: 4, subject: "Earth & Life Science", icon: "🌍", color: "from-cyan-500 to-teal-500", units: 3, type: "Core", schedule: "TTh 9:00–10:30", teacher: "Ms. Villanueva", status: "In Progress" },
  { id: 5, subject: "Personal Development", icon: "🧠", color: "from-amber-500 to-orange-500", units: 1, type: "Core", schedule: "MWF 9:30–10:30", teacher: "Ms. Abella", status: "In Progress" },
  { id: 6, subject: "Understanding Culture, Society & Politics", icon: "🏛️", color: "from-green-500 to-emerald-500", units: 3, type: "Core", schedule: "TTh 10:30–12:00", teacher: "Mr. Fernandez", status: "In Progress" },
  { id: 7, subject: "Physical Education & Health", icon: "🏃", color: "from-rose-500 to-red-500", units: 2, type: "Applied", schedule: "MWF 10:30–11:30", teacher: "Coach Bautista", status: "In Progress" },
  { id: 8, subject: "Empowerment Technologies", icon: "�", color: "from-violet-500 to-purple-600", units: 2, type: "Applied", schedule: "TTh 1:00–2:30", teacher: "Mr. Uy", status: "In Progress" },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const studyHours = [2.5, 4, 3, 5, 4.5, 6, 2];

type ChatRole = "ai" | "user";
interface ChatMessage { role: ChatRole; text: string; }

const aiMessages: ChatMessage[] = [
  { role: "ai", text: "Hi Jamie! I'm your AI Tutor. Ask me anything about your subjects — I can explain concepts, quiz you, or help you prep for exams. 🎓" },
];

const gradeColor = (g: number) => {
  if (g >= 90) return "text-green-400";
  if (g >= 85) return "text-indigo-400";
  if (g >= 80) return "text-cyan-400";
  if (g >= 75) return "text-yellow-400";
  return "text-red-400";
};

const gradeBg = (g: number) => {
  if (g >= 90) return "bg-green-500/20 border-green-500/30";
  if (g >= 85) return "bg-indigo-500/20 border-indigo-500/30";
  if (g >= 80) return "bg-cyan-500/20 border-cyan-500/30";
  if (g >= 75) return "bg-yellow-500/20 border-yellow-500/30";
  return "bg-red-500/20 border-red-500/30";
};

/* ─────────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────────── */
function Sidebar({
  active,
  setActive,
  mobileOpen,
  setMobileOpen,
}: {
  active: NavId;
  setActive: (s: NavId) => void;
  mobileOpen: boolean;
  setMobileOpen: (b: boolean) => void;
}) {
  const dark = useDark();
  const navItems: { id: NavId; label: string; icon: string }[] = [
    { id: "overview", label: "Dashboard", icon: "🏠" },
    { id: "grades", label: "Student Grades", icon: "📊" },
    { id: "schedule", label: "Class Schedule", icon: "📅" },
    { id: "notes", label: "Announcements", icon: "📝" },
    { id: "study-load", label: "Study Load", icon: "📋" },
  ];

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-40 flex flex-col transition-all duration-300 shadow-lg border-r
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto lg:shadow-none
          ${dark ? "bg-[#0f0c29] border-white/10" : "bg-white border-slate-200"}`}
      >
        {/* Logo */}
        <div className={`flex items-center gap-2 px-5 py-5 border-b ${dark ? "border-white/10" : "border-slate-100"}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            IN
          </div>
          <span className={`font-bold text-xl tracking-tight ${dark ? "text-white" : "text-slate-800"}`}>INFORM</span>
          <button
            className={`ml-auto lg:hidden ${dark ? "text-white/40 hover:text-white" : "text-slate-400 hover:text-slate-700"}`}
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Admin badge */}
        <div className={`mx-3 mt-3 mb-1 px-3 py-2 rounded-xl flex items-center gap-2 border
          ${dark ? "bg-indigo-900/40 border-indigo-500/30" : "bg-indigo-50 border-indigo-100"}`}>
          <span className="text-base">🛡️</span>
          <div>
            <div className={`text-xs font-bold ${dark ? "text-indigo-300" : "text-indigo-700"}`}>Administrator</div>
            <div className={`text-xs ${dark ? "text-indigo-400/70" : "text-indigo-400"}`}>Senior High School</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setMobileOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left
                ${active === item.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : dark
                    ? "text-white/50 hover:text-white hover:bg-white/5"
                    : "text-slate-600 hover:text-indigo-700 hover:bg-indigo-50"}`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Admin user card */}
        <div className={`px-3 py-4 border-t ${dark ? "border-white/10" : "border-slate-100"}`}>
          <div className={`flex items-center gap-3 rounded-xl px-3 py-3 border
            ${dark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"}`}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-xs font-semibold truncate ${dark ? "text-white" : "text-slate-800"}`}>Admin User</div>
              <div className={`text-xs truncate ${dark ? "text-white/40" : "text-slate-400"}`}>SHS Administrator</div>
            </div>
            <Link href="/" className={`text-xs transition-colors ${dark ? "text-white/30 hover:text-white/70" : "text-slate-400 hover:text-indigo-600"}`} title="Back to home">
              ↩
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ─────────────────────────────────────────────
   OVERVIEW PANEL
───────────────────────────────────────────── */
function OverviewPanel({ tasks, setTasks }: { tasks: Task[]; setTasks: (t: Task[]) => void }) {
  const dark = useDark();
  const maxHours = Math.max(...studyHours);
  const avgPct = Math.round(subjects.reduce((a, s) => a + s.gradeNum, 0) / subjects.length);
  const avgPhil = toPhilGrade(avgPct);

  const toggleTask = (id: number) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const card = dark
    ? "bg-[#1a1740] border-white/10 hover:border-indigo-500/40"
    : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md shadow-sm";
  const cardText = dark ? "text-white/50" : "text-slate-500";
  const cardVal = dark ? "" : "";
  const heading = dark ? "text-white" : "text-slate-800";
  const sub = dark ? "text-white/30" : "text-slate-400";

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-indigo-200">
        <div>
          <h2 className="text-white font-extrabold text-xl sm:text-2xl">Good morning, Admin 👋</h2>
          <p className="text-white/80 text-sm mt-1">
            There are{" "}
            <span className="text-white font-semibold">
              {tasks.filter((t) => !t.done && t.urgent).length} urgent submissions
            </span>{" "}
            pending review today.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white/20 border border-white/30 rounded-xl px-4 py-3 shrink-0">
          <span className="text-2xl">🎓</span>
          <div>
            <div className="text-white font-extrabold text-xl leading-none">{subjects.length}</div>
            <div className="text-white/80 text-xs">Active Subjects</div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Class GWA", value: avgPhil, icon: "📈", sub: `${avgPct}% · ${philGradeLabel(avgPct)}`, color: gradeColor(avgPct) },
          { label: "Study Hours", value: "27h", icon: "⏱️", sub: "This week avg.", color: dark ? "text-indigo-400" : "text-indigo-600" },
          { label: "Tasks Pending", value: `${tasks.filter((t) => !t.done).length}/${tasks.length}`, icon: "📋", sub: "Submissions", color: dark ? "text-purple-400" : "text-purple-600" },
          { label: "Enrolled", value: `${subjects.length}`, icon: "📁", sub: "Subjects this sem.", color: dark ? "text-cyan-400" : "text-cyan-600" },
        ].map((s) => (
          <div key={s.label} className={`border rounded-2xl p-4 transition-all ${card}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-medium ${cardText}`}>{s.label}</span>
              <span className="text-xl">{s.icon}</span>
            </div>
            <div className={`font-extrabold text-2xl ${s.color}`}>{s.value}</div>
            <div className={`text-xs mt-1 ${sub}`}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Chart + Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly study chart */}
        <div className={`border rounded-2xl p-5 ${card}`}>
          <h3 className={`font-bold text-sm mb-4 ${heading}`}>Weekly Study Hours</h3>
          <div className="flex items-end gap-2 h-28">
            {studyHours.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className={`text-xs ${sub}`}>{h}h</span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-purple-400"
                  style={{ height: `${(h / maxHours) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {weekDays.map((d) => (
              <span key={d} className={`flex-1 text-center text-xs ${sub}`}>{d}</span>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className={`border rounded-2xl p-5 ${card}`}>
          <h3 className={`font-bold text-sm mb-4 ${heading}`}>Pending Submissions</h3>
          <div className="flex flex-col gap-2">
            {tasks.slice(0, 5).map((t) => (
              <div
                key={t.id}
                onClick={() => toggleTask(t.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-colors cursor-pointer
                  ${dark
                    ? "bg-white/5 hover:bg-white/10 border-white/5"
                    : "bg-slate-50 hover:bg-indigo-50 border-slate-100 hover:border-indigo-200"}`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                  ${t.done ? "bg-green-500 border-green-500" : t.urgent ? "border-red-400" : dark ? "border-white/30" : "border-slate-300"}`}>
                  {t.done && <span className="text-white text-xs">✓</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-semibold truncate ${t.done ? (dark ? "line-through text-white/30" : "line-through text-slate-400") : dark ? "text-white/80" : "text-slate-700"}`}>{t.title}</div>
                  <div className={`text-xs ${sub}`}>{t.subject}</div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 border
                  ${t.urgent && !t.done
                    ? "bg-red-50 text-red-500 border-red-200"
                    : dark ? "bg-white/5 text-white/40 border-white/10" : "bg-slate-100 text-slate-400 border-slate-200"}`}>
                  {t.due}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grade snapshot */}
      <div className={`border rounded-2xl p-5 ${card}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-bold text-sm ${heading}`}>Grade Snapshot — All Subjects</h3>
          <span className={`text-xs ${sub}`}>Current semester</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {subjects.map((s) => (
            <div key={s.id} className={`flex flex-col items-center gap-2 rounded-xl p-3 transition-colors border
              ${dark ? "bg-white/5 border-white/5 hover:bg-white/10" : "bg-slate-50 border-slate-100 hover:bg-indigo-50 hover:border-indigo-200"}`}>
              <span className="text-2xl">{s.icon}</span>
              <div className={`text-lg font-extrabold ${gradeColor(s.gradeNum)}`}>{s.grade}</div>
              <div className={`text-xs text-center leading-tight ${sub}`}>{s.name.split(" ")[0]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   GRADES PANEL
───────────────────────────────────────────── */
function GradesPanel() {
  const dark = useDark();
  const [selected, setSelected] = useState<Subject | null>(null);

  const avgPct = Math.round(subjects.reduce((a, s) => a + s.gradeNum, 0) / subjects.length);
  const avgPhil = toPhilGrade(avgPct);

  const card = dark ? "bg-[#1a1740] border-white/10" : "bg-white border-slate-200 shadow-sm";
  const heading = dark ? "text-white" : "text-slate-800";
  const sub = dark ? "text-white/40" : "text-slate-400";
  const row = dark ? "border-white/5 hover:bg-white/5" : "border-slate-100 hover:bg-slate-50";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className={`font-extrabold text-xl ${heading}`}>Student Grades</h2>
          <p className={`text-sm mt-0.5 ${sub}`}>1st Semester · Grade 11 — Senior High School</p>
        </div>
        <div className={`flex items-center gap-3 rounded-xl px-4 py-2.5 border
          ${dark ? "bg-indigo-900/30 border-indigo-500/30" : "bg-indigo-50 border-indigo-200"}`}>
          <div className="text-right">
            <div className={`text-xs ${sub}`}>General Weighted Average</div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-extrabold ${gradeColor(avgPct)}`}>{avgPhil}</span>
              <span className={`text-xs ${sub}`}>({avgPct}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* PH Grading Scale legend */}
      <div className={`border rounded-2xl p-4 ${card}`}>
        <p className={`text-xs font-semibold mb-3 uppercase tracking-widest ${sub}`}>Philippine Grading Scale (DepEd / CHED)</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 text-center text-xs">
          {[
            { ph: "1.00", pct: "99–100" }, { ph: "1.25", pct: "96–98" }, { ph: "1.50", pct: "93–95" },
            { ph: "1.75", pct: "90–92" }, { ph: "2.00", pct: "87–89" }, { ph: "2.25", pct: "84–86" },
            { ph: "2.50", pct: "81–83" }, { ph: "2.75", pct: "78–80" }, { ph: "3.00", pct: "75–77" },
          ].map((g) => (
            <div key={g.ph} className={`rounded-lg p-2 border ${dark ? "bg-white/5 border-white/5" : "bg-indigo-50 border-indigo-100"}`}>
              <div className={`font-extrabold ${dark ? "text-indigo-300" : "text-indigo-600"}`}>{g.ph}</div>
              <div className={`text-xs ${sub}`}>{g.pct}%</div>
            </div>
          ))}
        </div>
        <p className={`text-xs mt-2 ${sub}`}>Below 75% = 5.00 (Failed)</p>
      </div>

      {/* Subject grade cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelected(selected?.id === s.id ? null : s)}
            className={`text-left border rounded-2xl p-5 transition-all hover:scale-[1.02]
              ${selected?.id === s.id
                ? dark ? "bg-[#1a1740] border-indigo-500/60 shadow-lg shadow-indigo-900/30" : "bg-white border-indigo-400 shadow-md shadow-indigo-100"
                : dark ? "bg-[#1a1740] border-white/10 hover:border-white/20" : "bg-white border-slate-200 hover:border-indigo-300 shadow-sm"}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-xl shrink-0`}>{s.icon}</div>
              <div className="flex-1 min-w-0">
                <div className={`font-bold text-sm truncate ${heading}`}>{s.name}</div>
                <div className={`text-xs ${sub}`}>{s.teacher}</div>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <div className={`text-xl font-extrabold ${gradeColor(s.gradeNum)}`}>{s.grade}</div>
                <div className={`text-xs ${sub}`}>{s.gradeNum}%</div>
              </div>
            </div>
            <div className="mb-3">
              <div className={`h-2 rounded-full overflow-hidden ${dark ? "bg-white/10" : "bg-slate-100"}`}>
                <div className={`h-full bg-gradient-to-r ${s.color} rounded-full transition-all`} style={{ width: `${s.gradeNum}%` }} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-0.5 rounded-full border ${gradeBg(s.gradeNum)} ${gradeColor(s.gradeNum)}`}>{philGradeLabel(s.gradeNum)}</span>
              <span className={`text-xs font-semibold ${s.trend === "up" ? "text-green-500" : s.trend === "down" ? "text-red-500" : sub}`}>
                {s.trend === "up" ? "↑" : s.trend === "down" ? "↓" : "→"} {s.trend}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Assignment breakdown */}
      {selected && (
        <div className={`border rounded-2xl p-5 ${dark ? "bg-[#1a1740] border-indigo-500/30" : "bg-white border-indigo-200 shadow-sm"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selected.color} flex items-center justify-center text-xl`}>{selected.icon}</div>
            <div>
              <h3 className={`font-bold ${heading}`}>{selected.name}</h3>
              <p className={`text-xs ${sub}`}>📌 Next: {selected.nextDeadline}</p>
            </div>
            <button onClick={() => setSelected(null)} className={`ml-auto text-lg ${dark ? "text-white/30 hover:text-white" : "text-slate-400 hover:text-slate-700"}`}>✕</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`border-b ${dark ? "border-white/10" : "border-slate-200"}`}>
                  {["Activity / Assessment", "Type", "Date", "Score", "PH Grade"].map((h, i) => (
                    <th key={h} className={`text-xs font-medium pb-3 ${i < 3 ? "text-left pr-4" : i === 3 ? "text-right pr-4" : "text-right"} ${sub}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selected.assignments.map((a, i) => {
                  const pct = Math.round((a.score / a.total) * 100);
                  return (
                    <tr key={i} className={`border-b transition-colors ${row}`}>
                      <td className={`text-xs py-3 pr-4 font-medium ${dark ? "text-white/80" : "text-slate-700"}`}>{a.title}</td>
                      <td className="py-3 pr-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${dark ? "bg-white/10 text-white/50" : "bg-slate-100 text-slate-500"}`}>{a.type}</span>
                      </td>
                      <td className={`text-xs py-3 pr-4 ${sub}`}>{a.date}</td>
                      <td className="text-right py-3 pr-4">
                        <span className={`text-xs font-bold ${gradeColor(pct)}`}>{a.score}/{a.total}</span>
                        <span className={`text-xs ml-1 ${sub}`}>({pct}%)</span>
                      </td>
                      <td className={`text-right py-3 text-xs font-extrabold ${gradeColor(pct)}`}>{toPhilGrade(pct)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCHEDULE PANEL
───────────────────────────────────────────── */
const timetable: Record<string, { time: string; subject: string; icon: string; color: string; room: string }[]> = {
  Monday: [
    { time: "07:30", subject: "Oral Communication", icon: "�️", color: "from-indigo-500 to-blue-600", room: "Room 201" },
    { time: "08:30", subject: "General Mathematics", icon: "�", color: "from-pink-500 to-rose-500", room: "Room 305" },
    { time: "09:30", subject: "Personal Development", icon: "🧠", color: "from-amber-500 to-orange-500", room: "Room 108" },
    { time: "10:30", subject: "Physical Education & Health", icon: "🏃", color: "from-rose-500 to-red-500", room: "Gym" },
  ],
  Tuesday: [
    { time: "07:30", subject: "Komunikasyon at Pananaliksik", icon: "📜", color: "from-purple-500 to-violet-600", room: "Room 202" },
    { time: "09:00", subject: "Earth & Life Science", icon: "🌍", color: "from-cyan-500 to-teal-500", room: "Sci. Lab" },
    { time: "10:30", subject: "Understanding Culture, Society & Politics", icon: "🏛️", color: "from-green-500 to-emerald-500", room: "Room 310" },
    { time: "13:00", subject: "Empowerment Technologies", icon: "💻", color: "from-violet-500 to-purple-600", room: "ICT Lab" },
  ],
  Wednesday: [
    { time: "07:30", subject: "Oral Communication", icon: "�️", color: "from-indigo-500 to-blue-600", room: "Room 201" },
    { time: "08:30", subject: "General Mathematics", icon: "📐", color: "from-pink-500 to-rose-500", room: "Room 305" },
    { time: "09:30", subject: "Personal Development", icon: "🧠", color: "from-amber-500 to-orange-500", room: "Room 108" },
    { time: "10:30", subject: "Physical Education & Health", icon: "🏃", color: "from-rose-500 to-red-500", room: "Gym" },
  ],
  Thursday: [
    { time: "07:30", subject: "Komunikasyon at Pananaliksik", icon: "📜", color: "from-purple-500 to-violet-600", room: "Room 202" },
    { time: "09:00", subject: "Earth & Life Science", icon: "🌍", color: "from-cyan-500 to-teal-500", room: "Sci. Lab" },
    { time: "10:30", subject: "Understanding Culture, Society & Politics", icon: "🏛️", color: "from-green-500 to-emerald-500", room: "Room 310" },
    { time: "13:00", subject: "Empowerment Technologies", icon: "💻", color: "from-violet-500 to-purple-600", room: "ICT Lab" },
  ],
  Friday: [
    { time: "07:30", subject: "Oral Communication", icon: "�️", color: "from-indigo-500 to-blue-600", room: "Room 201" },
    { time: "08:30", subject: "General Mathematics", icon: "�", color: "from-pink-500 to-rose-500", room: "Room 305" },
    { time: "09:30", subject: "Earth & Life Science", icon: "🌍", color: "from-cyan-500 to-teal-500", room: "Sci. Lab" },
    { time: "10:30", subject: "Empowerment Technologies", icon: "💻", color: "from-violet-500 to-purple-600", room: "ICT Lab" },
  ],
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function SchedulePanel() {
  const dark = useDark();
  const [activeDay, setActiveDay] = useState("Monday");
  const card = dark ? "bg-[#1a1740] border-white/10" : "bg-white border-slate-200 shadow-sm";
  const heading = dark ? "text-white" : "text-slate-800";
  const sub = dark ? "text-white/40" : "text-slate-400";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className={`font-extrabold text-xl ${heading}`}>Class Schedule</h2>
        <p className={`text-sm mt-0.5 ${sub}`}>1st Semester · Grade 11 — Senior High School</p>
      </div>

      {/* Day tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setActiveDay(d)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all
              ${activeDay === d
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                : dark
                  ? "bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/10"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300"}`}
          >
            {d.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Classes */}
      <div className="flex flex-col gap-3">
        {timetable[activeDay].map((cls, i) => (
          <div key={i} className={`flex items-center gap-4 border rounded-2xl p-4 transition-all hover:border-indigo-300 ${card}`}>
            <div className={`text-sm font-mono w-12 shrink-0 ${sub}`}>{cls.time}</div>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cls.color} flex items-center justify-center text-xl shrink-0`}>{cls.icon}</div>
            <div className="flex-1 min-w-0">
              <div className={`font-bold text-sm ${heading}`}>{cls.subject}</div>
              <div className={`text-xs ${sub}`}>{cls.room}</div>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
          </div>
        ))}
      </div>

      {/* Upcoming deadlines */}
      <div className={`border rounded-2xl p-5 ${card}`}>
        <h3 className={`font-bold text-sm mb-4 ${heading}`}>Upcoming Deadlines</h3>
        <div className="flex flex-col gap-3">
          {subjects.map((s) => (
            <div key={s.id} className="flex items-center gap-3">
              <span className="text-lg">{s.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={`text-xs font-medium truncate ${dark ? "text-white/70" : "text-slate-700"}`}>{s.nextDeadline}</div>
                <div className={`text-xs ${sub}`}>{s.name}</div>
              </div>
              <div className={`h-1.5 w-24 rounded-full overflow-hidden ${dark ? "bg-white/10" : "bg-slate-100"}`}>
                <div className={`h-full bg-gradient-to-r ${s.color} rounded-full`} style={{ width: `${s.progress}%` }} />
              </div>
              <span className={`text-xs w-8 text-right ${sub}`}>{s.progress}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AI TUTOR PANEL
───────────────────────────────────────────── */
function AiTutorPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>(aiMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const dark = useDark();

  const suggestions = [
    "Explain functions in Gen. Math",
    "Help me with my Pananaliksik paper",
    "Quiz me on Earth & Life Science",
    "What is socialization in UCSP?",
  ];

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const replies: Record<string, string> = {
        "Explain functions in Gen. Math": "A function is a relation where every input (x) has exactly one output (y). Written as f(x). Example: f(x) = 2x + 3. If x = 4, then f(4) = 11. Key types: linear, quadratic, rational, and exponential functions. Want practice problems? 📐",
        "Help me with my Pananaliksik paper": "Para sa isang mahusay na pananaliksik: 1) Pumili ng malinaw na paksa, 2) Gumawa ng thesis statement, 3) Mangalap ng datos mula sa mapagkakatiwalaang pinagkukunan, 4) Isulat ang metodolohiya. Anong paksa ang iyong pinili? �",
        "Quiz me on Earth & Life Science": "Here's your question: What layer of the Earth is responsible for the movement of tectonic plates? A) Crust  B) Mantle  C) Inner Core  D) Outer Core. Reply with A, B, C, or D! 🌍",
        "What is socialization in UCSP?": "Socialization is the lifelong process by which individuals learn the norms, values, and behaviors of their society. Primary socialization happens in the family; secondary socialization occurs in schools, peers, and media. It shapes our identity and social roles. 🏛️",
      };
      const reply = replies[text] ?? "That's a great question! I'm processing your query. In a real implementation, I'd connect to an AI model to give you a detailed, personalised answer. Try one of the suggested questions for a demo response! 🧠";
      const aiReply: ChatMessage = { role: "ai", text: reply };
      setMessages((prev) => [...prev, aiReply]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <h2 className={`font-extrabold text-xl ${dark ? "text-white" : "text-slate-800"}`}>AI Assistant</h2>
        <p className={`text-sm mt-0.5 ${dark ? "text-white/40" : "text-slate-500"}`}>Powered by INFORM AI · Available 24/7</p>
      </div>

      {/* Chat window */}
      <div className={`flex-1 border rounded-2xl flex flex-col overflow-hidden ${dark ? "bg-[#1a1740] border-white/10" : "bg-white border-slate-200 shadow-sm"}`} style={{ minHeight: "400px" }}>
        <div className={`flex-1 overflow-y-auto p-4 flex flex-col gap-3 ${dark ? "bg-[#0f0c29]/50" : "bg-slate-50"}`}>
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                ${m.role === "ai" ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white" : "bg-gradient-to-br from-cyan-500 to-blue-500 text-white"}`}>
                {m.role === "ai" ? "AI" : "AD"}
              </div>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed
                ${m.role === "ai"
                  ? dark ? "bg-white/5 text-white/80 rounded-tl-sm border border-white/10" : "bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm"
                  : "bg-indigo-600 text-white rounded-tr-sm"}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">AI</div>
              <div className={`rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center ${dark ? "bg-white/5 border border-white/10" : "bg-white border border-slate-200 shadow-sm"}`}>
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className={`px-4 pb-2 pt-2 flex gap-2 overflow-x-auto border-t ${dark ? "border-white/10 bg-[#1a1740]" : "border-slate-100 bg-white"}`}>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full transition-all border
                ${dark ? "bg-white/5 hover:bg-indigo-600/30 border-white/10 hover:border-indigo-500/40 text-white/60 hover:text-white" : "bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-600"}`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className={`p-4 border-t flex gap-3 ${dark ? "border-white/10 bg-[#1a1740]" : "border-slate-200 bg-white"}`}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask anything about subjects or students..."
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm focus:outline-none border
              ${dark ? "bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-indigo-500/60" : "bg-slate-50 border-slate-200 text-slate-700 placeholder-slate-400 focus:border-indigo-400"}`}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NOTES PANEL
───────────────────────────────────────────── */
interface Note {
  id: number;
  title: string;
  subject: string;
  icon: string;
  color: string;
  preview: string;
  date: string;
  tag: string;
}

const initialNotes: Note[] = [
  { id: 1, title: "Functions & Their Types", subject: "General Mathematics", icon: "📐", color: "from-pink-500 to-rose-500", preview: "Linear: f(x)=mx+b. Quadratic: f(x)=ax²+bx+c. Rational: f(x)=p(x)/q(x). Exponential: f(x)=aˣ...", date: "May 18", tag: "Revision" },
  { id: 2, title: "Plate Tectonics Summary", subject: "Earth & Life Science", icon: "🌍", color: "from-cyan-500 to-teal-500", preview: "Lithospheric plates float on the asthenosphere. Types of boundaries: convergent, divergent, transform...", date: "May 15", tag: "Summary" },
  { id: 3, title: "Persuasive Speech Tips", subject: "Oral Communication", icon: "�️", color: "from-indigo-500 to-blue-600", preview: "Ethos (credibility), Pathos (emotion), Logos (logic). Use clear thesis, strong evidence, call to action...", date: "May 14", tag: "Performance Prep" },
  { id: 4, title: "Socialization & Culture", subject: "Understanding Culture, Society & Politics", icon: "🏛️", color: "from-green-500 to-emerald-500", preview: "Primary socialization: family. Secondary: school, peers, media. Norms, values, folkways, mores, laws...", date: "May 12", tag: "Concepts" },
  { id: 5, title: "Self-Concept & Identity", subject: "Personal Development", icon: "🧠", color: "from-amber-500 to-orange-500", preview: "Self-concept: how we see ourselves. Self-esteem: how we value ourselves. Johari Window model...", date: "May 10", tag: "Reflection" },
  { id: 6, title: "Web Design Basics", subject: "Empowerment Technologies", icon: "💻", color: "from-violet-500 to-purple-600", preview: "HTML structure: head, body. CSS: selectors, properties. Responsive design with media queries...", date: "May 9", tag: "ICT Project" },
];

function NotesPanel() {
  const dark = useDark();
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [search, setSearch] = useState("");
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newSubject, setNewSubject] = useState("General Mathematics");

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.subject.toLowerCase().includes(search.toLowerCase())
  );

  const addNote = () => {
    if (!newTitle.trim()) return;
    const subj = subjects.find((s) => s.name === newSubject) ?? subjects[0];
    const note: Note = {
      id: Date.now(),
      title: newTitle,
      subject: newSubject,
      icon: subj.icon,
      color: subj.color,
      preview: newBody || "No content yet...",
      date: "Today",
      tag: "New",
    };
    setNotes([note, ...notes]);
    setNewTitle("");
    setNewBody("");
    setShowNew(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className={`font-extrabold text-xl ${dark ? "text-white" : "text-slate-800"}`}>Announcements</h2>
          <p className={`text-sm mt-0.5 ${dark ? "text-white/40" : "text-slate-500"}`}>{notes.length} announcements across all subjects</p>
        </div>
        <button
          onClick={() => setShowNew(!showNew)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          + New Note
        </button>
      </div>

      {/* New note form */}
      {showNew && (
        <div className={`border rounded-2xl p-5 flex flex-col gap-3 ${dark ? "bg-[#1a1740] border-indigo-500/30" : "bg-white border-indigo-200 shadow-sm"}`}>
          <input
            type="text"
            placeholder="Announcement title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className={`border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400
              ${dark ? "bg-white/5 border-white/10 text-white placeholder-white/30" : "bg-slate-50 border-slate-200 text-slate-700 placeholder-slate-400"}`}
          />
          <select
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className={`border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400
              ${dark ? "bg-white/5 border-white/10 text-white" : "bg-slate-50 border-slate-200 text-slate-700"}`}
          >
            {subjects.map((s) => <option key={s.id} value={s.name} className={dark ? "bg-[#1a1740]" : ""}>{s.name}</option>)}
          </select>
          <textarea
            placeholder="Write your announcement..."
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            rows={3}
            className={`border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400 resize-none
              ${dark ? "bg-white/5 border-white/10 text-white placeholder-white/30" : "bg-slate-50 border-slate-200 text-slate-700 placeholder-slate-400"}`}
          />
          <div className="flex gap-2">
            <button onClick={addNote} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2 rounded-xl transition-colors">Post Announcement</button>
            <button onClick={() => setShowNew(false)} className={`flex-1 text-sm font-semibold py-2 rounded-xl transition-colors
              ${dark ? "bg-white/5 hover:bg-white/10 text-white/60" : "bg-slate-100 hover:bg-slate-200 text-slate-600"}`}>Cancel</button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className={`flex items-center gap-2 border rounded-xl px-4 py-2.5
        ${dark ? "bg-[#1a1740] border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
        <span className={dark ? "text-white/30" : "text-slate-400"}>🔍</span>
        <input
          type="text"
          placeholder="Search announcements..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`bg-transparent text-sm flex-1 focus:outline-none
            ${dark ? "text-white placeholder-white/30" : "text-slate-700 placeholder-slate-400"}`}
        />
      </div>

      {/* Notes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((n) => (
          <button
            key={n.id}
            onClick={() => setActiveNote(activeNote?.id === n.id ? null : n)}
            className={`text-left border rounded-2xl p-4 transition-all hover:scale-[1.02]
              ${activeNote?.id === n.id
                ? dark ? "bg-[#1a1740] border-indigo-500/60 shadow-lg shadow-indigo-900/20" : "bg-white border-indigo-400 shadow-md shadow-indigo-100"
                : dark ? "bg-[#1a1740] border-white/10 hover:border-white/20" : "bg-white border-slate-200 hover:border-indigo-300 shadow-sm"}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${n.color} flex items-center justify-center text-base shrink-0`}>{n.icon}</div>
              <div className="flex-1 min-w-0">
                <div className={`text-xs font-bold truncate ${dark ? "text-white" : "text-slate-800"}`}>{n.title}</div>
                <div className={`text-xs ${dark ? "text-white/40" : "text-slate-400"}`}>{n.subject}</div>
              </div>
            </div>
            <p className={`text-xs leading-relaxed line-clamp-2 ${dark ? "text-white/50" : "text-slate-500"}`}>{n.preview}</p>
            <div className="flex items-center justify-between mt-3">
              <span className={`text-xs px-2 py-0.5 rounded-full border
                ${dark ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" : "bg-indigo-50 text-indigo-500 border-indigo-100"}`}>{n.tag}</span>
              <span className={`text-xs ${dark ? "text-white/30" : "text-slate-400"}`}>{n.date}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Expanded note */}
      {activeNote && (
        <div className={`border rounded-2xl p-5 ${dark ? "bg-[#1a1740] border-indigo-500/30" : "bg-white border-indigo-200 shadow-sm"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeNote.color} flex items-center justify-center text-xl`}>{activeNote.icon}</div>
            <div className="flex-1">
              <h3 className={`font-bold ${dark ? "text-white" : "text-slate-800"}`}>{activeNote.title}</h3>
              <p className={`text-xs ${dark ? "text-white/40" : "text-slate-400"}`}>{activeNote.subject} · {activeNote.date}</p>
            </div>
            <button onClick={() => setActiveNote(null)} className={`text-lg ${dark ? "text-white/30 hover:text-white" : "text-slate-400 hover:text-slate-700"}`}>✕</button>
          </div>
          <p className={`text-sm leading-relaxed ${dark ? "text-white/60" : "text-slate-600"}`}>{activeNote.preview}</p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   STUDY LOAD PANEL
───────────────────────────────────────────── */
function StudyLoadPanel() {
  const dark = useDark();
  const totalUnits = studyLoadData.reduce((a, s) => a + s.units, 0);
  const coreSubjects = studyLoadData.filter((s) => s.type === "Core");
  const appliedSubjects = studyLoadData.filter((s) => s.type === "Applied");

  const heading = dark ? "text-white" : "text-slate-800";
  const sub = dark ? "text-white/40" : "text-slate-500";
  const card = dark ? "bg-[#1a1740] border-white/10" : "bg-white border-slate-200 shadow-sm";
  const cardHover = dark ? "hover:border-indigo-500/30" : "hover:border-indigo-300 hover:shadow-md";
  const tableHead = dark ? "bg-[#0f0c29]/60 border-white/5" : "bg-slate-50 border-slate-100";
  const tableRow = dark ? "border-white/5 hover:bg-white/5" : "border-slate-100 hover:bg-indigo-50";
  const cellText = dark ? "text-white/70" : "text-slate-700";
  const cellSub = dark ? "text-white/40" : "text-slate-500";
  const trackBg = dark ? "bg-white/10" : "bg-slate-100";

  const typeColor: Record<StudyLoad["type"], string> = {
    "Core":           dark ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" : "bg-indigo-50 text-indigo-600 border-indigo-200",
    "Applied":        dark ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"       : "bg-cyan-50 text-cyan-600 border-cyan-200",
    "Elective":       dark ? "bg-amber-500/20 text-amber-300 border-amber-500/30"    : "bg-amber-50 text-amber-600 border-amber-200",
    "Work Immersion": dark ? "bg-green-500/20 text-green-300 border-green-500/30"    : "bg-green-50 text-green-600 border-green-200",
  };

  const statusColor: Record<StudyLoad["status"], string> = {
    "In Progress": dark ? "bg-blue-500/20 text-blue-300 border-blue-500/30"   : "bg-blue-50 text-blue-600 border-blue-200",
    "Completed":   dark ? "bg-green-500/20 text-green-300 border-green-500/30": "bg-green-50 text-green-600 border-green-200",
    "Upcoming":    dark ? "bg-white/10 text-white/40 border-white/10"          : "bg-slate-100 text-slate-400 border-slate-200",
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className={`font-extrabold text-xl ${heading}`}>Study Load</h2>
        <p className={`text-sm mt-0.5 ${sub}`}>1st Semester · Grade 11 — Senior High School</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Units",     value: `${totalUnits}`,           icon: "📋", sub: "This semester",  color: dark ? "text-indigo-400" : "text-indigo-600" },
          { label: "Core Subjects",   value: `${coreSubjects.length}`,  icon: "📚", sub: "Required",       color: dark ? "text-purple-400" : "text-purple-600" },
          { label: "Applied Subjects",value: `${appliedSubjects.length}`,icon:"🔧", sub: "Track subjects", color: dark ? "text-cyan-400"   : "text-cyan-600"   },
          { label: "Class Days",      value: "5",                        icon: "📅", sub: "Mon – Fri",      color: dark ? "text-green-400"  : "text-green-600"  },
        ].map((s) => (
          <div key={s.label} className={`border rounded-2xl p-4 transition-all ${card} ${cardHover}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-medium ${cellSub}`}>{s.label}</span>
              <span className="text-xl">{s.icon}</span>
            </div>
            <div className={`font-extrabold text-2xl ${s.color}`}>{s.value}</div>
            <div className={`text-xs mt-1 ${sub}`}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Subject load table */}
      <div className={`border rounded-2xl overflow-hidden ${card}`}>
        <div className={`px-5 py-4 border-b flex items-center justify-between ${dark ? "border-white/10" : "border-slate-100"}`}>
          <h3 className={`font-bold text-sm ${heading}`}>Enrolled Subjects</h3>
          <span className={`text-xs ${sub}`}>{studyLoadData.length} subjects · {totalUnits} units total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${tableHead}`}>
                {["Subject", "Teacher", "Schedule", "Units", "Type", "Status"].map((h, i) => (
                  <th key={h} className={`text-xs font-medium px-3 py-3 ${cellSub}
                    ${i === 0 ? "text-left px-5" : i < 3 ? "text-left hidden sm:table-cell" : i === 2 ? "hidden md:table-cell" : "text-center"}
                    ${i === 5 ? "hidden sm:table-cell" : ""}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {studyLoadData.map((s) => (
                <tr key={s.id} className={`border-b transition-colors ${tableRow}`}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-base shrink-0`}>{s.icon}</div>
                      <span className={`text-xs font-medium ${cellText}`}>{s.subject}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 hidden sm:table-cell"><span className={`text-xs ${cellSub}`}>{s.teacher}</span></td>
                  <td className="px-3 py-3 hidden md:table-cell"><span className={`text-xs font-mono ${cellSub}`}>{s.schedule}</span></td>
                  <td className="px-3 py-3 text-center"><span className={`font-bold text-sm ${heading}`}>{s.units}</span></td>
                  <td className="px-3 py-3 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${typeColor[s.type]}`}>{s.type}</span>
                  </td>
                  <td className="px-3 py-3 text-center hidden sm:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColor[s.status]}`}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Units breakdown */}
      <div className={`border rounded-2xl p-5 ${card}`}>
        <h3 className={`font-bold text-sm mb-4 ${heading}`}>Units per Subject</h3>
        <div className="flex flex-col gap-3">
          {studyLoadData.map((s) => (
            <div key={s.id} className="flex items-center gap-3">
              <span className="text-base w-6 shrink-0">{s.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={`text-xs font-medium truncate mb-1 ${cellText}`}>{s.subject}</div>
                <div className={`h-2 rounded-full overflow-hidden ${trackBg}`}>
                  <div className={`h-full bg-gradient-to-r ${s.color} rounded-full`} style={{ width: `${(s.units / 3) * 100}%` }} />
                </div>
              </div>
              <span className={`text-xs font-bold w-12 text-right shrink-0 ${cellSub}`}>{s.units} unit{s.units > 1 ? "s" : ""}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Info banner */}
      <div className={`border rounded-2xl p-5 ${dark ? "bg-indigo-900/30 border-indigo-500/30" : "bg-indigo-50 border-indigo-200"}`}>
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0">🎓</span>
          <div>
            <h3 className={`font-bold text-sm mb-1 ${dark ? "text-indigo-300" : "text-indigo-800"}`}>Senior High School — STEM Track</h3>
            <p className={`text-xs leading-relaxed ${dark ? "text-indigo-400" : "text-indigo-600"}`}>
              Current study load follows the DepEd K–12 Senior High School curriculum. Core subjects are required for all SHS students.
              Applied and specialized subjects are based on the chosen academic track.
              Students must maintain a GWA of{" "}
              <span className={`font-semibold ${dark ? "text-indigo-200" : "text-indigo-800"}`}>3.00 or better</span>{" "}
              to remain in good academic standing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState<NavId>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [dark, setDark] = useState(false);

  const titles: Record<NavId, string> = {
    overview: "Dashboard",
    grades: "Student Grades",
    schedule: "Class Schedule",
    notes: "Announcements",
    "study-load": "Study Load",
  };

  return (
    <DarkCtx.Provider value={dark}>
      <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${dark ? "bg-[#0f0c29]" : "bg-slate-50"}`}>
        <Sidebar
          active={activeNav}
          setActive={setActiveNav}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Main area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top bar */}
          <header className={`px-4 sm:px-6 py-3 flex items-center gap-4 shrink-0 border-b transition-colors duration-300
            ${dark ? "bg-[#1a1740] border-white/10 shadow-none" : "bg-white border-slate-200 shadow-sm"}`}>
            {/* Mobile menu button */}
            <button
              className={`lg:hidden p-1 transition-colors ${dark ? "text-white/50 hover:text-white" : "text-slate-500 hover:text-slate-800"}`}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <div className="w-5 h-0.5 bg-current mb-1" />
              <div className="w-5 h-0.5 bg-current mb-1" />
              <div className="w-5 h-0.5 bg-current" />
            </button>

            {/* Page title */}
            <h1 className={`font-bold text-base hidden sm:block transition-colors ${dark ? "text-white" : "text-slate-800"}`}>
              {titles[activeNav]}
            </h1>

            {/* Search */}
            <div className="flex-1 max-w-sm ml-auto sm:ml-4">
              <div className={`flex items-center gap-2 rounded-xl px-3 py-2 border transition-colors
                ${dark
                  ? "bg-white/5 border-white/10 focus-within:border-indigo-500/60"
                  : "bg-slate-100 border-slate-200 focus-within:border-indigo-400"}`}>
                <span className={`text-sm ${dark ? "text-white/30" : "text-slate-400"}`}>🔍</span>
                <input
                  type="text"
                  placeholder="Search students, subjects..."
                  className={`bg-transparent text-sm flex-1 focus:outline-none
                    ${dark ? "text-white placeholder-white/30" : "text-slate-700 placeholder-slate-400"}`}
                />
              </div>
            </div>

            {/* Dark / Light toggle + Notification bell */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Theme toggle — icon lives inside the thumb */}
              <button
                onClick={() => setDark(!dark)}
                aria-label="Toggle dark mode"
                title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className={`relative inline-flex items-center w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 overflow-hidden shrink-0
                  ${dark ? "bg-indigo-600" : "bg-slate-300"}`}
              >
                {/* Sliding thumb with icon inside */}
                <span
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center transition-transform duration-300
                    ${dark ? "translate-x-8" : "translate-x-0"}`}
                >
                  {dark ? (
                    /* Moon */
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-indigo-600">
                      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    /* Sun */
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-amber-500">
                      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                    </svg>
                  )}
                </span>
              </button>

              {/* Notification bell */}
              <button className={`relative transition-colors p-1 ${dark ? "text-white/50 hover:text-white" : "text-slate-500 hover:text-indigo-600"}`}>
                <span className="text-xl">🔔</span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </header>

          {/* Scrollable content */}
          <main className={`flex-1 overflow-y-auto px-4 sm:px-6 py-6 transition-colors duration-300
            ${dark ? "bg-[#0f0c29]" : "bg-slate-50"}`}>
            {activeNav === "overview" && <OverviewPanel tasks={tasks} setTasks={setTasks} />}
            {activeNav === "grades" && <GradesPanel />}
            {activeNav === "schedule" && <SchedulePanel />}
            {activeNav === "notes" && <NotesPanel />}
            {activeNav === "study-load" && <StudyLoadPanel />}
          </main>
        </div>
      </div>
    </DarkCtx.Provider>
  );
}
