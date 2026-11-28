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

const FONT_DISPLAY = "'Onest', 'Arial', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

// ---- Theme tokens: same structural system, two surfaces ----
const THEMES = {
  dark: {
    base: "#090A0F",
    surface: "#11131A",
    line: "#343641",
    lineSoft: "#1C1E27",
    textPrimary: "#F5F4F0",
    textSecondary: "#AAA9B1",
    signal: "#44D7C4",
    signalRgb: "68,215,196",
    signalContrast: "#071B1C",
    overlayRgb: "7,27,28",
  },
  light: {
    base: "#F7F7F2",
    surface: "#FFFFFF",
    line: "#D7D7CF",
    lineSoft: "#ECECE5",
    textPrimary: "#14211F",
    textSecondary: "#68736F",
    signal: "#18A999",
    signalRgb: "24,169,153",
    signalContrast: "#FFFFFF",
    overlayRgb: "239,251,248",
  },
};

const nav = ["About", "Experience", "Skills", "Projects", "Contact"];

const skills = [
  {
    title: "Product & Interface",
    items: ["Figma", "FigJam", "Adobe XD", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    title: "Web Development",
    items: ["React", "Next.js", "TailwindCSS", "HTML", "CSS", "JavaScript", "Python", "Java-Spring Boot"],
  },
  {
    title: "Web Quality & Analytics",
    items: ["On-Page SEO", "Google Analytics (GA4)", "Google Tag Manager", "Lighthouse Audits", "Accessibility (WCAG)"],
  },
  {
    title: "Data & Cloud",
    items: ["MySQL", "PostgreSQL", "SQL Server", "AWS", "Google Cloud", "Azure"],
  },
  {
    title: "Platforms & Operations",
    items: ["Windows", "macOS", "Linux", "Control-M", "Mochasoft TN3270", "WinSCP", "Putty", "Filezilla", "Finastra Fusion OPICS", "FIS", "Oracle Datawarehouse"],
  },
  {
    title: "Tools & Collaboration",
    items: ["Git", "GitHub", "GitHub Actions", "GitLab", "Slack", "Claude Code"],
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

const projectColors = [
  { background: "#2B50D9", foreground: "#FFFFFF", accent: "#B7F34A" },
  { background: "#151619", foreground: "#F7F6F1", accent: "#44D7C4" },
  { background: "#F4D158", foreground: "#171717", accent: "#FF4D98" },
  { background: "#F34D91", foreground: "#171217", accent: "#FFE36A" },
];

const featuredProjects = [
  {
    name: "Calendar Agent",
    category: "AI / FULL-STACK",
    image: "/images/calendar_agent_thumbnail.webp",
    alt: "Calendar Agent chat listing tomorrow's events from Google Calendar",
    summary: "A full-stack AI assistant that turns plain-language requests into Google Calendar events.",
    contribution: "Solo project. I designed the architecture and built the chat interface, API layer, and calendar agent with its tools.",
    process: "A React chat sends requests through a Next.js API route to a FastAPI backend. An LLM agent uses calendar tools to create events and reply with a confirmation.",
    tech: ["Next.js", "TypeScript", "FastAPI", "LangChain", "Groq", "Google Calendar API"],
    link: "https://github.com/jMiral09/calendar-agent",
    cta: "View on GitHub",
  },
  {
    name: "Papertrail",
    category: "AI / DOCUMENT WORKSPACE",
    image: "/images/papertrail-document-search.jpg",
    alt: "Papertrail document assistant interface with a PDF library and AI chat",
    summary: "A local-first RAG workspace for uploading PDFs and asking questions grounded in their contents.",
    contribution: "Solo project. I built the Next.js chat interface, FastAPI API, durable PDF ingestion workflow, vector search, and source-display flow.",
    process: "FastAPI validates and stores PDFs, then queues Inngest ingestion. Ollama embeddings are written to Qdrant; questions retrieve matching passages before a local model generates an answer.",
    tech: ["Next.js", "TypeScript", "Python", "FastAPI", "Inngest", "Ollama", "Qdrant"],
    link: "https://github.com/jMiral09/rag-production-app",
    cta: "View on GitHub",
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
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactStep, setContactStep] = useState(1);
  const [contactStatus, setContactStatus] = useState("idle");
  const [contactError, setContactError] = useState("");
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return window.localStorage.getItem("jm-theme-v2") || "light";
  });

  const isDark = theme === "dark";
  const T = THEMES[theme];

  const updateContactField = (field, value) => {
    setContactForm((current) => ({ ...current, [field]: value }));
    setContactStatus("idle");
    setContactError("");
  };

  const continueContactForm = () => {
    if (!contactForm.message.trim()) {
      setContactError("Add a message before continuing.");
      return;
    }

    setContactError("");
    setContactStep(2);
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setContactStatus("sending");
    setContactError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name.trim(),
          email: contactForm.email.trim(),
          message: contactForm.message.trim(),
        }),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error("The email service returned an unreadable response.");
      }

      if (!response.ok) {
        throw new Error(result.error || "Could not send your message.");
      }
      if (result.success !== true) {
        throw new Error("The email service did not confirm delivery.");
      }

      setContactStatus("success");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setContactStatus("error");
      setContactError(
        error instanceof Error
          ? error.message
          : "Could not send your message. Please try again or email me directly."
      );
    }
  };

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

  // Load the typefaces the redesign relies on.
  // Prefer moving this <link> into index.html <head> instead — this is a
  // convenience fallback so the component works standalone.
  useEffect(() => {
    const id = "jm-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800;900&family=Permanent+Marker&family=Press+Start+2P&family=JetBrains+Mono:wght@400;500;700&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("jm-theme-v2", theme);
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

  return (
    <div
      data-theme={theme}
      className="jm-portfolio relative w-full"
      style={{
        color: T.textPrimary,
        minHeight: "100vh",
        fontFamily: FONT_DISPLAY,
        transition: "background-color 300ms ease, color 300ms ease",
      }}
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
            <div className="jm-hero-content">
              <div className="jm-hero-stickers" aria-hidden="true">
                <span>MADE THINGS</span>
                <span>SWEAT THE DETAILS</span>
              </div>
              <span className="jm-hero-intro">my name is</span>
              <h1 className="jm-hero-title" style={{ color: T.textPrimary }}>
                Joey <span>Miral</span>
                <span className="jm-hero-cursor" aria-hidden="true" />
              </h1>
              <div className="jm-hero-status" style={{ fontFamily: FONT_MONO }}>
                <span aria-hidden="true" />
                OPEN TO NEW WORK AND GOOD PROBLEMS
              </div>
              <p className="jm-hero-statement" style={{ color: T.textPrimary }}>
                AI Engineering · ML &amp; Data Science
              </p>
              <p className="jm-hero-description" style={{ color: T.textSecondary }}>
                Currently pursuing AI development through hands-on projects and learning,
                with a UI/UX development background focused on making intelligent products intuitive.
              </p>
              <div className="jm-hero-actions" style={{ fontFamily: FONT_MONO, fontSize: 13 }}>
                <a href="#contact" className="jm-hero-contact">
                  <span aria-hidden="true">↗</span> Contact Me
                </a>
                <a href="#projects" className="jm-hero-projects">View Projects</a>
                <a href="/Joey_Miral_AI_Application_Developer.pdf" download className="jm-hero-cv">Download CV</a>
              </div>
            </div>

            <div
              className="jm-hero-meta flex flex-wrap items-center gap-x-8 gap-y-3 pt-10 mt-10"
              style={{ borderTop: `1px solid ${T.line}`, fontFamily: FONT_MONO, fontSize: 13 }}
            >
              <span style={{ color: T.textPrimary }}>AI Engineering</span>
              <span style={{ color: T.textPrimary }}>ML &amp; Data Science</span>
              <span style={{ color: T.textPrimary }}>UI/UX Development</span>
              <span style={{ color: T.textSecondary }}>Cum Laude · TUP</span>
              <span style={{ color: T.textSecondary }}>Figma & Design Systems</span>
              <span style={{ color: T.textSecondary }}>Metro Manila, PH</span>
            </div>
          </section>
        </FadeInSection>

        <div className="jm-ticker" aria-hidden="true">
          <div className="jm-ticker-track">
            {[0, 1].map((group) => (
              <div className="jm-ticker-group" key={group}>
                <span>AI Engineering</span><b>✦</b>
                <span>ML &amp; Data Science</span><b>✦</b>
                <span>UI/UX Development</span><b>✦</b>
                <span>Creative Technology</span><b>✦</b>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURED WORK */}
        <FadeInSection>
          <section className="jm-featured-section px-6 md:px-16 lg:px-24 xl:px-32 py-24" style={{ borderBottom: `1px solid ${T.line}` }}>
            <div className="jm-featured-heading">
              <span className="jm-handwritten">a few things I made</span>
              <h2 style={{ color: T.textPrimary }}>Featured Works</h2>
              <p style={{ color: T.textSecondary }}>Design, code, and ideas made tangible.</p>
            </div>

            <div className="jm-featured-grid">
              {featuredProjects.map((project, index) => (
                <article className="jm-featured-card" key={project.name} style={{ background: T.surface, borderColor: T.line }}>
                  <div className="jm-featured-tab" style={{ background: T.lineSoft, color: T.textPrimary }}>
                    <span>✦ PROJECT {String(index + 1).padStart(2, "0")}</span>
                    <span>{project.category}</span>
                  </div>

                  <div className="jm-featured-image">
                    <img
                      src={project.image}
                      alt={project.alt}
                      loading="lazy"
                    />
                  </div>

                  <div className="jm-featured-info">
                    <span className="jm-featured-category" style={{ color: T.signal }}>{project.category}</span>
                    <h3 style={{ color: T.textPrimary }}>{project.name}</h3>
                    <p style={{ color: T.textSecondary }}>{project.summary}</p>

                    <div className="jm-featured-tech">
                      {project.tech.map((tech) => (
                        <span key={tech} style={{ borderColor: T.line, color: T.textSecondary }}>{tech}</span>
                      ))}
                    </div>

                    <details className="jm-featured-details" style={{ borderColor: T.line }}>
                      <summary style={{ color: T.textPrimary }}>Behind the build</summary>
                      <div>
                        <p><strong>My contribution</strong> {project.contribution}</p>
                        <p><strong>How it works</strong> {project.process}</p>
                      </div>
                    </details>

                    <div className="jm-featured-links">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: T.textPrimary }}>
                        {project.cta} <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                      <a href="#contact" style={{ color: T.textSecondary }}>Ask me about it</a>
                    </div>
                  </div>
                </article>
              ))}
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
                  Currently, I'm pursuing AI development with a focus on AI Engineering,
                  Machine Learning, and Data Science through hands-on projects and continued learning.
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
              Field Notes
            </h2>

            <ol
              className="jm-experience-list"
              style={{ "--jm-accent": T.signal, "--jm-experience-line": T.line }}
            >
              {[
                {
                  org: "Metropolitan Bank & Trust Company",
                  role: "Computer Operator — Data & IT Operations",
                  period: "July 2024 – June 2026",
                  setting: "On-site",
                  blurb:
                    "Monitored live batch jobs and transaction pipelines under strict SLAs, tracing failures to root cause and running performance/latency testing to flag issues for the dev team.",
                },
                {
                  org: "ScoutStaff Inc.",
                  role: "Java Development Engineer",
                  period: "October 2023 – April 2024",
                  setting: "On-site",
                  blurb:
                    "Built and maintained RESTful APIs with Spring Boot, working with stakeholders on requirements and testing via Postman and Docker in Agile sprints.",
                },
                {
                  org: "4Gives Finance",
                  role: "Database Designer Intern (Data Team)",
                  period: "March 2023 – June 2023",
                  setting: "Remote",
                  blurb:
                    "Designed a normalized Sales Report database from scratch for a fintech project, documenting the schema via ER diagrams for the dev team.",
                },
              ].map((job, i) => (
                <li className="jm-experience-item" key={job.org}>
                  <span
                    className="jm-experience-index"
                    aria-hidden="true"
                    style={{ background: T.signal, color: T.signalContrast }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <article
                    className="jm-experience-card"
                    style={{ background: T.surface, borderColor: T.line }}
                  >
                    <div className="jm-experience-meta" style={{ color: T.textSecondary }}>
                      <span>{job.period}</span>
                      <span className="jm-experience-setting" style={{ borderColor: T.line }}>
                        {job.setting}
                      </span>
                    </div>
                    <h3 style={{ color: T.textPrimary }}>{job.org}</h3>
                    <p className="jm-experience-role" style={{ color: T.signal }}>{job.role}</p>
                    <p className="jm-experience-description" style={{ color: T.textSecondary }}>
                      {job.blurb}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </section>
        </FadeInSection>

        {/* SKILLS */}
        <FadeInSection>
          <section id="skills" className="px-6 md:px-16 lg:px-24 xl:px-32 py-24" style={{ borderBottom: `1px solid ${T.line}` }}>
            <SectionTag index="05" label="SKILLS" />
            <h2 className="text-4xl md:text-5xl font-semibold" style={{ color: T.textPrimary }}>
              The Toolbox
            </h2>
            <p className="max-w-2xl mt-3 text-sm md:text-base" style={{ color: T.textSecondary }}>
              A flexible mix of design, development, and systems skills I bring to a project.
            </p>

            <div className="jm-skills-grid">
              {skills.map((skill, i) => (
                <article
                  key={skill.title}
                  className="jm-skill-card"
                  style={{ background: T.surface, borderColor: T.line }}
                >
                  <div className="jm-skill-card-heading">
                    <span style={{ color: T.signal, fontFamily: FONT_MONO, fontSize: 12 }}>
                      / {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ color: T.textSecondary, fontFamily: FONT_MONO, fontSize: 10 }}>
                      TOOLKIT
                    </span>
                  </div>
                  <h3 style={{ color: T.textPrimary }}>{skill.title}</h3>
                  <div className="jm-skill-chips">
                    {skill.items.map((item) => (
                      <span key={item} style={{ borderColor: T.line, color: T.textSecondary }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </FadeInSection>

        {/* PROJECTS */}
        <FadeInSection>
          <section id="projects" className="px-6 md:px-16 lg:px-24 xl:px-32 py-24" style={{ borderBottom: `1px solid ${T.line}` }}>
            <SectionTag index="06" label="PROJECTS" />
            <div className="jm-projects-heading">
              <div>
                <span className="jm-handwritten">open my project folder ↘</span>
                <h2 style={{ color: T.textPrimary }}>Featured<br />Projects</h2>
              </div>
              <div className="jm-directory-meta" style={{ color: T.textSecondary }}>
                <span>ROOT / WORKS</span>
                <span>{String(projects.length).padStart(2, "0")} PROJECT FILES</span>
              </div>
            </div>

            <ul className="jm-project-directory">
              {projects.map((p, i) => {
                const palette = projectColors[i % projectColors.length];
                return (
                  <li
                    key={p.name}
                    className="jm-project-file"
                    style={{ top: "140px", zIndex: i + 1 }}
                  >
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="jm-project-panel group"
                      style={{
                        "--project-bg": palette.background,
                        "--project-foreground": palette.foreground,
                        "--project-accent": palette.accent,
                      }}
                    >
                      <span
                        className="jm-project-tab"
                        style={{ left: `${(i * 80) / projects.length}%` }}
                      >
                        <span>✦ PROJECT {String(i + 1).padStart(2, "0")}</span>
                      </span>

                      <div className="jm-project-copy">
                        <span className="jm-project-kicker">FILE {String(i + 1).padStart(2, "0")} / {p.tag}</span>
                        <h3>{p.name}</h3>
                        <p>{p.copy}</p>
                        {p.tech && (
                          <div className="jm-project-tech">
                            {p.tech.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}
                          </div>
                        )}
                        <span className="jm-project-cta">
                          {p.cta || "View Project"} <ArrowUpRight size={17} aria-hidden="true" />
                        </span>
                      </div>

                      <div className="jm-project-preview">
                        {p.preview ? (
                          <img
                            src={p.preview}
                            srcSet={p.previewSmall ? `${p.previewSmall} 480w, ${p.preview} 900w` : undefined}
                            sizes="(max-width: 767px) 100vw, 52vw"
                            alt={`${p.name} project preview`}
                            loading="lazy"
                          />
                        ) : (
                          <div className="jm-project-code-art">
                            <span>CODE / API</span>
                            <strong>{"{ }"}</strong>
                            <span>BUILDING THE LOGIC<br />BEHIND SOCIAL EXPERIENCES</span>
                          </div>
                        )}
                        <span className="jm-project-preview-label">OPEN FILE ↗</span>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        </FadeInSection>

        {/* CONTACT */}
        <FadeInSection>
          <section id="contact" className="jm-contact-section px-6 md:px-16 lg:px-24 xl:px-32 py-24">
            <div className="jm-contact-heading">
              <span className="jm-handwritten">say hi</span>
              <div className="jm-contact-title-frame" style={{ borderColor: T.textPrimary }}>
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <h2>Contact</h2>
              </div>
            </div>

            <div className="jm-contact-scene">
              <figure className="jm-contact-polaroid jm-contact-polaroid-left">
                <img
                  src="/images/contact-field.jpg"
                  alt="A person standing in a sunlit field"
                  loading="lazy"
                />
                <figcaption>random shot</figcaption>
              </figure>

              <div className="jm-contact-center">
                <form className="jm-contact-form" onSubmit={handleContactSubmit}>
                  <p className="jm-contact-form-intro">
                    Got a project, a hard problem, or just want to say hi? Send it over. I read every message.
                  </p>

                  {contactStep === 1 ? (
                    <>
                      <label className="jm-contact-field">
                        <span>MESSAGE</span>
                        <textarea
                          required
                          maxLength={5000}
                          rows={3}
                          value={contactForm.message}
                          onChange={(event) => updateContactField("message", event.target.value)}
                          placeholder="Tell me what you have in mind..."
                        />
                      </label>
                      <div className="jm-contact-form-actions jm-contact-form-actions-next">
                        <button className="jm-contact-next" type="button" onClick={continueContactForm}>
                          NEXT (1/2) <ArrowUpRight size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <label className="jm-contact-field">
                        <span>NAME</span>
                        <input
                          required
                          maxLength={100}
                          autoComplete="name"
                          value={contactForm.name}
                          onChange={(event) => updateContactField("name", event.target.value)}
                          placeholder="Your name"
                        />
                      </label>
                      <label className="jm-contact-field">
                        <span>EMAIL</span>
                        <input
                          required
                          type="email"
                          maxLength={254}
                          autoComplete="email"
                          value={contactForm.email}
                          onChange={(event) => updateContactField("email", event.target.value)}
                          placeholder="you@example.com"
                        />
                      </label>
                      <div className="jm-contact-form-actions">
                        <button
                          className="jm-contact-back"
                          type="button"
                          aria-label="Back to message"
                          onClick={() => {
                            setContactStep(1);
                            setContactStatus("idle");
                            setContactError("");
                          }}
                        >
                          ←
                        </button>
                        <button
                          className="jm-contact-send"
                          type="submit"
                          disabled={contactStatus === "sending" || contactStatus === "success"}
                        >
                          {contactStatus === "sending"
                            ? "SENDING..."
                            : contactStatus === "success"
                              ? "SENT ✓"
                              : "SEND (2/2)"}
                        </button>
                      </div>
                    </>
                  )}

                  {contactError && <p className="jm-contact-feedback jm-contact-error" role="alert">{contactError}</p>}
                  {contactStatus === "success" && (
                    <p className="jm-contact-feedback jm-contact-success" role="status">
                      Message sent — thanks! I&apos;ll be in touch soon.
                    </p>
                  )}
                </form>

                <div className="jm-contact-followup">
                  <span className="jm-handwritten">↗ Open to new work and good problems</span>
                  <a
                    className="jm-contact-email-link"
                    href="mailto:miraljoey291@gmail.com?subject=Let%27s%20work%20together"
                  >
                    miraljoey291@gmail.com
                  </a>
                  <div className="jm-contact-socials">
                    {[
                      { label: "LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com/in/joey-miral-06a89724a/" },
                      { label: "Instagram", Icon: Instagram, href: "https://www.instagram.com/yeoj.mp3/" },
                      { label: "Facebook", Icon: Facebook, href: "https://www.facebook.com/miraljoey/" },
                    ].map(({ label, Icon, href }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                        <Icon size={17} aria-hidden="true" />
                        <span>{label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <figure className="jm-contact-polaroid jm-contact-polaroid-right">
                <img
                  src="/images/contact-setup.jpg"
                  alt="A dimly lit desk setup with a music player, speakers, and orange ambient lighting"
                  loading="lazy"
                />
                <figcaption>late night setup</figcaption>
              </figure>
            </div>
          </section>
        </FadeInSection>
      </main>

      {/* FOOTER */}
      <footer
        className="jm-footer"
        style={{ background: T.surface, borderColor: T.line, zIndex: 1 }}
      >
        <div className="jm-footer-main">
          <a className="jm-footer-brand" href="#top" aria-label="Joey Miral, back to top">
            <span className="jm-footer-name" style={{ color: T.textPrimary }}>JOEY MIRAL</span>
            <span className="jm-footer-role" style={{ color: T.textSecondary }}>
              AI DEVELOPER <b style={{ color: T.signal }}>+</b> UI/UX DEV
            </span>
          </a>

          <div className="jm-footer-links">
            <nav className="jm-footer-nav" aria-label="Footer navigation">
              {["About", "Projects", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} style={{ color: T.textPrimary }}>
                  {item}
                </a>
              ))}
            </nav>

            <div className="jm-footer-socials">
              {[
                { label: "Facebook", Icon: Facebook, href: "https://www.facebook.com/miraljoey/", color: "#315FDB" },
                { label: "LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com/in/joey-miral-06a89724a/", color: "#F2C94C" },
                { label: "Instagram", Icon: Instagram, href: "https://www.instagram.com/yeoj.mp3/", color: "#F34D91" },
                { label: "Email", Icon: Mail, href: "mailto:miraljoey291@gmail.com", color: "#44D7C4" },
              ].map(({ label, Icon, href, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="jm-footer-social"
                  style={{ "--social-color": color }}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="jm-footer-bottom" style={{ borderColor: T.line }}>
          <p style={{ color: T.textSecondary }}>
            © {new Date().getFullYear()} Joey Miral · miraljoey291@gmail.com · +63 947 803 7720
          </p>
          <span className="jm-footer-made" style={{ background: T.lineSoft, color: T.textPrimary }}>
            ✦ MADE WITH INTENTION
          </span>
        </div>
      </footer>

      <style>{`
        @keyframes jm-blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}