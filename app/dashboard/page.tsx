"use client";

import { useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const subjects = [
  {
    id: 1,
    name: "Mathematics",
    icon: "📐",
    color: "from-indigo-500 to-blue-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    progress: 78,
    files: 12,
    notes: 8,
    nextDeadline: "Exam — Jun 3",
  },
  {
    id: 2,
    name: "Physics",
    icon: "⚛️",
    color: "from-purple-500 to-violet-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
    progress: 55,
    files: 9,
    notes: 5,
    nextDeadline: "Assignment — May 28",
  },
  {
    id: 3,
    name: "English Literature",
    icon: "📖",
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-50",
    border: "border-pink-100",
    progress: 90,
    files: 15,
    notes: 11,
    nextDeadline: "Essay — May 24",
  },
  {
    id: 4,
    name: "Chemistry",
    icon: "🧪",
    color: "from-cyan-500 to-teal-500",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
    progress: 42,
    files: 7,
    notes: 4,
    nextDeadline: "Lab Report — Jun 1",
  },
  {
    id: 5,
    name: "History",
    icon: "🏛️",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
    progress: 65,
    files: 10,
    notes: 7,
    nextDeadline: "Presentation — Jun 7",
  },
  {
    id: 6,
    name: "Computer Science",
    icon: "💻",
    color: "from-green-500 to-emerald-500",
    bg: "bg-green-50",
    border: "border-green-100",
    progress: 88,
    files: 18,
    notes: 14,
    nextDeadline: "Project — Jun 10",
  },
];

const recentFiles = [
  { name: "Calculus Notes — Chapter 7.pdf", subject: "Mathematics", time: "2h ago", icon: "📄" },
  { name: "Newton's Laws Summary.docx", subject: "Physics", time: "Yesterday", icon: "📝" },
  { name: "Macbeth Essay Draft.docx", subject: "English Literature", time: "Yesterday", icon: "📝" },
  { name: "Periodic Table Flashcards.pdf", subject: "Chemistry", time: "2 days ago", icon: "📄" },
  { name: "WW2 Timeline.pptx", subject: "History", time: "3 days ago", icon: "📊" },
];

const upcomingTasks = [
  { task: "Finish Macbeth Essay", subject: "English", due: "Today", urgent: true },
  { task: "Physics Assignment Ch.4", subject: "Physics", due: "May 28", urgent: true },
  { task: "Lab Report — Titration", subject: "Chemistry", due: "Jun 1", urgent: false },
  { task: "Maths Exam Revision", subject: "Mathematics", due: "Jun 3", urgent: false },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const studyHours = [2.5, 4, 3, 5, 4.5, 6, 2];

/* ─────────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────────── */
function Sidebar({ active, setActive, mobileOpen, setMobileOpen }: {
  active: string;
  setActive: (s: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (b: boolean) => void;
}) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "subjects", label: "My Subjects", icon: "📁" },
    { id: "schedule", label: "Schedule", icon: "📅" },
    { id: "ai-tutor", label: "AI Tutor", icon: "🧠" },
    { id: "notes", label: "Notes", icon: "📝" },
    { id: "progress", label: "Progress", icon: "📊" },
    { id: "goals", label: "Goals", icon: "🏆" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0f0c29] border-r border-white/10 z-40 flex flex-col transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            IN
          </div>
          <span className="text-white font-bold text-xl">INFORM</span>
          <button
            className="ml-auto text-white/40 hover:text-white lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setMobileOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left
                ${active === item.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User card */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              JS
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-semibold truncate">Jamie Student</div>
              <div className="text-white/40 text-xs truncate">Year 12 · Science</div>
            </div>
            <Link href="/" className="text-white/30 hover:text-white/70 text-xs transition-colors" title="Log out">
              ↩
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ─────────────────────────────────────────────
   SUBJECT FOLDER CARD
───────────────────────────────────────────── */
function FolderCard({ s }: { s: typeof subjects[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border ${s.border} rounded-2xl overflow-hidden bg-white card-hover`}>
      {/* Folder tab */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        {/* Folder icon with gradient */}
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-xl shrink-0`}>
          {s.icon}
        </div>
        <div className="flex-1 text-left">
          <div className="text-gray-900 font-bold text-sm">{s.name}</div>
          <div className="text-gray-400 text-xs mt-0.5">
            {s.files} files · {s.notes} notes
          </div>
        </div>
        {/* Progress pill */}
        <div className="hidden sm:flex flex-col items-end gap-1 mr-3">
          <span className="text-xs font-semibold text-gray-500">{s.progress}%</span>
          <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${s.color} rounded-full`}
              style={{ width: `${s.progress}%` }}
            />
          </div>
        </div>
        <span className={`text-gray-400 text-sm transition-transform ${open ? "rotate-90" : ""}`}>
          ▶
        </span>
      </button>

      {/* Expanded folder contents */}
      {open && (
        <div className={`${s.bg} border-t ${s.border} px-5 py-4`}>
          {/* Deadline badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-gray-500">📌 Next:</span>
            <span className="text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-full px-2.5 py-0.5">
              {s.nextDeadline}
            </span>
          </div>

          {/* File list */}
          <div className="flex flex-col gap-2 mb-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors"
              >
                <span className="text-base">{i === 2 ? "📊" : "📄"}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-800 text-xs font-medium truncate">
                    {s.name} — {i === 0 ? "Chapter Notes" : i === 1 ? "Past Papers" : "Revision Slides"}.
                    {i === 2 ? "pptx" : "pdf"}
                  </div>
                  <div className="text-gray-400 text-xs">{i === 0 ? "1.2 MB" : i === 1 ? "3.4 MB" : "2.1 MB"}</div>
                </div>
                <span className="text-gray-300 text-xs">↓</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button className={`flex-1 bg-gradient-to-r ${s.color} text-white text-xs font-semibold py-2 rounded-xl hover:opacity-90 transition-opacity`}>
              + Add File
            </button>
            <button className="flex-1 bg-white border border-gray-200 text-gray-600 text-xs font-semibold py-2 rounded-xl hover:bg-gray-50 transition-colors">
              Open Folder
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN DASHBOARD CONTENT
───────────────────────────────────────────── */
function DashboardContent() {
  const maxHours = Math.max(...studyHours);

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-extrabold text-xl sm:text-2xl">
            Good morning, Jamie 👋
          </h2>
          <p className="text-white/70 text-sm mt-1">
            You have <span className="text-white font-semibold">3 tasks due this week</span>. Keep up the streak!
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 shrink-0">
          <span className="text-2xl">🔥</span>
          <div>
            <div className="text-white font-extrabold text-xl leading-none">14</div>
            <div className="text-white/60 text-xs">Day streak</div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Subjects", value: "6", icon: "📁", sub: "Active this term" },
          { label: "Study Hours", value: "27h", icon: "⏱️", sub: "This week" },
          { label: "Tasks Done", value: "18", icon: "✅", sub: "This month" },
          { label: "Avg. Score", value: "82%", icon: "📈", sub: "+4% vs last month" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-4 card-hover">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs font-medium">{s.label}</span>
              <span className="text-xl">{s.icon}</span>
            </div>
            <div className="text-gray-900 font-extrabold text-2xl">{s.value}</div>
            <div className="text-gray-400 text-xs mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Two-column: chart + tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly study chart */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <h3 className="text-gray-900 font-bold text-sm mb-4">Weekly Study Hours</h3>
          <div className="flex items-end gap-2 h-28">
            {studyHours.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-gray-400 text-xs">{h}h</span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-purple-500"
                  style={{ height: `${(h / maxHours) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {weekDays.map((d) => (
              <span key={d} className="flex-1 text-center text-gray-400 text-xs">{d}</span>
            ))}
          </div>
        </div>

        {/* Upcoming tasks */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <h3 className="text-gray-900 font-bold text-sm mb-4">Upcoming Tasks</h3>
          <div className="flex flex-col gap-2">
            {upcomingTasks.map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className={`w-2 h-2 rounded-full shrink-0 ${t.urgent ? "bg-red-400" : "bg-green-400"}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-gray-800 text-xs font-semibold truncate">{t.task}</div>
                  <div className="text-gray-400 text-xs">{t.subject}</div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                  t.urgent ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-500"
                }`}>
                  {t.due}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subject Folders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 font-bold text-lg">My Subject Folders</h3>
          <button className="text-indigo-600 hover:text-indigo-500 text-sm font-semibold transition-colors">
            + New Folder
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((s) => (
            <FolderCard key={s.id} s={s} />
          ))}
        </div>
      </div>

      {/* Recent files */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <h3 className="text-gray-900 font-bold text-sm mb-4">Recent Files</h3>
        <div className="flex flex-col divide-y divide-gray-50">
          {recentFiles.map((f, i) => (
            <div key={i} className="flex items-center gap-3 py-3 hover:bg-gray-50 rounded-xl px-2 cursor-pointer transition-colors">
              <span className="text-xl shrink-0">{f.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-gray-800 text-xs font-medium truncate">{f.name}</div>
                <div className="text-gray-400 text-xs">{f.subject}</div>
              </div>
              <span className="text-gray-300 text-xs shrink-0">{f.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        active={activeNav}
        setActive={setActiveNav}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center gap-4 shrink-0">
          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gray-500 hover:text-gray-800 p-1"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search notes, files, subjects..."
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 flex-1 focus:outline-none"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative text-gray-400 hover:text-gray-700 transition-colors p-1">
              <span className="text-xl">🔔</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
              JS
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}
