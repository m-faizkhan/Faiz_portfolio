import { useEffect, useRef, useState } from "react";
import portrait from "./imports/image.png";
import cv from "./imports/Faiz-Khan-CV.pdf";

const SKILLS = ["HTML5", "CSS3", "JavaScript", "React.js", "Node.js", "PHP", "MySQL", "REST APIs", "Tailwind CSS", "Git"];

const PROJECTS = [
  {
    num: "01",
    name: "E-Commerce Platform",
    category: "Full Stack",
    desc: "A complete online store with cart, checkout, and admin panel.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&auto=format",
  },
  {
    num: "02",
    name: "Agency Website",
    category: "Frontend",
    desc: "Marketing site built for a Karachi-based digital agency.",
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop&auto=format",
  },
  {
    num: "03",
    name: "Task Manager App",
    category: "React",
    desc: "Real-time task management application with drag-and-drop UI.",
    img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop&auto=format",
  },
];

export default function App() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const actual = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // smooth cursor
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      actual.current.x += (pos.current.x - actual.current.x) * 0.18;
      actual.current.y += (pos.current.y - actual.current.y) * 0.18;
      if (cursorRef.current) {
        cursorRef.current.style.left = actual.current.x + "px";
        cursorRef.current.style.top = actual.current.y + "px";
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const onEnter = () => cursorRef.current?.classList.add("expanded");
    const onLeave = () => cursorRef.current?.classList.remove("expanded");
    const interactives = document.querySelectorAll("a, button, .project-card, img");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // intersection observer for fade-in
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div ref={cursorRef} id="cursor" />

      {/* NAV */}
      <nav
        style={{ borderBottom: "1px solid #51080d22" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        role="navigation"
      >
        <span className="font-display text-xl tracking-widest" style={{ color: "#EDE7E0", letterSpacing: "0.25em" }}>
          FK
        </span>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {["Work", "Skills", "Experience", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: "#8C8683", fontFamily: "Outfit, sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#EDE7E0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8C8683")}
            >
              {item}
            </a>
          ))}
          <a
            href="mailto:aimsfaiz27@gmail.com"
            className="text-xs tracking-widest uppercase px-4 py-2 transition-colors duration-200"
            style={{ border: "1px solid #75020f", color: "#EDE7E0", fontFamily: "Outfit, sans-serif" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#75020f"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            Hire Me
          </a>
        </div>
        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-px" style={{ background: "#EDE7E0" }} />
          <span className="block w-4 h-px" style={{ background: "#EDE7E0" }} />
          <span className="block w-6 h-px" style={{ background: "#EDE7E0" }} />
        </button>
        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="absolute top-full left-0 right-0 flex flex-col py-6 px-8 gap-6"
            style={{ background: "#19171b", borderBottom: "1px solid #51080d44" }}
          >
            {["Work", "Skills", "Experience", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-widest uppercase"
                style={{ color: "#8C8683" }}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center pt-24 pb-20 px-8 md:px-16 overflow-hidden"
        style={{ background: "#19171b" }}
      >
        {/* Oversized background word */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="font-display text-[18vw] font-black leading-none tracking-tighter"
            style={{ color: "#75020f", opacity: 0.07, whiteSpace: "nowrap" }}
          >
            DEVELOPER
          </span>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center justify-between mb-10">
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "#75020f" }}>
                Web Developer
              </span>
              <span className="text-xs tracking-[0.2em] uppercase hidden md:block" style={{ color: "#8C8683" }}>
                Open to Freelance Work
              </span>
            </div>
            <div className="fade-up">
              <p className="text-sm mb-2" style={{ color: "#8C8683", fontFamily: "Outfit, sans-serif" }}>
                Hello, I'm
              </p>
              <h1
                className="font-display font-black leading-[0.9] mb-6"
                style={{ fontSize: "clamp(4rem, 10vw, 8rem)", color: "#EDE7E0", letterSpacing: "-0.01em" }}
              >
                Faiz<br />Khan
              </h1>
            </div>
            <div className="fade-up" style={{ transitionDelay: "0.1s" }}>
              <p
                className="text-lg mb-5 font-medium"
                style={{ color: "#EDE7E0", fontFamily: "Outfit, sans-serif" }}
              >
                Full Stack Web Developer
              </p>
              <p className="text-sm leading-relaxed max-w-md" style={{ color: "#8C8683", fontFamily: "Outfit, sans-serif" }}>
                I build websites and web apps from front end to back end. Currently working as a Full Stack Web Developer at Webixus, turning ideas into real functioning products. I care about clean code, fast load times, and interfaces that just work.
              </p>
            </div>

            {/* Stats */}
            <div className="fade-up mt-10 flex gap-8 flex-wrap" style={{ transitionDelay: "0.2s" }}>
              {[
                { val: "10+", label: "Months Hands-on Experience" },
                { val: "8+", label: "Projects Delivered" },
                { val: "Full Stack", label: "Skillset" },
              ].map((s) => (
                <div key={s.label} style={{ borderTop: "1px solid #51080d", paddingTop: "12px" }}>
                  <div className="font-display font-black text-3xl" style={{ color: "#EDE7E0" }}>
                    {s.val}
                  </div>
                  <div className="text-xs mt-1 max-w-[100px]" style={{ color: "#8C8683", fontFamily: "Outfit, sans-serif" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Portrait */}
          <div className="fade-up flex justify-center md:justify-end" style={{ transitionDelay: "0.15s" }}>
            <div
              className="relative"
              style={{ width: "clamp(260px, 40vw, 420px)", aspectRatio: "3/4" }}
            >
              {/* duotone overlay */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, #2b030733 0%, #75020f22 100%)",
                  mixBlendMode: "multiply",
                }}
              />
              <img
                src={portrait}
                alt="Faiz Khan"
                className="w-full h-full object-cover object-top"
                style={{
                  filter: "grayscale(20%) contrast(1.05)",
                  borderBottom: "3px solid #75020f",
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-32 z-10"
                style={{ background: "linear-gradient(to top, #19171b, transparent)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work" className="py-24 px-8 md:px-16" style={{ background: "#19171b" }}>
        <div className="max-w-7xl mx-auto">
          <div className="fade-up flex items-center gap-6 mb-16">
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "#75020f" }}>
              Selected Work
            </span>
            <div className="flex-1 h-px" style={{ background: "#51080d" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <div
                key={p.num}
                className="project-card group fade-up"
                style={{ transitionDelay: `${i * 0.1}s`, cursor: "none" }}
              >
                <div className="overflow-hidden mb-4" style={{ background: "#2b0307" }}>
                  <img
                    src={p.img}
                    alt={p.name}
                    className="thumb-img w-full h-52 object-cover"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs" style={{ color: "#8C8683", fontFamily: "Outfit, sans-serif" }}>
                      {p.num}
                    </span>
                    <h3
                      className="project-underline font-display font-bold text-xl mt-1"
                      style={{ color: "#EDE7E0" }}
                    >
                      {p.name}
                    </h3>
                    <span
                      className="text-xs tracking-widest uppercase mt-1 block"
                      style={{ color: "#8C8683" }}
                    >
                      {p.category}
                    </span>
                    <p className="text-xs mt-3 leading-relaxed" style={{ color: "#8C8683", fontFamily: "Outfit, sans-serif" }}>
                      {p.desc}
                    </p>
                  </div>
                  <span className="arrow-icon text-lg mt-1 ml-4" style={{ color: "#75020f" }}>
                    &#8599;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS & EDUCATION */}
      <section
        id="skills"
        className="py-24 px-8 md:px-16"
        style={{ background: "#19171b", borderTop: "1px solid #51080d22" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Education */}
          <div className="fade-up">
            <span className="text-xs tracking-[0.3em] uppercase block mb-10" style={{ color: "#75020f" }}>
              Education
            </span>
            <div className="flex flex-col gap-8">
              {[
                {
                  degree: "Diploma in Web Development",
                  inst: "Aptech Pakistan",
                  period: "2022 – 2024",
                },
                {
                  degree: "Intermediate, Computer Science",
                  inst: "Board of Secondary Education",
                  period: "2021 – 2024",
                },
              ].map((ed) => (
                <div key={ed.degree} style={{ borderLeft: "1px solid #75020f", paddingLeft: "16px" }}>
                  <div className="font-display font-bold text-xl" style={{ color: "#EDE7E0" }}>
                    {ed.degree}
                  </div>
                  <div className="text-sm mt-1" style={{ color: "#8C8683" }}>
                    {ed.inst}
                  </div>
                  <div className="text-xs mt-2 tracking-widest" style={{ color: "#8C8683" }}>
                    {ed.period}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="fade-up" style={{ transitionDelay: "0.1s" }}>
            <span className="text-xs tracking-[0.3em] uppercase block mb-10" style={{ color: "#75020f" }}>
              Skills
            </span>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((sk) => (
                <span
                  key={sk}
                  className="text-xs px-3 py-1.5 tracking-wide transition-colors duration-200"
                  style={{
                    border: "1px solid #51080d",
                    color: "#8C8683",
                    fontFamily: "Outfit, sans-serif",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#75020f";
                    e.currentTarget.style.color = "#EDE7E0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#51080d";
                    e.currentTarget.style.color = "#8C8683";
                  }}
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="py-24 px-8 md:px-16"
        style={{ background: "#19171b", borderTop: "1px solid #51080d22" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="fade-up flex items-center gap-6 mb-16">
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "#75020f" }}>
              Experience
            </span>
            <div className="flex-1 h-px" style={{ background: "#51080d" }} />
          </div>

          <div className="relative">
            {/* vertical line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
              style={{ background: "#51080d" }}
            />
            <div className="flex flex-col gap-14">
              {[
                {
                  role: "Full Stack Web Developer",
                  company: "Webixus",
                  period: "Jul 2026 – Present",
                  location: "Karachi",
                  current: true,
                },
                {
                  role: "Web Development Intern",
                  company: "AIMS Advertising",
                  period: "Oct 2025 – Dec 2025",
                  location: "Karachi",
                  current: false,
                },
              ].map((ex, i) => (
                <div key={i} className="fade-up md:pl-12 relative" style={{ transitionDelay: `${i * 0.1}s` }}>
                  {/* dot */}
                  <div
                    className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full hidden md:block"
                    style={{ background: ex.current ? "#75020f" : "#51080d" }}
                  />
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-display font-bold text-2xl" style={{ color: "#EDE7E0" }}>
                        {ex.role}
                      </h3>
                      <span className="text-sm" style={{ color: "#8C8683" }}>
                        {ex.company}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs tracking-widest" style={{ color: ex.current ? "#75020f" : "#8C8683" }}>
                        {ex.period}
                      </div>
                      <div className="text-xs mt-1" style={{ color: "#8C8683" }}>
                        {ex.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section
        className="py-24 px-8 md:px-16"
        style={{ background: "#2b0307" }}
      >
        <div className="max-w-7xl mx-auto fade-up">
          <blockquote
            className="font-display font-black text-right leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: "#EDE7E0",
              maxWidth: "700px",
              marginLeft: "auto",
            }}
          >
            "Code should work quietly. Design should not need an explanation."
          </blockquote>
          <p
            className="text-right mt-6 text-sm tracking-widest"
            style={{ color: "#75020f", fontFamily: "Outfit, sans-serif" }}
          >
            -- Faiz
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-24 px-8 md:px-16"
        style={{ background: "#19171b", borderTop: "1px solid #51080d44" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="fade-up mb-14">
            <h2
              className="font-display font-black leading-none"
              style={{ fontSize: "clamp(3rem, 9vw, 7rem)", color: "#EDE7E0" }}
            >
              LET'S WORK<br />TOGETHER
            </h2>
            <p className="mt-4 text-sm" style={{ color: "#8C8683", fontFamily: "Outfit, sans-serif" }}>
              Available for freelance projects and full-time roles.
            </p>
          </div>

          <div className="fade-up grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" style={{ transitionDelay: "0.1s" }}>
            {[
              {
                label: "Email",
                value: "aimsfaiz27@gmail.com",
                href: "mailto:aimsfaiz27@gmail.com",
              },
              {
                label: "WhatsApp",
                value: "+92 306 2573751",
                href: "https://wa.me/923062573751",
              },
              {
                label: "Location",
                value: "Karachi, Pakistan",
                href: null,
              },
              {
                label: "LinkedIn",
                value: "faiz-khan-877a1835b",
                href: "https://www.linkedin.com/in/faiz-khan-877a1835b",
              },
              {
                label: "GitHub",
                value: "github.com/faiz-khan",
                href: "https://github.com/faiz-khan",
              },
            ].map((c) => (
              <div
                key={c.label}
                className="p-5 transition-colors duration-200"
                style={{ border: "1px solid #51080d22", background: "#2b030711" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#75020f44")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#51080d22")}
              >
                <div className="text-xs tracking-widest uppercase mb-2" style={{ color: "#75020f" }}>
                  {c.label}
                </div>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-sm transition-colors duration-150"
                    style={{ color: "#8C8683", fontFamily: "Outfit, sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#EDE7E0")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#8C8683")}
                  >
                    {c.value}
                  </a>
                ) : (
                  <span className="text-sm" style={{ color: "#8C8683", fontFamily: "Outfit, sans-serif" }}>
                    {c.value}
                  </span>
                )}
              </div>
            ))}

            {/* Download CV */}
            <div
              className="p-5 flex items-center justify-between transition-colors duration-200"
              style={{ border: "1px solid #75020f", background: "transparent", cursor: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#75020f18")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div>
                <div className="text-xs tracking-widest uppercase mb-2" style={{ color: "#75020f" }}>
                  Resume
                </div>
                <a
                  href={cv}
                  download="Faiz-Khan-CV.pdf"
                  className="text-sm"
                  style={{ color: "#EDE7E0", fontFamily: "Outfit, sans-serif" }}
                >
                  Download CV
                </a>
              </div>
              <span style={{ color: "#75020f", fontSize: "1.2rem" }}>&#8599;</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-6 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid #51080d44" }}
      >
        <span className="font-display text-lg tracking-widest" style={{ color: "#EDE7E0" }}>
          FK
        </span>
        <span className="text-xs" style={{ color: "#8C8683", fontFamily: "Outfit, sans-serif" }}>
          Faiz Khan &copy; {new Date().getFullYear()}. All rights reserved.
        </span>
        <span className="text-xs" style={{ color: "#8C8683", fontFamily: "Outfit, sans-serif" }}>
          Karachi, Pakistan
        </span>
      </footer>
    </>
  );
}
