import React, { useEffect, useState } from "react";
import profilePic from "./assets/aboutme.webp";
import profilePicSmall from "./assets/aboutme.webp"; // add this
import logoLight from "./assets/joey-logo.svg"; // dark marks — use on light backgrounds
import logoDark from "./assets/joey-logo-dark.svg"; // white marks — use on dark backgrounds
import profilePicPixelated from "./assets/aboutme_profile_pixelated.webp"; // default state — swaps to the real photo on hover
import profilePicPixelatedSmall from "./assets/aboutme_profile_pixelated-480w.webp";
import {
  Facebook,
  Linkedin,
  Instagram,
  Mail,
  ArrowUpRight,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import FadeInSection from "./components/FadeInSection";

const FONT_DISPLAY = "'Space Grotesk', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

// ---- Theme tokens: same structural system, two surfaces ----
const THEMES = {
  dark: {
    base: "#0A0A0C",
    surface: "#131417",
    line: "#26282D",
    lineSoft: "#1B1C20",
    textPrimary: "#E7E8EA",
    textSecondary: "#8A8D93",
    signal: "#5EEAD4",
    signalRgb: "94,234,212",
    signalContrast: "#0A0A0C", // text color to use on top of a signal-filled surface
    overlayRgb: "10,10,12",
  },
  light: {
    base: "#FAFAF8",
    surface: "#FFFFFF",
    line: "#DCDCD8",
    lineSoft: "#EDEDEA",
    textPrimary: "#121212",
    textSecondary: "#63666B",
    signal: "#0E7C74", // deeper teal so it holds contrast on white
    signalRgb: "14,124,116",
    signalContrast: "#FFFFFF", // text color to use on top of a signal-filled surface
    overlayRgb: "250,250,248",
  },
};

const nav = ["About", "Experience", "Skills", "Projects", "Contact"];

const skills = [
  {
    title: "UI/UX Design",
    items: ["Figma", "FigJam", "Adobe XD", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    title: "Programming Languages & Frameworks",
    items: ["React", "Next.js", "TailwindCSS", "HTML", "CSS", "JavaScript", "Python", "Java-Spring Boot"],
  },
  {
    title: "Web Performance & SEO",
    items: ["On-Page SEO", "Google Analytics (GA4)", "Google Tag Manager", "Lighthouse Audits", "Accessibility (WCAG)"],
  },
  {
    title: "Database",
    items: ["MySQL", "PostgreSQL", "SQL Server"],
  },
  {
    title: "Operating Systems",
    items: ["Windows", "macOS", "Linux"],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS", "Google Cloud", "Azure"],
  },
  {
    title: "Tools & Collaboration",
    items: ["Git", "GitHub", "GitHub Actions", "GitLab", "Slack", "Claude Code"],
  },
  {
    title: "IT Operations & Compliance",
    items: ["Control-M", "Mochasoft TN3270", "WinSCP", "Putty", "Filezilla", "Finastra Fusion OPICS", "FIS", "Oracle Datawarehouse"],
  },
];

const projects = [
    {
    name: "G-Active",
    tag: "Capstone Project",
    link: "https://www.figma.com/community/file/1212404815375242369/gym-client-based-website-and-gym-management-system-ui-design",
    cta: "View Design in Figma",
    preview: "/images/banner_thumbnail-480w.webp",
    tech: ["CodeIgniter", "AJAX", "ChartJS", "MySQL", "Figma"],
    copy: "A cloud-based gym management system with three role-based dashboards (admin, staff, and member) for fast access to records, memberships, and operational data. I led the project and handled the UI/UX design and frontend development.",
  },
  {
    name: "Planti-Tao",
    tag: "Mobile App",
    tech: ["Figma", "UI Design", "Prototype"],
    copy:
      "A 15-screen mobile UI design for plant care and gardening — covering onboarding, plant tracking, and care reminders — built around a clean, nature-inspired interface that keeps day-to-day plant care simple.",
    link:
      "https://www.behance.net/gallery/179128031/Planti-Tao-Mobile-App-UI-Design",
    preview: "/images/planti_tao_banner.webp",
    previewSmall: "/images/planti_tao_banner-480w.webp",
  },
  {
    name: "CM Shop",
    tag: "E-Commerce",
    tech: ["Figma", "E-Commerce", "Responsive Design"],
    copy:
      "An e-commerce UI design featuring a redesigned checkout flow, built to showcase products with a modern, minimal storefront layout.",
    link:
      "https://www.behance.net/gallery/177505945/UI-Design-CM-Shop-E-Commerce-Website",
    preview: "/images/cmshop_banner.webp",
    previewSmall: "/images/cmshop_banner-480w.webp",
  },
  {
    name: "Social Platform Backend API",
    tag: "Backend Development",
    tech: ["Backend API", "Personal Project", "GitLab"],
    copy:
      "A personal backend project for a social-platform clone, created to practice building the server-side foundation behind user-driven web experiences.",
    link: "https://gitlab.com/users/xiaoyi09/projects",
    cta: "View Source",
  },
];

const musicLinks = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/6JfjpVf4qMV9Mnri2HzL4p?si=jXsR3-pfQj2CzE13Kctizg",
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/ph/artist/joey/1831241307",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@joeyofficial09",
  },
];

export default function JoeyPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem("jm-theme") || "dark";
  });

  const isDark = theme === "dark";
  const T = THEMES[theme];

  // small local helpers that read the active theme --------------------
  const SectionTag = ({ index, label }) => (
    <div
      className="flex items-center gap-3 mb-6"
      style={{ fontFamily: FONT_MONO, fontSize: "12px", color: T.textSecondary }}
    >
      <span style={{ width: 18, height: 1, background: T.line, display: "inline-block" }} />
      <span style={{ color: T.signal, fontWeight: 500 }}>{index}</span>
      <span>/ {label}</span>
    </div>
  );

  const BracketFrame = ({ children, className = "" }) => (
    <div className={`relative ${className}`} style={{ border: `1px dashed ${T.line}` }}>
      <span
        aria-hidden="true"
        style={{
          position: "absolute", top: -1, left: -1, width: 16, height: 16,
          borderTop: `1px solid ${T.signal}`, borderLeft: `1px solid ${T.signal}`,
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute", bottom: -1, right: -1, width: 16, height: 16,
          borderBottom: `1px solid ${T.signal}`, borderRight: `1px solid ${T.signal}`,
        }}
      />
      {children}
    </div>
  );

  // Load the two typefaces the redesign relies on.
  // Prefer moving this <link> into index.html <head> instead — this is a
  // convenience fallback so the component works standalone.
  useEffect(() => {
    const id = "jm-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("jm-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const updateNavigation = () => setScrolled(window.scrollY > 24);
    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });
    return () => window.removeEventListener("scroll", updateNavigation);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 3000);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      style={{
        background: T.base,
        color: T.textPrimary,
        minHeight: "100vh",
        fontFamily: FONT_DISPLAY,
        transition: "background-color 300ms ease, color 300ms ease",
      }}
      className="relative w-full overflow-hidden"
    >
      {/* faint background grid, fixed behind everything */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          opacity: isDark ? 0.5 : 0.7,
          backgroundImage: `linear-gradient(${T.lineSoft} 1px, transparent 1px), linear-gradient(90deg, ${T.lineSoft} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          transition: "background-image 300ms ease",
        }}
      />

      {/* NAV */}
      <header
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-16 transition-all duration-300"
        style={
          scrolled
            ? {
                background: isDark ? "rgba(10, 10, 12, 0.85)" : "rgba(250, 250, 248, 0.85)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderBottom: `1px solid ${T.line}`,
              }
            : { borderBottom: "1px solid transparent" }
        }
      >
        <a
          href="#top"
          aria-label="Back to top"
          className="relative z-[60] flex items-center gap-2.5"
        >
          <img
            src={isDark ? logoDark : logoLight}
            alt="Joey Miral logo"
            className="w-7 h-7"
          />
          <span style={{ fontFamily: FONT_MONO, fontSize: 14, letterSpacing: 0.5, color: T.textPrimary }}>
            JOEY<span style={{ color: T.signal }}>.</span>MIRAL
          </span>
        </a>

        <div className="flex items-center gap-6">
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
            style={{ fontFamily: FONT_MONO, fontSize: 13 }}
          >
            {nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link transition-colors duration-200"
                style={{ color: T.textSecondary }}
                onMouseEnter={(e) => (e.currentTarget.style.color = T.textPrimary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = T.textSecondary)}
              >
                {item.toLowerCase()}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="w-9 h-9 flex items-center justify-center transition-colors duration-200 relative z-[60]"
            style={{ border: `1px solid ${T.line}`, color: T.textPrimary }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.signal)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.line)}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            className="w-10 h-10 flex md:hidden items-center justify-center relative z-[60]"
            style={{ color: T.textPrimary }}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        <nav
          id="site-navigation"
          className="fixed inset-0 flex md:hidden flex-col items-center justify-center gap-5 transition-all duration-500 ease-in-out overflow-y-auto py-20"
          style={{
            background: T.base,
            opacity: menuOpen ? 1 : 0,
            visibility: menuOpen ? "visible" : "hidden",
            transform: menuOpen ? "translateY(0)" : "translateY(-20px)",
            height: "100dvh",
          }}
        >
          {nav.map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-2xl sm:text-3xl transition-all duration-500"
              style={{
                fontFamily: FONT_MONO,
                color: T.textPrimary,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(15px)",
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
              }}
            >
              {item.toLowerCase()}
            </a>
          ))}
        </nav>
      </header>

      <main className="relative" style={{ zIndex: 1 }}>
        {/* HERO */}
        <FadeInSection>
          <section
            id="top"
            className="relative px-6 pb-20 pt-36 md:px-16 lg:px-24 xl:px-32 md:pb-24 md:pt-44 min-h-[90vh] flex flex-col justify-between"
            style={{ borderBottom: `1px solid ${T.line}` }}
          >
            <div className="flex-1 flex flex-col justify-center max-w-3xl">
              <SectionTag index="00" label="HERO" />

              <h1
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] font-semibold"
                style={{ color: T.textPrimary, letterSpacing: "-2px" }}
              >
                Joey
                <br />
                Miral
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    width: "0.35em",
                    height: "0.7em",
                    background: T.signal,
                    marginLeft: 10,
                    animation: "jm-blink 1s step-end infinite",
                    verticalAlign: "-0.05em",
                  }}
                />
              </h1>

              <p className="mt-6 max-w-xl text-2xl md:text-3xl font-semibold leading-tight" style={{ color: T.textPrimary }}>
                I turn complex problems into interfaces that feel simple.
              </p>

              <p className="mt-4 max-w-xl text-lg md:text-xl leading-relaxed" style={{ color: T.textSecondary }}>
                UI/UX designer crafting clear, user-centered interfaces — backed by
                Full-Stack development skills to help ideas hold up in the real world.
              </p>

              <div className="flex gap-4 mt-8 flex-wrap" style={{ fontFamily: FONT_MONO, fontSize: 13 }}>
                <a
                  href="#projects"
                  className="px-7 py-3.5 transition-colors duration-200"
                  style={{ background: T.textPrimary, color: T.base, border: `1px solid ${T.textPrimary}` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = T.signal;
                    e.currentTarget.style.borderColor = T.signal;
                    e.currentTarget.style.color = isDark ? T.base : "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = T.textPrimary;
                    e.currentTarget.style.borderColor = T.textPrimary;
                    e.currentTarget.style.color = T.base;
                  }}
                >
                  View Projects
                </a>
                <a
                  href="/Joey_Miral_CV.pdf"
                  download
                  className="px-7 py-3.5"
                  style={{ border: `1px solid ${T.line}`, color: T.textPrimary }}
                >
                  Download CV
                </a>
              </div>
            </div>

            <div
              className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-10 mt-10"
              style={{ borderTop: `1px solid ${T.line}`, fontFamily: FONT_MONO, fontSize: 13 }}
            >
              <span style={{ color: T.textPrimary }}>UI/UX Design</span>
              <span style={{ color: T.textPrimary }}>Full-Stack Development</span>
              <span style={{ color: T.textSecondary }}>Cum Laude · TUP</span>
              <span style={{ color: T.textSecondary }}>Figma & Design Systems</span>
              <span style={{ color: T.textSecondary }}>Metro Manila, PH</span>
            </div>
          </section>
        </FadeInSection>

        {/* Featured Project — Calendar Agent */}
        <FadeInSection>
          <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-24" style={{ borderBottom: `1px solid ${T.line}` }}>
            <SectionTag index="02" label="CASE STUDY" />

            <h2 className="text-5xl font-semibold" style={{ color: T.textPrimary }}>
              Calendar Agent
            </h2>

            <p className="max-w-2xl mt-4" style={{ color: T.textSecondary }}>
              A full-stack AI assistant that turns plain-language requests into Google Calendar events.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-10">
              <BracketFrame className="flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src="/images/calendar_agent_thumbnail.webp"
                    alt="Calendar Agent chat listing tomorrow's events from Google Calendar"
                    width={436}
                    height={304}
                    loading="lazy"
                    className="w-full h-auto opacity-90"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(180deg, rgba(${T.overlayRgb},0) 40%, rgba(${T.overlayRgb},0.7) 75%, rgba(${T.overlayRgb},0.96) 100%)`,
                    }}
                  />
                </div>
                <div className="px-8 pb-8 -mt-6 relative">
                  <p style={{ fontFamily: FONT_MONO, fontSize: 12, color: T.signal }}>Calendar Agent · 2026</p>
                  <p className="mt-3 max-w-md text-lg leading-relaxed" style={{ color: T.textPrimary }}>
                    Describe a meeting in one sentence. The agent works out the date and books it.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ fontFamily: FONT_MONO, fontSize: 13 }}>
                    <a
                      href="https://github.com/jMiral09/calendar-agent"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 underline underline-offset-4 transition-opacity hover:opacity-75"
                      style={{ color: T.textPrimary }}
                    >
                      View on GitHub
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                    <a href="#contact" className="transition-opacity hover:opacity-75" style={{ color: T.textSecondary }}>
                      Ask me about the project
                    </a>
                  </div>
                </div>
              </BracketFrame>

              <div>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <p style={{ fontFamily: FONT_MONO, fontSize: 12, color: T.signal }}>My contribution</p>
                    <p className="mt-3 leading-relaxed" style={{ color: T.textSecondary }}>
                      Solo project. I designed the architecture and built the chat interface, the API layer, and the calendar agent with its tools.
                    </p>
                  </div>
                  <div>
                    <p style={{ fontFamily: FONT_MONO, fontSize: 12, color: T.signal }}>How it works</p>
                    <p className="mt-3 leading-relaxed" style={{ color: T.textSecondary }}>
                      A React chat sends the request through a Next.js API route to a FastAPI backend, where an LLM agent uses calendar tools to create the event in Google Calendar and reply with a confirmation.
                    </p>
                  </div>
                </div>

                <p style={{ fontFamily: FONT_MONO, fontSize: 12, color: T.signal, marginTop: 36 }}>Built with</p>

                <div className="flex flex-wrap gap-3 mt-4" style={{ fontFamily: FONT_MONO, fontSize: 12 }}>
                  {["Next.js", "TypeScript", "FastAPI", "LangChain", "Groq", "Google Calendar API"].map((tech) => (
                    <span key={tech} className="px-3 py-1.5" style={{ border: `1px solid ${T.line}`, color: T.textSecondary }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* ABOUT */}
        <FadeInSection>
          <section id="about" className="px-6 md:px-16 lg:px-24 xl:px-32 py-24" style={{ borderBottom: `1px solid ${T.line}` }}>
            <SectionTag index="02" label="ABOUT" />
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center order-2 md:order-1">
                <BracketFrame className="w-full max-w-[380px] group cursor-pointer">
                  <div className="relative w-full aspect-[4/5] overflow-hidden">
                    {/* Default: pixelated portrait, generated at runtime from the real photo */}
                    {profilePicPixelated && (
                      <img
                        src={profilePicPixelated}
                        alt="Joey Miral, pixelated portrait"
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out opacity-100 group-hover:opacity-0"
                      />
                    )}
                    {/* Hover (or fallback while the canvas is still processing): real photo */}
                    <img
                      src={profilePic}
                      srcSet={`${profilePicSmall} 380w, ${profilePic} 760w`}
                      sizes="(max-width: 768px) 300px, 380px"
                      alt="Joey Miral"
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out opacity-0 group-hover:opacity-100"
                      style={profilePicPixelated ? undefined : { opacity: 1 }}
                    />
                  </div>
                </BracketFrame>
              </div>

              <div className="order-1 md:order-2">
                <h2 className="text-5xl font-semibold" style={{ color: T.textPrimary }}>
                  About Me
                </h2>

                <p className="mt-6 leading-relaxed" style={{ color: T.textSecondary }}>
                  I'm Joey Miral, a Cum Laude BSIT graduate from TUP with experience in
                  IT Operations, Java Development, Database Design, and UI/UX.
                </p>

                <p className="mt-4 leading-relaxed" style={{ color: T.textSecondary }}>
                  Most recently, I supported mission-critical banking operations at
                  Metrobank while continuing to build digital products and
                  user-centered experiences.
                </p>

                <p className="mt-4 leading-relaxed" style={{ color: T.textSecondary }}>
                  Currently, I'm pursuing AI and Machine Learning to expand my skill set 
                  and explore new possibilities in the field of technology.
                </p>

                <div className="mt-8 space-y-5 pt-6" style={{ borderTop: `1px solid ${T.line}` }}>
                  <div>
                    <p className="text-2xl font-semibold" style={{ color: T.textPrimary }}>BSIT, Cum Laude</p>
                    <p className="mt-1" style={{ color: T.textSecondary }}>Technological University of the Philippines</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold" style={{ color: T.textPrimary }}>UI/UX + FullStack Development</p>
                    <p className="mt-1" style={{ color: T.textSecondary }}>Interface design grounded in systems thinking</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* BEYOND THE SCREEN 
        <FadeInSection>
          <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-24" style={{ borderBottom: `1px solid ${T.line}` }}>
            <SectionTag index="03" label="BEYOND THE SCREEN" />
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <BracketFrame>
                <img
                  src="/images/beyond-screen.webp"
                  srcSet="/images/beyond-screen-480w.webp 480w, /images/beyond-screen.webp 900w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="Joey creating music in his home studio"
                  loading="lazy"
                  className="w-full aspect-[3/2] object-cover"
                />
              </BracketFrame>

              <div>
                <h2 className="text-4xl md:text-5xl font-semibold" style={{ color: T.textPrimary }}>
                  I create music, too.
                </h2>
                <p className="mt-6 max-w-xl leading-relaxed" style={{ color: T.textSecondary }}>
                  Outside product and interface work, I create music. It is another
                  space where I explore rhythm, emotion, and detail—ideas that also
                  shape how I approach digital experiences.
                </p>
                <div className="mt-6 flex flex-wrap gap-3" style={{ fontFamily: FONT_MONO, fontSize: 13 }}>
                  {musicLinks.map((platform) => (
                    <a
                      key={platform.label}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 transition-colors duration-200"
                      style={{ border: `1px solid ${T.line}`, color: T.textPrimary }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.signal)}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.line)}
                    >
                      {platform.label}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>
        */}

        {/* EXPERIENCE */}
        <FadeInSection>
          <section id="experience" className="px-6 md:px-16 lg:px-24 xl:px-32 py-24" style={{ borderBottom: `1px solid ${T.line}` }}>
            <SectionTag index="04" label="EXPERIENCE" />
            <h2 className="text-5xl font-semibold mb-12" style={{ color: T.textPrimary }}>
              Experience
            </h2>

            <div style={{ borderTop: `1px solid ${T.line}` }}>
              {[
                {
                  org: "Metropolitan Bank & Trust Company",
                  role: "Computer Operator — Data & IT Operations",
                  period: "July 2024 – June 2026 | On-site",
                  blurb:
                    "Monitored live batch jobs and transaction pipelines under strict SLAs, tracing failures to root cause and running performance/latency testing to flag issues for the dev team.",
                },
                {
                  org: "ScoutStaff Inc.",
                  role: "Java Development Engineer",
                  period: "October 2023 – April 2024 | On-site",
                  blurb:
                    "Built and maintained RESTful APIs with Spring Boot, working with stakeholders on requirements and testing via Postman and Docker in Agile sprints.",
                },
                {
                  org: "4Gives Finance",
                  role: "Database Designer Intern (Data Team)",
                  period: "March 2023 – June 2023 | Remote",
                  blurb:
                    "Designed a normalized Sales Report database from scratch for a fintech project, documenting the schema via ER diagrams for the dev team.",
                },
              ].map((job, i) => (
                <div
                  key={job.org}
                  className="grid md:grid-cols-[60px_1fr_auto] items-start gap-4 py-6"
                  style={{ borderBottom: `1px solid ${T.line}` }}
                >
                  <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: T.textSecondary }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold" style={{ color: T.textPrimary }}>{job.org}</h3>
                    <p className="mt-0.5" style={{ color: T.textSecondary }}>{job.role}</p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: T.textSecondary }}>
                      {job.blurb}
                    </p>
                  </div>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: T.textSecondary }}>{job.period}</span>
                </div>
              ))}
            </div>
          </section>
        </FadeInSection>

        {/* SKILLS */}
        <FadeInSection>
          <section id="skills" className="px-6 md:px-16 lg:px-24 xl:px-32 py-24" style={{ borderBottom: `1px solid ${T.line}` }}>
            <SectionTag index="05" label="SKILLS" />
            <h2 className="text-4xl md:text-5xl font-semibold" style={{ color: T.textPrimary }}>
              Skills
            </h2>
            <p className="max-w-2xl mt-3 text-sm md:text-base" style={{ color: T.textSecondary }}>
              The disciplines I move between depending on what a project needs —
              from the interface down to the infrastructure underneath it.
            </p>

            <div style={{ borderTop: `1px solid ${T.line}`, marginTop: 40 }}>
              {skills.map((skill, i) => (
                <div
                  key={skill.title}
                  className="grid md:grid-cols-[60px_260px_1fr] gap-6 py-7 items-start"
                  style={{ borderBottom: `1px solid ${T.line}` }}
                >
                  <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: T.textSecondary }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold" style={{ color: T.textPrimary }}>
                    {skill.title}
                  </h3>
                  <div className="flex flex-wrap gap-2" style={{ fontFamily: FONT_MONO, fontSize: 12 }}>
                    {skill.items.map((item) => (
                      <span key={item} className="px-3 py-1.5" style={{ border: `1px solid ${T.line}`, color: T.textSecondary }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeInSection>

        {/* PROJECTS */}
        <FadeInSection>
          <section id="projects" className="px-6 md:px-16 lg:px-24 xl:px-32 py-24" style={{ borderBottom: `1px solid ${T.line}` }}>
            <SectionTag index="06" label="PROJECTS" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <h2 className="text-4xl md:text-5xl font-semibold" style={{ color: T.textPrimary }}>
                Projects
              </h2>
              <p className="text-sm md:text-base" style={{ color: T.textSecondary }}>
                UI design, product thinking, and development craft.
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
              {projects.map((p) => (
                <a
                  key={p.name}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-full flex flex-col overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{ border: `1px solid ${T.line}`, background: T.surface }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = T.signal;
                    e.currentTarget.style.boxShadow = `0 16px 32px -12px rgba(${T.signalRgb}, 0.35)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = T.line;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {p.preview ? (
                    <div className="overflow-hidden relative" style={{ borderBottom: `1px solid ${T.line}` }}>
                      <img
                        src={p.preview}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ background: `rgba(${T.signalRgb}, 0.12)` }}
                      />
                    </div>
                  ) : (
                    <div
                      className="h-[220px] p-6 flex flex-col justify-between transition-colors duration-300"
                      style={{ borderBottom: `1px solid ${T.line}`, color: T.textPrimary }}
                    >
                      <p style={{ fontFamily: FONT_MONO, fontSize: 12, color: T.signal }}>Code project</p>
                      <p className="max-w-[14rem] text-2xl font-semibold leading-tight">
                        Building the logic behind social experiences.
                      </p>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    <span
                      className="inline-block w-fit px-3 py-1 transition-colors duration-300"
                      style={{ fontFamily: FONT_MONO, fontSize: 11, border: `1px solid ${T.signal}`, color: T.signal }}
                    >
                      {p.tag}
                    </span>

                    <h3
                      className="text-xl font-semibold mt-5 transition-colors duration-300 group-hover:underline"
                      style={{ color: T.textPrimary, textDecorationColor: T.signal, textUnderlineOffset: "4px" }}
                    >
                      {p.name}
                    </h3>

                    {p.tech && (
                      <div className="flex flex-wrap gap-2 mt-4" style={{ fontFamily: FONT_MONO, fontSize: 11 }}>
                        {p.tech.map((tech) => (
                          <span key={tech} className="px-2.5 py-1" style={{ border: `1px solid ${T.line}`, color: T.textSecondary }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-sm leading-relaxed mt-4" style={{ color: T.textSecondary }}>
                      {p.copy}
                    </p>

                    <div
                      className="mt-auto pt-6 flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
                      style={{ fontFamily: FONT_MONO, fontSize: 13, color: T.textPrimary }}
                    >
                      <span className="transition-colors duration-300 group-hover:text-[var(--jm-signal)]" style={{ "--jm-signal": T.signal }}>
                        {p.cta || "View Project"}
                      </span>
                      <ArrowUpRight size={16} className="transition-colors duration-300 group-hover:text-[var(--jm-signal)]" style={{ "--jm-signal": T.signal }} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </FadeInSection>

        {/* CONTACT */}
        <FadeInSection>
          <section id="contact" className="px-6 md:px-16 lg:px-24 xl:px-32 py-24">
            <SectionTag index="07" label="CONTACT" />
            <h2 className="text-4xl md:text-5xl font-semibold mb-10" style={{ color: T.textPrimary }}>
              Contact
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <label style={{ fontFamily: FONT_MONO, fontSize: 12, color: T.textSecondary }}>
                  Name
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full mt-2 py-2 text-base outline-none bg-transparent"
                    style={{ borderBottom: `1px solid ${T.line}`, color: T.textPrimary, fontFamily: FONT_DISPLAY }}
                    placeholder="Your name"
                    onFocus={(e) => (e.currentTarget.style.borderColor = T.signal)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = T.line)}
                  />
                </label>
                <label style={{ fontFamily: FONT_MONO, fontSize: 12, color: T.textSecondary }}>
                  Email
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full mt-2 py-2 text-base outline-none bg-transparent"
                    style={{ borderBottom: `1px solid ${T.line}`, color: T.textPrimary, fontFamily: FONT_DISPLAY }}
                    placeholder="you@email.com"
                    onFocus={(e) => (e.currentTarget.style.borderColor = T.signal)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = T.line)}
                  />
                </label>
                <label style={{ fontFamily: FONT_MONO, fontSize: 12, color: T.textSecondary }}>
                  Message
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full mt-2 py-2 text-base outline-none resize-none bg-transparent"
                    style={{ borderBottom: `1px solid ${T.line}`, color: T.textPrimary, fontFamily: FONT_DISPLAY }}
                    placeholder="Let's talk about..."
                    onFocus={(e) => (e.currentTarget.style.borderColor = T.signal)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = T.line)}
                  />
                </label>
                <button
                  type="submit"
                  disabled={sending}
                  className="mt-2 py-3.5 transition-colors duration-200"
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 13,
                    border: `1px solid ${sent ? T.signal : T.textPrimary}`,
                    color: sent ? T.signal : T.textPrimary,
                    background: "transparent",
                    opacity: sending ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (sending) return;
                    e.currentTarget.style.background = T.signal;
                    e.currentTarget.style.borderColor = T.signal;
                    e.currentTarget.style.color = T.signalContrast;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = sent ? T.signal : T.textPrimary;
                    e.currentTarget.style.color = sent ? T.signal : T.textPrimary;
                  }}
                >
                  {sending ? "Sending..." : sent ? "Message sent!" : error ? "Failed — try again" : "Submit"}
                </button>
                <p className="min-h-6 text-sm" aria-live="polite" style={{ color: error ? "#E5484D" : T.textSecondary }}>
                  {sent && "Thanks — your message has been sent."}
                  {error && "Your message could not be sent. Please email me directly instead."}
                </p>
              </form>

              <div className="flex flex-col gap-5">
                <BracketFrame className="flex-1 min-h-[220px] overflow-hidden">
                  <iframe src="/Joey_Miral_CV.pdf" title="Joey Miral CV" className="w-full h-full min-h-[220px]" />
                </BracketFrame>
                <a
                  href="/Joey_Miral_CV.pdf"
                  download="Joey_Miral_CV.pdf"
                  className="py-3 text-center transition-colors duration-200"
                  style={{ fontFamily: FONT_MONO, fontSize: 13, border: `1px solid ${T.line}`, color: T.textPrimary }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.signal)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.line)}
                >
                  Download CV
                </a>

                <div style={{ border: `1px dashed ${T.line}`, padding: 24, fontFamily: FONT_MONO, fontSize: 13, color: T.textSecondary }}>
                  <div className="flex justify-between py-2" style={{ borderBottom: `1px solid ${T.lineSoft}` }}>
                    <span>EMAIL</span>
                    <span style={{ color: T.textPrimary }}>miraljoey291@gmail.com</span>
                  </div>
                  <div className="flex justify-between py-2" style={{ borderBottom: `1px solid ${T.lineSoft}` }}>
                    <span>PHONE</span>
                    <span style={{ color: T.textPrimary }}>+63 947 803 7720</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>LOCATION</span>
                    <span style={{ color: T.textPrimary }}>Pasay City, PH</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>
      </main>

      {/* FOOTER */}
      <footer
        className="relative px-6 md:px-16 py-14 flex flex-col items-center gap-6"
        style={{ background: T.surface, borderTop: `1px solid ${T.line}`, zIndex: 1, transition: "background-color 300ms ease" }}
      >
        <div className="flex items-center gap-4">
          {[
            { Icon: Facebook, href: "https://www.facebook.com/miraljoey/" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/joey-miral-06a89724a/" },
            { Icon: Instagram, href: "https://www.instagram.com/yeoj.mp3/" },
            { Icon: Mail, href: "mailto:miraljoey291@gmail.com" },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="w-10 h-10 flex items-center justify-center transition-colors duration-200"
              style={{ border: `1px solid ${T.line}`, color: T.textSecondary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = T.signal;
                e.currentTarget.style.color = T.signal;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = T.line;
                e.currentTarget.style.color = T.textSecondary;
              }}
            >
              <Icon size={17} aria-hidden="true" />
            </a>
          ))}
        </div>
        <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.textSecondary, letterSpacing: 0.5 }}>
          Joey Miral · miraljoey291@gmail.com · +63 947 803 7720
        </p>
      </footer>

      <style>{`
        @keyframes jm-blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}