"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── TYPES ─── */
type FileItem = { name: string; size: string; type: "pdf" | "doc" | "ppt" | "img" | "other"; added: string };
type Folder   = { id: number; name: string; icon: string; color: string; colorLight: string; progress: number; files: FileItem[]; deadline: string };

/* ─── FOLDER DATA ─── */
const folderData: Folder[] = [
  {
    id: 1, name: "Mathematics", icon: "📐", color: "bg-blue-600", colorLight: "bg-blue-50",
    progress: 78, deadline: "Exam — Jun 3",
    files: [
      { name: "Calculus Notes — Chapter 7.pdf",  size: "1.2 MB", type: "pdf", added: "2h ago"     },
      { name: "Past Papers 2023.pdf",             size: "3.4 MB", type: "pdf", added: "Yesterday"  },
      { name: "Revision Slides.pptx",             size: "2.1 MB", type: "ppt", added: "2 days ago" },
      { name: "Formula Sheet.pdf",                size: "0.4 MB", type: "pdf", added: "3 days ago" },
    ],
  },
  {
    id: 2, name: "Physics", icon: "⚛️", color: "bg-purple-600", colorLight: "bg-purple-50",
    progress: 55, deadline: "Assignment — May 28",
    files: [
      { name: "Newton's Laws Summary.docx",       size: "0.8 MB", type: "doc", added: "Yesterday"  },
      { name: "Lab Report Template.docx",         size: "0.3 MB", type: "doc", added: "3 days ago" },
      { name: "Wave Mechanics Slides.pptx",       size: "4.1 MB", type: "ppt", added: "4 days ago" },
    ],
  },
  {
    id: 3, name: "English Literature", icon: "📖", color: "bg-pink-600", colorLight: "bg-pink-50",
    progress: 90, deadline: "Essay — May 24",
    files: [
      { name: "Macbeth Essay Draft.docx",         size: "0.6 MB", type: "doc", added: "Yesterday"  },
      { name: "Shakespeare Analysis.pdf",         size: "1.8 MB", type: "pdf", added: "2 days ago" },
      { name: "Poetry Anthology.pdf",             size: "2.2 MB", type: "pdf", added: "5 days ago" },
      { name: "Essay Rubric.pdf",                 size: "0.2 MB", type: "pdf", added: "1 week ago" },
      { name: "Reading List.docx",                size: "0.1 MB", type: "doc", added: "1 week ago" },
    ],
  },
  {
    id: 4, name: "Chemistry", icon: "🧪", color: "bg-cyan-600", colorLight: "bg-cyan-50",
    progress: 42, deadline: "Lab Report — Jun 1",
    files: [
      { name: "Periodic Table Flashcards.pdf",    size: "1.5 MB", type: "pdf", added: "2 days ago" },
      { name: "Titration Lab Notes.docx",         size: "0.7 MB", type: "doc", added: "3 days ago" },
      { name: "Organic Chemistry Diagrams.pdf",   size: "2.9 MB", type: "pdf", added: "5 days ago" },
    ],
  },
  {
    id: 5, name: "History", icon: "🏛️", color: "bg-amber-600", colorLight: "bg-amber-50",
    progress: 65, deadline: "Presentation — Jun 7",
    files: [
      { name: "WW2 Timeline.pptx",               size: "3.2 MB", type: "ppt", added: "3 days ago" },
      { name: "Cold War Essay.docx",              size: "0.9 MB", type: "doc", added: "4 days ago" },
      { name: "Primary Sources.pdf",              size: "5.1 MB", type: "pdf", added: "1 week ago" },
    ],
  },
  {
    id: 6, name: "Computer Science", icon: "💻", color: "bg-green-600", colorLight: "bg-green-50",
    progress: 88, deadline: "Project — Jun 10",
    files: [
      { name: "Algorithm Notes.pdf",              size: "1.1 MB", type: "pdf", added: "1h ago"     },
      { name: "Project Proposal.docx",            size: "0.5 MB", type: "doc", added: "Yesterday"  },
      { name: "Database Schema.pdf",              size: "0.8 MB", type: "pdf", added: "2 days ago" },
      { name: "UI Mockups.png",                   size: "2.4 MB", type: "img", added: "3 days ago" },
      { name: "Code Review Slides.pptx",          size: "1.7 MB", type: "ppt", added: "4 days ago" },
    ],
  },
];

/* ─── FILE TYPE HELPERS ─── */
const fileIcon: Record<string, string> = { pdf: "📄", doc: "📝", ppt: "📊", img: "🖼️", other: "📎" };
const fileColor: Record<string, string> = {
  pdf:   "bg-red-50   text-red-500   border-red-100",
  doc:   "bg-blue-50  text-blue-500  border-blue-100",
  ppt:   "bg-orange-50 text-orange-500 border-orange-100",
  img:   "bg-green-50 text-green-500 border-green-100",
  other: "bg-slate-50 text-slate-500 border-slate-100",
};

/* ─── LEGACY subjects alias (used by DashboardContent FolderCard) ─── */
const subjects = folderData.map(f => ({
  id: f.id, name: f.name, icon: f.icon, color: f.color,
  progress: f.progress, files: f.files.length, notes: Math.floor(f.files.length * 0.6),
  deadline: f.deadline,
}));

const recentFiles = [
  { name: "Calculus Notes — Chapter 7.pdf",  subject: "Mathematics",        time: "2h ago",    icon: "📄" },
  { name: "Newton's Laws Summary.docx",       subject: "Physics",            time: "Yesterday", icon: "📝" },
  { name: "Macbeth Essay Draft.docx",         subject: "English Literature", time: "Yesterday", icon: "📝" },
  { name: "Periodic Table Flashcards.pdf",    subject: "Chemistry",          time: "2 days ago",icon: "📄" },
  { name: "WW2 Timeline.pptx",               subject: "History",            time: "3 days ago",icon: "📊" },
];

const upcomingTasks = [
  { task: "Finish Macbeth Essay",    subject: "English",     due: "Today",  urgent: true  },
  { task: "Physics Assignment Ch.4", subject: "Physics",     due: "May 28", urgent: true  },
  { task: "Lab Report — Titration",  subject: "Chemistry",   due: "Jun 1",  urgent: false },
  { task: "Maths Exam Revision",     subject: "Mathematics", due: "Jun 3",  urgent: false },
];

const weekDays   = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const studyHours = [2.5, 4, 3, 5, 4.5, 6, 2];

const navItems = [
  { id: "dashboard",  label: "Dashboard",   icon: "🏠" },
  { id: "subjects",   label: "My Subjects", icon: "📁" },
  { id: "schedule",   label: "Schedule",    icon: "📅" },
  { id: "ai-tutor",   label: "AI Tutor",    icon: "🧠" },
  { id: "notes",      label: "Notes",       icon: "📝" },
  { id: "progress",   label: "Progress",    icon: "📊" },
  { id: "enrollment", label: "Enrollment",  icon: "🎓" },
  { id: "fees",       label: "Fees",        icon: "💰" },
];

/* ─── MY FOLDERS VIEW ─── */
function MyFolders() {
  const [openFolder, setOpenFolder] = useState<Folder | null>(null);
  const [search, setSearch]         = useState("");
  const [showModal, setShowModal]   = useState(false);
  const [newName, setNewName]       = useState("");
  const [folders, setFolders]       = useState<Folder[]>(folderData);

  /* filtered files inside open folder */
  const filteredFiles = openFolder
    ? openFolder.files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  function addFolder() {
    if (!newName.trim()) return;
    const icons = ["📘","📗","📙","📕","📓"];
    const colors = ["bg-indigo-600","bg-teal-600","bg-rose-600","bg-violet-600","bg-lime-600"];
    const lights = ["bg-indigo-50","bg-teal-50","bg-rose-50","bg-violet-50","bg-lime-50"];
    const idx = folders.length % icons.length;
    setFolders(prev => [...prev, {
      id: Date.now(), name: newName.trim(), icon: icons[idx],
      color: colors[idx], colorLight: lights[idx],
      progress: 0, deadline: "No deadline set", files: [],
    }]);
    setNewName("");
    setShowModal(false);
  }

  /* ── open folder drill-down ── */
  if (openFolder) {
    const folder = folders.find(f => f.id === openFolder.id) ?? openFolder;
    return (
      <div className="flex flex-col gap-5">
        {/* breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <button onClick={() => { setOpenFolder(null); setSearch(""); }}
            className="text-blue-500 hover:text-blue-700 font-semibold transition-colors">
            My Folders
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 font-semibold">{folder.name}</span>
        </div>

        {/* folder header */}
        <div className={`${folder.colorLight} rounded-2xl p-5 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-4`}>
          <div className={`w-14 h-14 rounded-2xl ${folder.color} flex items-center justify-center text-3xl shadow-md`}>
            {folder.icon}
          </div>
          <div className="flex-1">
            <h2 className="text-slate-800 font-extrabold text-xl">{folder.name}</h2>
            <p className="text-slate-400 text-sm mt-0.5">
              {folder.files.length} files · Next: <span className="text-slate-600 font-semibold">{folder.deadline}</span>
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 max-w-xs h-2 bg-white rounded-full overflow-hidden border border-slate-200">
                <div className={`h-full ${folder.color} rounded-full transition-all`} style={{ width: `${folder.progress}%` }} />
              </div>
              <span className="text-xs font-semibold text-slate-500">{folder.progress}% complete</span>
            </div>
          </div>
          <button className={`${folder.color} text-white text-sm font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-sm`}>
            + Upload File
          </button>
        </div>

        {/* search */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
          <span className="text-slate-400">🔍</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder={`Search in ${folder.name}...`}
            className="flex-1 text-sm text-slate-600 placeholder-slate-300 bg-transparent focus:outline-none"
          />
        </div>

        {/* files list */}
        {filteredFiles.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center shadow-sm">
            <div className="text-4xl mb-3">📂</div>
            <p className="text-slate-400 text-sm">{search ? "No files match your search." : "This folder is empty."}</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* table header */}
            <div className="grid grid-cols-12 px-5 py-3 border-b border-slate-100 bg-slate-50">
              <span className="col-span-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">File Name</span>
              <span className="col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:block">Type</span>
              <span className="col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:block">Size</span>
              <span className="col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Added</span>
            </div>
            {filteredFiles.map((f, i) => (
              <div key={i}
                className="grid grid-cols-12 px-5 py-3.5 border-b border-slate-50 hover:bg-blue-50 cursor-pointer transition-colors items-center last:border-0">
                <div className="col-span-6 flex items-center gap-3 min-w-0">
                  <span className={`w-8 h-8 rounded-lg border flex items-center justify-center text-base shrink-0 ${fileColor[f.type]}`}>
                    {fileIcon[f.type]}
                  </span>
                  <span className="text-slate-700 text-sm font-medium truncate">{f.name}</span>
                </div>
                <div className="col-span-2 hidden sm:block">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${fileColor[f.type]}`}>
                    {f.type.toUpperCase()}
                  </span>
                </div>
                <span className="col-span-2 text-slate-400 text-xs hidden sm:block">{f.size}</span>
                <div className="col-span-2 flex items-center justify-between">
                  <span className="text-slate-400 text-xs">{f.added}</span>
                  <button className="text-slate-300 hover:text-blue-500 transition-colors text-sm ml-2" title="Download">↓</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ── folder grid ── */
  return (
    <div className="flex flex-col gap-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-800 font-extrabold text-2xl">My Folders</h2>
          <p className="text-slate-400 text-sm mt-0.5">{folders.length} subject folders · {folders.reduce((a, f) => a + f.files.length, 0)} total files</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors shadow-md shadow-blue-200 flex items-center gap-2"
        >
          <span className="text-base">＋</span> New Folder
        </button>
      </div>

      {/* folder grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {folders.map(folder => (
          <button
            key={folder.id}
            onClick={() => setOpenFolder(folder)}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-left p-5 group"
          >
            {/* top row */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl ${folder.color} flex items-center justify-center text-2xl shadow-md`}>
                {folder.icon}
              </div>
              <span className="text-slate-300 group-hover:text-blue-400 transition-colors text-lg">→</span>
            </div>

            {/* name */}
            <h3 className="text-slate-800 font-bold text-base mb-1">{folder.name}</h3>
            <p className="text-slate-400 text-xs mb-4">
              {folder.files.length} files · {Math.floor(folder.files.length * 0.6)} notes
            </p>

            {/* progress */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${folder.color} rounded-full`} style={{ width: `${folder.progress}%` }} />
              </div>
              <span className="text-xs font-semibold text-slate-400 shrink-0">{folder.progress}%</span>
            </div>

            {/* deadline chip */}
            <div className={`inline-flex items-center gap-1.5 ${folder.colorLight} rounded-full px-3 py-1`}>
              <span className="text-xs">📌</span>
              <span className="text-xs font-semibold text-slate-600">{folder.deadline}</span>
            </div>
          </button>
        ))}

        {/* add folder tile */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:border-blue-300 hover:bg-blue-50 transition-all min-h-[180px] group"
        >
          <div className="w-12 h-12 rounded-2xl bg-white border-2 border-dashed border-slate-200 group-hover:border-blue-300 flex items-center justify-center text-2xl transition-colors">
            ＋
          </div>
          <span className="text-slate-400 group-hover:text-blue-500 text-sm font-semibold transition-colors">New Folder</span>
        </button>
      </div>

      {/* new folder modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-slate-800 font-extrabold text-lg">Create New Folder</h3>
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-500 text-xs font-semibold uppercase tracking-widest">Folder Name</label>
              <input
                autoFocus
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addFolder()}
                placeholder="e.g. Biology, Art History..."
                className="bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 text-sm outline-none transition"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-sm py-2.5 rounded-xl transition-colors">
                Cancel
              </button>
              <button onClick={addFolder}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2.5 rounded-xl transition-colors shadow-md shadow-blue-200">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── SIDEBAR ─── */
function Sidebar({ active, setActive, mobileOpen, setMobileOpen }: {
  active: string;
  setActive: (s: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (b: boolean) => void;
}) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-100 z-40 flex flex-col transition-transform duration-300 shadow-xl shadow-blue-50
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}>

        {/* logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-base shadow-md shadow-blue-200">
            IN
          </div>
          <div>
            <div className="text-slate-800 font-bold text-base leading-tight">INFORM</div>
            <div className="text-slate-400 text-xs">Student Portal</div>
          </div>
          <button className="ml-auto text-slate-300 hover:text-slate-600 lg:hidden" onClick={() => setMobileOpen(false)}>✕</button>
        </div>

        {/* nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setMobileOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left
                ${active === item.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* user */}
        <div className="px-3 py-4 border-t border-slate-100">
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-3 border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">JS</div>
            <div className="flex-1 min-w-0">
              <div className="text-slate-700 text-xs font-semibold truncate">Jamie Student</div>
              <div className="text-slate-400 text-xs truncate">STU-2024-00123</div>
            </div>
            <Link href="/" className="text-slate-300 hover:text-slate-500 text-xs transition-colors" title="Log out">↩</Link>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ─── FOLDER CARD ─── */
function FolderCard({ s }: { s: typeof subjects[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-50 transition-colors">
        <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-xl shrink-0`}>{s.icon}</div>
        <div className="flex-1 text-left">
          <div className="text-slate-700 font-bold text-sm">{s.name}</div>
          <div className="text-slate-400 text-xs mt-0.5">{s.files} files · {s.notes} notes</div>
        </div>
        <div className="hidden sm:flex flex-col items-end gap-1 mr-3">
          <span className="text-xs font-semibold text-slate-400">{s.progress}%</span>
          <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.progress}%` }} />
          </div>
        </div>
        <span className={`text-slate-300 text-sm transition-transform ${open ? "rotate-90" : ""}`}>▶</span>
      </button>

      {open && (
        <div className="border-t border-slate-100 px-5 py-4 bg-slate-50">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-slate-400">📌 Next:</span>
            <span className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-full px-2.5 py-0.5">{s.deadline}</span>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            {["Chapter Notes.pdf", "Past Papers.pdf", "Revision Slides.pptx"].map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl px-3 py-2.5 hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors">
                <span className="text-base">{i === 2 ? "📊" : "📄"}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-slate-600 text-xs font-medium truncate">{s.name} — {f}</div>
                  <div className="text-slate-400 text-xs">{i === 0 ? "1.2 MB" : i === 1 ? "3.4 MB" : "2.1 MB"}</div>
                </div>
                <span className="text-slate-300 text-xs">↓</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button className={`flex-1 ${s.color} text-white text-xs font-semibold py-2 rounded-xl hover:opacity-90 transition-opacity`}>+ Add File</button>
            <button className="flex-1 bg-white border border-slate-200 text-slate-500 text-xs font-semibold py-2 rounded-xl hover:bg-slate-50 transition-colors">Open Folder</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── DASHBOARD CONTENT ─── */
function DashboardContent() {
  const maxH = Math.max(...studyHours);
  return (
    <div className="flex flex-col gap-6">

      {/* welcome */}
      <div className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-blue-100 shadow-sm">
        <div>
          <h2 className="text-slate-800 font-extrabold text-xl sm:text-2xl">Good morning, Jamie 👋</h2>
          <p className="text-slate-400 text-sm mt-1">
            You have <span className="text-slate-700 font-semibold">3 tasks due this week</span>. Keep up the streak!
          </p>
        </div>
        <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 shrink-0">
          <span className="text-2xl">🔥</span>
          <div>
            <div className="text-blue-700 font-extrabold text-xl leading-none">14</div>
            <div className="text-slate-400 text-xs">Day streak</div>
          </div>
        </div>
      </div>

      {/* enrollment alert */}
      <div className="bg-yellow-50 rounded-2xl px-5 py-4 flex items-center gap-4 border border-yellow-200 shadow-sm">
        <span className="text-2xl shrink-0">🔔</span>
        <div className="flex-1">
          <div className="text-yellow-700 font-bold text-sm">Enrollment Period is Now Open</div>
          <div className="text-slate-400 text-xs mt-0.5">Deadline: <span className="text-slate-700 font-semibold">June 15, 2026</span></div>
        </div>
        <button className="shrink-0 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm">
          Enroll Now
        </button>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Subjects",    value: "6",   icon: "📁", sub: "Active this term"    },
          { label: "Study Hours", value: "27h", icon: "⏱️", sub: "This week"           },
          { label: "Tasks Done",  value: "18",  icon: "✅", sub: "This month"          },
          { label: "Avg. Score",  value: "82%", icon: "📈", sub: "+4% vs last month"   },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-xs font-medium">{s.label}</span>
              <span className="text-xl">{s.icon}</span>
            </div>
            <div className="text-slate-800 font-extrabold text-2xl">{s.value}</div>
            <div className="text-slate-400 text-xs mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* chart + tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="text-slate-700 font-bold text-sm mb-4">Weekly Study Hours</h3>
          <div className="flex items-end gap-2 h-28">
            {studyHours.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-slate-400 text-xs">{h}h</span>
                <div className="w-full rounded-t-lg bg-blue-500" style={{ height: `${(h / maxH) * 100}%` }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {weekDays.map((d) => (
              <span key={d} className="flex-1 text-center text-slate-400 text-xs">{d}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="text-slate-700 font-bold text-sm mb-4">Upcoming Tasks</h3>
          <div className="flex flex-col gap-2">
            {upcomingTasks.map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-100">
                <div className={`w-2 h-2 rounded-full shrink-0 ${t.urgent ? "bg-red-400" : "bg-green-400"}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-slate-700 text-xs font-semibold truncate">{t.task}</div>
                  <div className="text-slate-400 text-xs">{t.subject}</div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${t.urgent ? "bg-red-100 text-red-500" : "bg-slate-100 text-slate-400"}`}>
                  {t.due}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* subject folders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-800 font-bold text-lg">My Subject Folders</h3>
          <button className="text-blue-500 hover:text-blue-600 text-sm font-semibold transition-colors">+ New Folder</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((s) => <FolderCard key={s.id} s={s} />)}
        </div>
      </div>

      {/* recent files */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <h3 className="text-slate-700 font-bold text-sm mb-4">Recent Files</h3>
        <div className="flex flex-col divide-y divide-slate-50">
          {recentFiles.map((f, i) => (
            <div key={i} className="flex items-center gap-3 py-3 hover:bg-slate-50 rounded-xl px-2 cursor-pointer transition-colors">
              <span className="text-xl shrink-0">{f.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-slate-600 text-xs font-medium truncate">{f.name}</div>
                <div className="text-slate-400 text-xs">{f.subject}</div>
              </div>
              <span className="text-slate-300 text-xs shrink-0">{f.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE ─── */
export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen kiosk-bg overflow-hidden" suppressHydrationWarning>
      <Sidebar active={activeNav} setActive={setActiveNav} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* topbar */}
        <header className="bg-white border-b border-slate-100 px-4 sm:px-6 py-3 flex items-center gap-4 shrink-0 shadow-sm">
          <button className="lg:hidden text-slate-400 hover:text-slate-700 p-1" onClick={() => setMobileOpen(true)}>
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current" />
          </button>

          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <span className="text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search records, files, subjects..."
                className="bg-transparent text-sm text-slate-600 placeholder-slate-300 flex-1 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors p-1">
              <span className="text-xl">🔔</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer shadow-md shadow-blue-200">
              JS
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
          {activeNav === "subjects" ? <MyFolders /> : <DashboardContent />}
        </main>
      </div>
    </div>
  );
}
