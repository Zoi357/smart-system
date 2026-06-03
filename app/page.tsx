"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function LandingPage() {
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
  const servicesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Add js-enabled class
    document.documentElement.classList.add('js-enabled');
    
    // Scroll Reveal Observer
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("revealed");
          }, index * 100);
        }
      });
    }, observerOptions);

    featuresRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    servicesRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleTiltMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const rotateX = (mouseY - centerY) / 10;
    const rotateY = (centerX - mouseX) / 10;

    card.style.setProperty("--rotateX", `${rotateX}deg`);
    card.style.setProperty("--rotateY", `${rotateY}deg`);
  };

  const handleTiltMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rotateX", "0deg");
    card.style.setProperty("--rotateY", "0deg");
  };

  return (
    <div className="min-vh-100 bg-light text-dark">
      {/* Navigation */}
      <header className="sticky-top bg-white bg-opacity-90 backdrop-blur border-bottom border-light shadow-sm z-3">
        <div className="container py-3">
          <div className="d-flex align-items-center justify-content-between">
            <Link href="/" className="d-flex align-items-center gap-3 text-decoration-none text-dark">
              <img src="/cfei-logo.jpg" alt="CFEI" className="rounded-circle" style={{ width: "40px", height: "40px", objectFit: "cover", border: "2px solid #dc2626" }} />
              <div>
                <h5 className="mb-0 fw-bold" style={{ color: "#dc2626" }}>Cebu Far East Institute</h5>
                <p className="mb-0 text-muted small">Student Information System</p>
              </div>
            </Link>
            <div className="d-flex align-items-center gap-4">
              <Link href="/login" className="text-decoration-none fw-medium" style={{ color: "#dc2626" }}>Student Login</Link>
              <Link href="/teacher/login" className="text-decoration-none fw-medium" style={{ color: "#f97316" }}>Teacher Login</Link>
              <Link href="/admin/login" className="btn btn-shimmer fw-semibold" style={{ background: "linear-gradient(135deg, #dc2626, #f97316)", color: "white" }}>Admin</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-5 py-md-6 py-lg-7" style={{ background: "linear-gradient(135deg, #fff7ed, #fef3c7)" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8 text-center">
              <div className="d-inline-flex align-items-center gap-2 rounded-pill small fw-medium mb-4" style={{ background: "linear-gradient(135deg, #dc2626, #f97316)", color: "white", padding: "8px 20px" }}>
                <span className="w-2 h-2 bg-warning rounded-circle animate-pulse"></span>
                Official Student Portal
              </div>
              <h1 className="display-4 display-md-3 display-lg-2 fw-extrabold mb-4">
                <span style={{ color: "#dc2626" }}>Student Information</span><br />
                <span style={{
                  background: "linear-gradient(135deg, #dc2626, #f97316, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                  color: "#dc2626"
                }}>
                  Management System
                </span>
              </h1>
              <p className="lead mb-5 text-muted" style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
                Streamlined academic management for Cebu Far East Institute. Access your records, enrollment, and academic information in one unified platform.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link href="/login" className="btn btn-lg px-5 py-3 fw-semibold rounded-xl shadow hover:shadow-lg transition-all btn-shimmer" style={{ background: "linear-gradient(135deg, #dc2626, #f97316)", color: "white" }}>
                  Student Portal
                </Link>
                <Link href="/enrollment" className="btn btn-lg px-5 py-3 fw-semibold rounded-xl border-2 transition-all" style={{ borderColor: "#dc2626", color: "#dc2626" }}>
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (with Parallax/Scroll Reveal) */}
      <section className="py-5 py-md-6 py-lg-7 bg-white parallax-section">
        <div className="container">
          <div className="text-center mb-5 scroll-reveal">
            <h6 className="fw-semibold mb-2" style={{ color: "#f97316" }}>Why Choose Us</h6>
            <h2 className="h1 fw-bold" style={{ color: "#dc2626" }}>Everything You Need in One Place</h2>
          </div>
          <div className="row g-4">
            {[
              { icon: "📚", title: "Modern Learning", desc: "Interactive digital resources" },
              { icon: "📊", title: "Real-time Grades", desc: "Instant grade updates" },
              { icon: "📅", title: "Smart Scheduling", desc: "Optimized timetables" },
              { icon: "💬", title: "Easy Communication", desc: "Connect with teachers" }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="col-12 col-md-6 col-lg-3"
                ref={(el) => { featuresRef.current[idx] = el; }}
              >
                <div className={`h-100 p-5 rounded-4 border border-light hover:shadow-lg transition-all hover:-translate-y-1 scroll-reveal-scale ${idx === 0 ? 'float-slow' : idx === 1 ? 'float-slow-delay-1' : idx === 2 ? 'float-slow-delay-2' : 'float-slow-delay-3'}`} style={{ borderColor: "#fbbf24", background: "linear-gradient(135deg, #fff7ed, #fef3c7)" }}>
                  <div className="text-5xl mb-3">{feature.icon}</div>
                  <h5 className="fw-bold mb-2" style={{ color: "#dc2626" }}>{feature.title}</h5>
                  <p className="text-muted mb-0">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section (with 3D hover effects) */}
      <section className="py-5 py-md-6 py-lg-7" style={{ background: "#fff7ed" }}>
        <div className="container">
          <div className="text-center mb-5 scroll-reveal">
            <h6 className="fw-semibold mb-2" style={{ color: "#f97316" }}>Quick Access</h6>
            <h2 className="h1 fw-bold" style={{ color: "#dc2626" }}>Our Services</h2>
          </div>
          <div className="row g-4">
            {[
              { icon: "📋", title: "Enrollment", desc: "Register for classes", href: "/enrollment" },
              { icon: "📊", title: "Grades", desc: "View your results", href: "/login" },
              { icon: "🕐", title: "Schedule", desc: "Class timetable", href: "/login" },
              { icon: "💳", title: "Fees & Payments", desc: "Pay tuition & fees", href: "/login" }
            ].map((service, idx) => (
              <div
                key={idx}
                className="col-12 col-md-6 col-lg-3"
                ref={(el) => { servicesRef.current[idx] = el; }}
              >
                <Link href={service.href} className="text-decoration-none text-dark">
                  <div className="card-3d-tilt h-100 scroll-reveal" onMouseMove={(e) => handleTiltMouseMove(e, idx)} onMouseLeave={handleTiltMouseLeave}>
                    <div className="card-glow-border h-100">
                      <div className="card-glow-inner h-100 text-center">
                        <div className="mb-3 rounded-xl" style={{ width: "48px", height: "48px", background: "linear-gradient(135deg, #dc2626, #f97316)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", margin: "0 auto" }}>
                          {service.icon}
                        </div>
                        <h5 className="fw-bold mb-1" style={{ color: "#dc2626" }}>{service.title}</h5>
                        <p className="text-muted small mb-0">{service.desc}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 py-md-6 py-lg-7" style={{ background: "linear-gradient(135deg, #dc2626, #f97316)", color: "white" }}>
        <div className="container">
          <div className="row justify-content-center g-4">
            {[
              { value: "2,400+", label: "Active Students" },
              { value: "120+", label: "Faculty Members" },
              { value: "99.9%", label: "System Uptime" },
            ].map((stat, idx) => (
              <div key={idx} className="col-12 col-md-4 text-center scroll-reveal">
                <p className="display-4 fw-extrabold mb-1" style={{ color: "#fbbf24" }}>{stat.value}</p>
                <p className="mb-0 fw-medium" style={{ color: "#fff7ed" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment CTA */}
      <section className="py-5 py-md-6 py-lg-7 bg-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center p-5 p-md-6 rounded-4 scroll-reveal" style={{ background: "linear-gradient(135deg, #fef3c7, #fff7ed)", border: "2px solid #fbbf24" }}>
                <div className="text-5xl mb-3">📋</div>
                <h2 className="h1 fw-bold mb-3" style={{ color: "#dc2626" }}>Enrollment Period is Now Open</h2>
                <p className="lead mb-4 text-muted">
                  Don't miss the deadline! Enroll by <strong style={{ color: "#f97316" }}>June 15, 2026</strong>.
                </p>
                <Link href="/enrollment" className="btn btn-lg px-5 py-3 fw-semibold rounded-xl shadow hover:shadow-lg transition-all btn-shimmer" style={{ background: "linear-gradient(135deg, #dc2626, #f97316)", color: "white" }}>
                  Enroll Now
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ms-2">
                    <path d="M 3 8 L 13 8 M 10 5 L 13 8 L 10 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5" style={{ background: "#dc2626", color: "white" }}>
        <div className="container">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 mb-4">
            <div className="d-flex align-items-center gap-3">
              <img src="/cfei-logo.jpg" alt="CFEI" className="rounded-circle" style={{ width: "40px", height: "40px", objectFit: "cover", border: "2px solid white" }} />
              <div>
                <h5 className="mb-0 fw-bold">Cebu Far East Institute</h5>
                <p className="mb-0 small" style={{ color: "#fef3c7" }}>Student Information System</p>
              </div>
            </div>
            <div className="d-flex gap-4">
              <a href="#" className="text-decoration-none hover:underline" style={{ color: "#fef3c7" }}>Privacy Policy</a>
              <a href="#" className="text-decoration-none hover:underline" style={{ color: "#fef3c7" }}>Help</a>
              <a href="#" className="text-decoration-none hover:underline" style={{ color: "#fef3c7" }}>Accessibility</a>
            </div>
          </div>
          <div className="border-top pt-4 text-center small" style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fef3c7" }}>
            <p className="mb-0">© 2026 Cebu Far East Institute. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}