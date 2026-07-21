import React, { useEffect, useState } from "react";
import profilePic from "./assets/aboutme_profile.webp";
import {
  Facebook,
  Linkedin,
  Instagram,
  Mail,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import FadeInSection from "./components/FadeInSection";

// ---- Design tokens: single teal theme ----
const TEAL = "#34806D";        // primary background
const TEAL_DARK = "#256054";   // slightly darker teal for menu dropdown
const INK_GREEN = "#0E211D";   // dark green for footer background
const PAPER = "#FFFFFF";
const INK = "#1A1A1A";
const ROSE = "#E894A8";
const YELLOW = "#F2E9A8";
const TEXT_LIGHT = "#F6FBFA";
const TEXT_MUTED = "#CFE3DC";

const nav = ["About", "Experience", "Skills", "Projects", "Contact"];

const skills = [
  {
    title: "UI/UX Design",
    items: ["Figma", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "TailwindCSS", "JavaScript"],
  },
  {
    title: "Database",
    items: ["MySQL", "PostgreSQL", "SQL Server"],
  },
];

const projects = [
  {
    name: "Planti-Tao",
    tag: "Mobile App",
    tech: ["Figma", "UI Design", "Prototype"],
    copy:
      "A 15-screen mobile UI design for plant care and gardening — covering onboarding, plant tracking, and care reminders — built around a clean, nature-inspired interface that keeps day-to-day plant care simple.",
    link:
      "https://www.behance.net/gallery/179128031/Planti-Tao-Mobile-App-UI-Design",
    preview: "/images/planti_tao_banner.webp",
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
        background: `linear-gradient(180deg,
          #0E211D 0%,
          #173D30 15%,
          #1D4B41 28%,
          #256054 42%,
          #34806D 55%,
          #8FA79E 72%,
          #D6DEDA 86%,
          #F6FBFA 100%)`,
        color: TEXT_LIGHT,
        minHeight: "100vh",
      }}
      className="relative w-full overflow-hidden font-sans">

      {/* NAV */}
      <header
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-16 transition-all duration-300"
        style={scrolled ? {
          background: "rgba(37, 96, 84, 0.82)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(246, 251, 250, 0.18)",
          boxShadow: "0 8px 28px rgba(15, 53, 45, 0.16)",
        } : undefined}
      >
        <a
          href="#top"
          aria-label="Back to top"
          className="font-bold tracking-[0.25em] text-sm relative z-[60]"
          style={{ color: menuOpen ? TEXT_LIGHT : TEXT_LIGHT }}
        >
          JM.
        </a>

        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-[0.16em]" aria-label="Main navigation">
          {nav.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link"
              style={{ color: TEXT_LIGHT }}
            >
              {item}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          className="w-10 h-10 flex md:hidden items-center justify-center relative z-[60]"
          style={{ color: TEXT_LIGHT }}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <nav
          id="site-navigation"
          className="fixed inset-0 flex md:hidden flex-col items-center justify-center gap-5 transition-all duration-500 ease-in-out overflow-y-auto py-20"
          style={{
            background: INK_GREEN,
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
              className="text-2xl sm:text-3xl font-black uppercase tracking-wide transition-all duration-500"
              style={{
                color: TEXT_LIGHT,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(15px)",
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
              }}
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      <main>
      {/* HERO */}
      <FadeInSection>
      <section id="top" className="relative px-6 pb-20 pt-36 md:px-16 lg:px-24 xl:px-32 md:pb-24 md:pt-44 min-h-[90vh] flex flex-col justify-between overflow-hidden">
        <div className="flex-1 flex flex-col justify-center max-w-3xl">
          <p
            className="mb-3 uppercase tracking-[4px] text-sm md:text-base"
            style={{ color: TEXT_MUTED }}
          >
            Independent portfolio · 2026
          </p>

          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none"
            style={{
              fontFamily: "'TheQuicky', sans-serif",
              color: ROSE,
            }}
          >
            Joey Miral
          </h1>

          <p
            className="mt-6 max-w-xl text-2xl md:text-3xl font-bold leading-tight"
            style={{ color: TEXT_LIGHT }}
          >
            I turn complex problems into interfaces that feel simple.
          </p>

          <p
            className="mt-4 max-w-xl text-lg md:text-xl leading-relaxed"
            style={{ color: TEXT_MUTED }}
          >
            UI/UX designer crafting clear, user-centered interfaces — backed by
            frontend development skills to help ideas hold up in the real world.
          </p>

          <div className="flex gap-4 mt-8 flex-wrap">
            <a
              href="#projects"
              className="hero-primary px-7 py-3.5 rounded-full font-semibold text-base"
              style={{
                background: YELLOW,
                color: INK,
              }}
            >
              View Projects
            </a>
            <a
              href="/Joey_Miral_CV.pdf"
              download
              className="hero-secondary px-7 py-3.5 rounded-full border text-base"
              style={{
                borderColor: TEXT_LIGHT,
                color: TEXT_LIGHT,
              }}
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-10 mt-10 border-t" style={{ borderColor: "rgba(246,251,250,0.15)" }}>
          <span className="text-sm font-semibold" style={{ color: TEXT_LIGHT }}>UI/UX Design</span>
          <span className="text-sm font-semibold" style={{ color: TEXT_MUTED }}>Cum Laude · TUP</span>
          <span className="text-sm font-semibold" style={{ color: TEXT_MUTED }}>Figma & Design Systems</span>
          <span className="text-sm font-semibold" style={{ color: TEXT_MUTED }}>Metro Manila, PH</span>
        </div>
      </section>
      </FadeInSection>

      {/* Featured Projects */}
      <FadeInSection>
      <section className="px-6 md:px-16 py-24">

        <div className="mb-12">
          <p
            className="uppercase tracking-[4px]"
            style={{ color: YELLOW }}
          >
            Featured case study
          </p>

          <h2
            className="text-5xl font-black mt-2"
            style={{ color: TEXT_LIGHT }}
          >
            G-Active
          </h2>

          <p
            className="max-w-2xl mt-4"
            style={{ color: TEXT_MUTED }}
          >
            A cloud-based gym management system, designed and developed as my capstone project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="min-h-[280px] rounded-[30px] overflow-hidden relative flex flex-col justify-end">
            <img
              src="/images/banner_thumbnail.webp"
              alt="G-Active gym management system interface"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="relative p-8 pt-16"
              style={{
                background: "linear-gradient(180deg, rgba(37,96,84,0) 0%, rgba(37,96,84,0.85) 60%, rgba(37,96,84,0.95) 100%)",
              }}
            >
              <p className="text-sm uppercase tracking-[3px]" style={{ color: YELLOW }}>
                G-Active · 2024
              </p>
              <p className="mt-3 max-w-md text-lg leading-relaxed" style={{ color: TEXT_LIGHT }}>
                Turning fragmented client, membership, and schedule information into one focused workspace for gym teams.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="https://www.figma.com/community/file/1212404815375242369/gym-client-based-website-and-gym-management-system-ui-design"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold underline underline-offset-4 transition-opacity hover:opacity-75"
                  style={{ color: TEXT_LIGHT }}
                >
                  View G-Active Design in Figma
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
                <a
                  href="#contact"
                  className="font-semibold transition-opacity hover:opacity-75"
                  style={{ color: TEXT_MUTED }}
                >
                  Ask me about the project
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: YELLOW }}>My contribution</p>
                <p className="mt-3 leading-relaxed" style={{ color: TEXT_MUTED }}>
                  Project lead, UI/UX designer, and frontend developer—guiding the experience from system flow to interface implementation.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: YELLOW }}>Designed for</p>
                <p className="mt-3 leading-relaxed" style={{ color: TEXT_MUTED }}>
                  Designed for 3 distinct user roles — admin, staff, and member — each with a tailored dashboard for fast access to records, memberships, and operational data without added complexity.
                </p>
              </div>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.16em] mt-9" style={{ color: YELLOW }}>Built with</p>

            <div className="flex flex-wrap gap-3 mt-4">
              {["CodeIgniter", "AJAX", "ChartJS", "MySQL", "Figma"].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full"
                  style={{ border: `1px solid ${TEXT_LIGHT}` }}
                >
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
      <section id="about" className="px-6 md:px-16 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div className="flex justify-center order-2 md:order-1">
            <img
              src={profilePic}
              alt="Joey Miral"
              className="w-full max-w-[380px] aspect-[4/5] object-cover rounded-[28px]"
            />
          </div>

          <div className="order-1 md:order-2">
            <h2
              className="text-5xl font-black"
              style={{ color: TEXT_LIGHT }}
            >
              About Me
            </h2>

            <p
              className="mt-6 leading-relaxed"
              style={{ color: TEXT_MUTED }}
            >
              I'm Joey Miral, a Cum Laude BSIT graduate
              from TUP with experience in IT Operations,
              Java Development, Database Design, and UI/UX.
            </p>

            <p
              className="mt-4 leading-relaxed"
              style={{ color: TEXT_MUTED }}
            >
              Most recently, I supported mission-critical banking
              operations at Metrobank while continuing to build
              digital products and user-centered experiences.
            </p>

            <div className="mt-8 space-y-5 pt-6 border-t" style={{ borderColor: "rgba(246,251,250,0.15)" }}>
              <div>
                <p className="text-2xl font-bold" style={{ color: TEXT_LIGHT }}>BSIT, Cum Laude</p>
                <p className="mt-1" style={{ color: TEXT_MUTED }}>Technological University of the Philippines</p>
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: TEXT_LIGHT }}>UI/UX + Frontend</p>
                <p className="mt-1" style={{ color: TEXT_MUTED }}>Interface design grounded in systems thinking</p>
              </div>
            </div>
          </div>

        </div>
      </section>
      </FadeInSection>

      {/* BEYOND THE SCREEN */}
      <FadeInSection>
      <section className="px-6 md:px-16 py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/images/beyond-screen.webp"
            alt="Joey creating music in his home studio"
            loading="lazy"
            className="w-full aspect-[3/2] object-cover rounded-[28px]"
          />

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: YELLOW }}>
              Beyond the screen
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-black" style={{ color: TEXT_LIGHT }}>
              I create music, too.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed" style={{ color: TEXT_MUTED }}>
              Outside product and interface work, I create music. It is another space where I explore rhythm, emotion, and detail—ideas that also shape how I approach digital experiences.
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: ROSE }}>
              Creative practice · Music
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {musicLinks.map((platform) => (
                <a
                  key={platform.label}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:opacity-85"
                  style={{ borderColor: TEXT_LIGHT, color: TEXT_LIGHT }}
                >
                  Listen on {platform.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* EXPERIENCE */}      
      <FadeInSection>
      <section id="experience" className="px-6 md:px-16 py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: YELLOW }}>Selected experience</p>
        <h2
          className="text-5xl font-black mb-12"
          style={{ color: TEXT_LIGHT }}
        >
          Experience
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="border-t pt-5" style={{ borderColor: TEXT_MUTED }}>
            <h3 className="text-2xl font-bold">Metropolitan Bank & Trust Company</h3>
            <p style={{ color: TEXT_MUTED }}>Computer Operator • 2024 - June 2026</p>
          </div>

          <div className="border-t pt-5" style={{ borderColor: TEXT_MUTED }}>
            <h3 className="text-2xl font-bold">ScoutStaff Inc.</h3>
            <p style={{ color: TEXT_MUTED }}>Java Development Engineer • 2023 - 2024</p>
          </div>

          <div className="border-t pt-5" style={{ borderColor: TEXT_MUTED }}>
            <h3 className="text-2xl font-bold">4Gives Finance</h3>
            <p style={{ color: TEXT_MUTED }}>Database Designer Intern</p>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* SKILLS */}
      <FadeInSection>
      <section id="skills" className="px-6 md:px-16 pb-20">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: YELLOW }}>Capabilities</p>
        <h2 className="text-4xl md:text-5xl font-black uppercase" style={{ color: TEXT_LIGHT }}>
          Skills
        </h2>
        <p className="max-w-2xl mt-3 text-sm md:text-base" style={{ color: TEXT_MUTED }}>
          Three disciplines I move between depending on what a project needs —
          from the interface down to the schema underneath it.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mt-8">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="p-6 rounded-[28px]"
              style={{ border: `2px solid ${TEXT_LIGHT}` }}
            >
              <h3 className="text-2xl font-bold mb-5" style={{ color: TEXT_LIGHT }}>
                {skill.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-3 py-1.5 rounded-full"
                    style={{ border: `1px solid ${TEXT_MUTED}`, color: TEXT_MUTED }}
                  >
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
      <section id="projects" className="pb-4">
        <div className="px-6 md:px-16 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: YELLOW }}>Selected work · 2023—2026</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase" style={{ color: TEXT_LIGHT }}>
              Projects
            </h2>
          </div>
          <p className="text-sm md:text-base mt-2 opacity-70" style={{ color: TEXT_MUTED }}>
            UI design, product thinking, and frontend craft.
          </p>
        </div>
        <div className="relative">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-12 px-6 md:px-16">
            {projects.map((p) => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="h-full flex flex-col overflow-hidden rounded-[20px] bg-white group cursor-pointer transition-all duration-300 hover:-translate-y-2"
                style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
              >
                {p.preview ? (
                  <div className="overflow-hidden">
                    <img
                      src={p.preview}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-[260px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div
                    className="h-[260px] p-6 flex flex-col justify-between"
                    style={{ background: TEAL_DARK, color: TEXT_LIGHT }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: YELLOW }}>
                      Code project
                    </p>
                    <p className="max-w-[14rem] text-3xl font-black leading-tight">
                      Building the logic behind social experiences.
                    </p>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <span
                    className="inline-block text-xs font-semibold px-3 py-1 rounded-full w-fit"
                    style={{ background: YELLOW, color: INK }}
                  >
                    {p.tag}
                  </span>

                  <h3 className="text-2xl font-black mt-5" style={{ color: INK }}>
                    {p.name}
                  </h3>

                  {p.tech && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {p.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ background: "#F5F5F5", color: "#555" }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-sm leading-relaxed mt-4" style={{ color: "#555" }}>
                    {p.copy}
                  </p>

                  <div
                    className="mt-auto pt-6 flex items-center gap-2 font-semibold transition-all duration-300 group-hover:gap-3"
                    style={{ color: TEAL }}
                  >
                    {p.cta || "View Project"}
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* CONTACT */}
      <FadeInSection>
      <section id="contact" className="px-6 md:px-16 py-20">
        <h2 className="text-4xl md:text-5xl font-black uppercase mb-10" style={{ color: INK }}>
          Contact
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="text-sm font-semibold" style={{ color: INK }}>
              Name
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full mt-1 px-4 py-3 text-sm outline-none rounded-lg"
                style={{ background: "transparent", border: `2px solid ${INK}`, color: INK }}
                placeholder="Your name"
              />
            </label>
            <label className="text-sm font-semibold" style={{ color: INK }}>
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full mt-1 px-4 py-3 text-sm outline-none rounded-lg"
                style={{ background: "transparent", border: `2px solid ${INK}`, color: INK }}
                placeholder="you@email.com"
              />
            </label>
            <label className="text-sm font-semibold" style={{ color: INK }}>
              Message
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full mt-1 px-4 py-3 text-sm outline-none resize-none rounded-lg"
                style={{ background: "transparent", border: `2px solid ${INK}`, color: INK }}
                placeholder="Let's talk about..."
              />
            </label>
            <button
              type="submit"
              disabled={sending}
              className="mt-2 py-3 font-bold text-sm uppercase tracking-wide rounded-full transition-opacity hover:opacity-85"
              style={{ background: TEAL, color: TEXT_LIGHT, opacity: sending ? 0.6 : 1 }}
            >
              {sending ? "Sending..." : sent ? "Message sent!" : error ? "Failed — try again" : "Submit"}
            </button>
            <p className="min-h-6 text-sm" aria-live="polite" style={{ color: error ? "#A32D2D" : INK }}>
              {sent && "Thanks — your message has been sent."}
              {error && "Your message could not be sent. Please email me directly instead."}
            </p>
          </form>

          <div className="flex flex-col gap-5">
            <iframe
              src="/Joey_Miral_CV.pdf"
              title="Joey Miral CV"
              className="flex-1 w-full min-h-[220px] rounded-lg"
              style={{ border: `2px solid ${INK}` }}
            />
            <a
                href="/Joey_Miral_CV.pdf"
                download="Joey_Miral_CV.pdf"
                className="py-3 rounded-full text-sm font-semibold text-center border-2 transition-colors hover:opacity-85"
                style={{ borderColor: TEAL, color: TEAL }}
              >
              Download CV
            </a>
          </div>
        </div>
      </section>
      </FadeInSection>
      </main>

      {/* FOOTER */}
      <footer
        className="px-6 md:px-16 py-14 rounded-t-[40px] flex flex-col items-center gap-6"
        style={{ background: INK_GREEN, color: TEXT_LIGHT }}
      >
        <div className="flex items-center gap-5">
          {[
            { Icon: Facebook, href: "https://www.facebook.com/miraljoey/" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/joey-miral-06a89724a/" },
            { Icon: Instagram, href: "https://www.instagram.com/yeoj.mp3/" },
            { Icon: Mail, href: "mailto:miraljoey291@gmail.com" },
          ].map(({ Icon, href, label }, i) => (
            <a
              key={i}
              href={href}
              aria-label={label}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-75 transition-opacity"
              style={{ background: TEXT_LIGHT }}
            >
              <Icon size={18} color={INK_GREEN} aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="text-xs opacity-60 tracking-wide">
          Joey Miral · miraljoey291@gmail.com · +63 947 803 7720
        </p>
      </footer>
    </div>
  );
}