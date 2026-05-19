"use client";

import { useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const features = [
  {
    icon: "🧠",
    title: "AI Study Assistant",
    desc: "Get instant explanations, summaries, and practice questions powered by advanced AI — available 24/7.",
  },
  {
    icon: "📅",
    title: "Smart Scheduler",
    desc: "Automatically build a personalised study timetable based on your deadlines, subjects, and energy levels.",
  },
  {
    icon: "📊",
    title: "Progress Analytics",
    desc: "Track your performance across every subject with visual dashboards and actionable insights.",
  },
  {
    icon: "🗂️",
    title: "Note Organiser",
    desc: "Capture, tag, and search all your notes in one place. Sync across every device instantly.",
  },
  {
    icon: "🤝",
    title: "Study Groups",
    desc: "Collaborate with classmates in real-time shared workspaces, whiteboards, and group chats.",
  },
  {
    icon: "🏆",
    title: "Goal Tracker",
    desc: "Set academic goals, earn badges, and stay motivated with streak rewards and milestone celebrations.",
  },
];

const steps = [
  {
    num: "01",
    title: "Create your free account",
    desc: "Sign up in under 60 seconds — no credit card required.",
  },
  {
    num: "02",
    title: "Add your subjects & deadlines",
    desc: "Tell INFORM what you're studying and when your exams are.",
  },
  {
    num: "03",
    title: "Let AI build your plan",
    desc: "Get a personalised study schedule and resource recommendations instantly.",
  },
  {
    num: "04",
    title: "Study smarter, score higher",
    desc: "Follow your plan, track progress, and hit your academic goals.",
  },
];

const testimonials = [
  {
    name: "Amara Diallo",
    role: "Year 12 Student",
    avatar: "AD",
    color: "from-purple-500 to-indigo-500",
    quote:
      "INFORM completely changed how I revise. My grades went from Cs to As in one term. The AI tutor explains things better than some of my teachers!",
  },
  {
    name: "Liam Okafor",
    role: "University Freshman",
    avatar: "LO",
    color: "from-cyan-500 to-blue-500",
    quote:
      "Juggling 6 modules felt impossible until I found INFORM. The smart scheduler keeps me on track and I actually have free time now.",
  },
  {
    name: "Sofia Reyes",
    role: "A-Level Student",
    avatar: "SR",
    color: "from-pink-500 to-rose-500",
    quote:
      "The progress analytics showed me exactly where I was losing marks. I targeted those weak spots and improved my mock score by 22%.",
  },
];

const faqs = [
  {
    q: "Is INFORM free to use?",
    a: "Yes! The core features — AI assistant, scheduler, and note organiser — are completely free. Premium plans unlock advanced analytics and unlimited study groups.",
  },
  {
    q: "Which devices does INFORM support?",
    a: "INFORM works on any device with a browser: phones, tablets, laptops, and desktops. Native iOS and Android apps are coming soon.",
  },
  {
    q: "Is my data private and secure?",
    a: "Absolutely. All data is encrypted in transit and at rest. We never sell your personal information to third parties.",
  },
  {
    q: "Can I use INFORM for any subject?",
    a: "Yes — INFORM supports all subjects and curricula including GCSE, A-Level, IB, and university courses worldwide.",
  },
  {
    q: "How does the AI study assistant work?",
    a: "Our AI is trained on millions of educational resources. Ask it anything — it explains concepts, generates practice questions, and gives feedback on your answers.",
  },
];

const stats = [
  { value: "500K+", label: "Active Students" },
  { value: "94%", label: "Improved Grades" },
  { value: "120+", label: "Countries" },
  { value: "4.9★", label: "App Rating" },
];

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur bg-[#0f0c29]/80 border-b border-white/10" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
        <div className="flex items-center justify-between h-16" suppressHydrationWarning>
          {/* Logo */}
          <div className="flex items-center gap-2" suppressHydrationWarning>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm" suppressHydrationWarning>
              IN
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              INFORM
            </span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "How It Works", "Testimonials", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-white/80 hover:text-white text-sm font-medium transition-colors px-4 py-2">
              Log In
            </Link>
            <Link href="/login" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors animate-pulse-glow">
              Get Started Free
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            suppressHydrationWarning
          >
            <div className="w-5 h-0.5 bg-white mb-1 transition-all" suppressHydrationWarning />
            <div className="w-5 h-0.5 bg-white mb-1 transition-all" suppressHydrationWarning />
            <div className="w-5 h-0.5 bg-white transition-all" suppressHydrationWarning />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0f0c29]/95 border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          {["Features", "How It Works", "Testimonials", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-white/80 hover:text-white text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <Link href="/login" className="text-white/80 text-sm font-medium py-2 text-center">
              Log In
            </Link>
            <Link href="/login" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors text-center">
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white/80 text-xs font-medium tracking-wide uppercase">
            Now with GPT-powered tutoring
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 animate-fade-in-up delay-100">
          Study Smarter.{" "}
          <span className="gradient-text">Score Higher.</span>
          <br />
          Stress Less.
        </h1>

        {/* Sub-headline */}
        <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
          INFORM is the all-in-one AI-powered platform that helps students
          organise their studies, understand difficult topics, and reach their
          academic goals — on any device.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
          <Link href="/login" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-full text-base transition-all hover:scale-105 shadow-lg shadow-indigo-500/30 text-center">
            Start for Free — No Card Needed
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:bg-white/5">
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs">
              ▶
            </span>
            Watch Demo
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in-up delay-400">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold gradient-text">
                {s.value}
              </div>
              <div className="text-white/50 text-xs sm:text-sm mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Floating dashboard mockup */}
        <div className="mt-16 animate-float">
          <div className="relative mx-auto max-w-3xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-900/50 bg-[#1a1740]">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#13112e] border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="flex-1 mx-4 bg-white/10 rounded-full h-5 flex items-center px-3">
                <span className="text-white/40 text-xs">
                  app.inform.study/dashboard
                </span>
              </div>
            </div>
            {/* Dashboard content */}
            <div className="p-6 grid grid-cols-3 gap-4">
              {/* Left panel */}
              <div className="col-span-1 flex flex-col gap-3">
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-white/40 text-xs mb-2">Today</div>
                  {["Maths", "Physics", "English"].map((s, i) => (
                    <div
                      key={s}
                      className="flex items-center gap-2 mb-2"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          i === 0
                            ? "bg-indigo-400"
                            : i === 1
                            ? "bg-purple-400"
                            : "bg-cyan-400"
                        }`}
                      />
                      <span className="text-white/60 text-xs">{s}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-indigo-600/30 rounded-xl p-3 border border-indigo-500/30">
                  <div className="text-indigo-300 text-xs font-semibold mb-1">
                    Streak 🔥
                  </div>
                  <div className="text-white font-bold text-xl">14 days</div>
                </div>
              </div>
              {/* Main panel */}
              <div className="col-span-2 flex flex-col gap-3">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-white/40 text-xs mb-3">
                    Weekly Progress
                  </div>
                  <div className="flex items-end gap-2 h-16">
                    {[40, 65, 50, 80, 70, 90, 60].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-indigo-600 to-purple-500 opacity-80"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <span key={i} className="text-white/30 text-xs flex-1 text-center">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    AI
                  </div>
                  <div>
                    <div className="text-white/80 text-xs font-medium">
                      AI Tutor
                    </div>
                    <div className="text-white/40 text-xs">
                      Ready to help with Calculus...
                    </div>
                  </div>
                  <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section
      id="features"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">
            Everything you need
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4">
            Built for how students{" "}
            <span className="gradient-text">actually learn</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Six powerful tools, one seamless platform. No more juggling apps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`card-hover bg-gray-50 border border-gray-100 rounded-2xl p-6 delay-${(i + 1) * 100}`}
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl mb-4">
                {f.icon}
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-2">
                {f.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-indigo-400 font-semibold text-sm uppercase tracking-widest">
            Simple setup
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4">
            Up and running in{" "}
            <span className="gradient-text">4 steps</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className="card-hover bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4"
            >
              <div className="text-3xl font-extrabold gradient-text shrink-0 w-12">
                {s.num}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  {s.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">
            Student stories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4">
            Real results from{" "}
            <span className="gradient-text">real students</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="card-hover bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">
                    {t.name}
                  </div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </div>
                <div className="ml-auto text-yellow-400 text-sm">★★★★★</div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">
            Got questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 mb-4">
            Frequently asked questions
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-gray-900 font-semibold text-sm sm:text-base">
                  {faq.q}
                </span>
                <span
                  className={`text-indigo-600 text-lg font-bold transition-transform ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-4 bg-gray-50">
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 hero-gradient">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
          Ready to transform{" "}
          <span className="gradient-text">your studies?</span>
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
          Join over 500,000 students already using INFORM to study smarter and
          score higher. It&apos;s free to get started.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-4 rounded-full text-base transition-all hover:scale-105 shadow-lg shadow-indigo-500/30 animate-pulse-glow text-center">
            Create Free Account
          </Link>
          <button className="w-full sm:w-auto border border-white/30 hover:border-white/60 text-white font-semibold px-10 py-4 rounded-full text-base transition-all hover:bg-white/5">
            See All Features
          </button>
        </div>
        <p className="text-white/30 text-xs mt-6">
          No credit card required · Cancel anytime · GDPR compliant
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0a0818] border-t border-white/10 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                IN
              </div>
              <span className="text-white font-bold text-xl">INFORM</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              The smart student platform for the next generation of learners.
            </p>
          </div>

          {/* Links */}
          {[
            {
              heading: "Product",
              links: ["Features", "Pricing", "Changelog", "Roadmap"],
            },
            {
              heading: "Company",
              links: ["About", "Blog", "Careers", "Press"],
            },
            {
              heading: "Support",
              links: ["Help Centre", "Contact", "Privacy", "Terms"],
            },
          ].map((col) => (
            <div key={col.heading}>
              <h4 className="text-white font-semibold text-sm mb-3">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-white/40 hover:text-white/80 text-sm transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © 2026 INFORM. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "Instagram", "LinkedIn", "YouTube"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-white/30 hover:text-white/70 text-xs transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
