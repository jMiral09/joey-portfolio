import React, { useState } from "react";
import profilePic from "./assets/aboutme_profile.jpg";
import {
  Facebook,
  Linkedin,
  Globe2,
  Mail,
  ArrowUpRight,
  Sun,
  Moon,
  EyeOff,
} from "lucide-react";

// ---- Design tokens (from the Figma wireframe) ----
const LIME = "#D6FE4E";
const INK = "#111111";
const INK_SOFT = "#3A3A3A";
const PAPER = "#FFFFFF";
const PAPER_DARK = "#141414";
const CARD_DARK = "#1D1D1D";
const GRAY = "#E4E4E4";

const nav = ["About", "Skills", "Projects", "Contact"];

const skills = [
  {
    title: "UI / UX Designing",
    copy: "Wireframes, prototypes and interfaces designed in Figma — from a gym-management app to product mockups, built around how people actually use them.",
  },
  {
    title: "Software Development",
    copy: "Java backend work with Spring Boot and REST APIs, plus hands-on frontend builds — connecting a clean interface to logic that actually holds up.",
  },
  {
    title: "Database Designing",
    copy: "Schema design and SQL for MySQL and PostgreSQL, with production ETL/batch-processing experience keeping real financial data moving.",
  },
];

const projects = [
  {
    name: "Planti-Tao",
    tag: "Mobile App",
    copy: "A mobile UI design for plant care and gardening, guiding users through plant tracking and care reminders with a clean, nature-inspired interface.",
    link: "https://www.behance.net/gallery/179128031/Planti-Tao-Mobile-App-UI-Design",
    preview: "public/images/planti_tao_banner.png",
  },
  {
    name: "Gym Client Management",
    tag: "Web App",
    copy: "A desktop and mobile UI system for gym staff to manage client records, memberships, and schedules in one streamlined dashboard.",
    link: "https://www.behance.net/gallery/177503849/UI-Design-Gym-Client-Page-for-Desktop-and-Mobile-View",
    preview: "public/images/gymmanagement_banner.jpg",
  },
  {
    name: "CM Shop",
    tag: "E-Commerce",
    copy: "An e-commerce website UI design focused on smooth browsing and checkout, built to showcase products with a modern, minimal storefront layout.",
    link: "https://www.behance.net/gallery/177505945/UI-Design-CM-Shop-E-Commerce-Website",
    preview: "public/images/cmshop_banner.png",
  },
];

export default function JoeyPortfolio() {
  const [dark, setDark] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const bg = dark ? PAPER_DARK : PAPER;
  const text = dark ? PAPER : INK;
  const card = dark ? CARD_DARK : PAPER;
  const border = dark ? "#3A3A3A" : INK;
  const placeholderBg = dark ? "#2A2A2A" : GRAY;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const [hovered, setHovered] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <div
      style={{ background: bg, color: text, minHeight: "100vh" }}
      className="w-full font-sans transition-colors duration-300"
    >
      {/* NAV */}
      <header className="flex items-center justify-between px-6 md:px-16 py-6">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 flex items-center justify-center font-black text-lg"
            style={{ border: `2px solid ${text}` }}
          >
            J
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
          {nav.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:opacity-60 transition-opacity"
            >
              {item}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setDark(!dark)}
          aria-label="Toggle dark mode"
          className="w-14 h-8 rounded-full flex items-center px-1 transition-colors"
          style={{
            background: dark ? "#2A2A2A" : "#EDEDED",
            border: `1px solid ${border}`,
            justifyContent: dark ? "flex-end" : "flex-start",
          }}
        >
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: LIME }}
          >
            {dark ? (
              <Moon size={13} color={INK} />
            ) : (
              <Sun size={13} color={INK} />
            )}
          </span>
        </button>
      </header>

      {/* HERO */}
      <section className="px-6 md:px-16 pt-10 md:pt-16 pb-16">
        <div
          className="inline-block px-5 py-2 rounded-full font-bold text-sm md:text-base mb-6"
          style={{ background: text, color: bg }}
        >
          Hi! My name is
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none uppercase">
          Joey Miral
        </h1>

        <p className="mt-6 max-w-xl text-sm md:text-base" style={{ color: dark ? "#B5B5B5" : INK_SOFT }}>
          Cum Laude BS Information Technology graduate from TUP, building at the
          intersection of clean interfaces, solid backend logic, and well-structured data.
        </p>

        <div className="flex flex-wrap items-center gap-6 md:gap-10 mt-10 md:mt-16">
          <span
            className="text-2xl md:text-4xl font-black italic uppercase"
            style={{
              color: "transparent",
              WebkitTextStroke: `1.5px ${LIME}`,
            }}
          >
            UI/UX Designer
          </span>
          <span
            className="text-2xl md:text-4xl font-black italic uppercase"
            style={{
              color: "transparent",
              WebkitTextStroke: `1.5px ${LIME}`,
            }}
          >
            Software Developer
          </span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-6 md:px-16 pb-20">
        <div
          className="grid md:grid-cols-[280px_1fr] gap-0"
          style={{ border: `2px solid ${border}` }}
        >
          <div className="p-6 md:border-r-2" style={{ borderColor: border }}>
            <h2 className="text-3xl font-black uppercase">
              About<span style={{ color: LIME, WebkitTextStroke: `1px ${border}` }}>me</span>
            </h2>
            <div className="w-16 h-0.5 my-4" style={{ background: text }} />
            <div
              className="w-full aspect-square flex items-center justify-center text-xs uppercase tracking-widest font-semibold"
              style={{ background: placeholderBg, color: dark ? "#888" : "#999" }}
            >
              <img src={profilePic} alt="Joey Miral" className="w-full aspect-square object-cover" style={{ border: `1px solid ${border}` }}/>
            </div>
          </div>
          <div className="p-6 md:p-10 flex flex-col justify-center gap-4 text-sm md:text-base leading-relaxed">
            <p>
              I'm a recent Cum Laude graduate (GWA 1.497) from the Technological
              University of the Philippines, based in Metro Manila. My background
              spans IT operations and ETL/batch processing at Metrobank, Java
              backend development with Spring Boot and REST APIs at ScoutStaff
              Inc., and database design at 4Gives Finance.
            </p>
            <p>
              Alongside the technical work, I designed a full cloud-based Gym
              Management System as my capstone — my way into UI/UX. Outside of
              tech, I write and produce music as an independent artist and lead
              the San Gregorio Boys Choir as Choirmaster, so structure and
              craft show up in everything I build, on screen or off.
            </p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="px-6 md:px-16 pb-20">
        <h2 className="text-4xl md:text-5xl font-black uppercase">Skills</h2>
        <p
          className="max-w-2xl mt-3 text-sm md:text-base"
          style={{ color: dark ? "#8FA6D6" : "#3B5BA5" }}
        >
          Three disciplines I move between depending on what a project needs —
          from the interface down to the schema underneath it.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mt-8">
          {skills.map((s) => (
            <div
              key={s.title}
              className="p-6 flex flex-col justify-between min-h-[220px]"
              style={{ border: `2px solid ${border}`, borderRadius: "0 24px 0 24px" }}
            >
              <p className="text-sm leading-relaxed opacity-80">{s.copy}</p>
              <h3 className="text-xl md:text-2xl font-black mt-6">{s.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="pb-4">
        <div className="text-center px-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase">Projects</h2>
          <p className="text-sm md:text-base mt-2 opacity-70">
            UI Designs | Capstone | Behance
          </p>
        </div>
        <div className="relative">
          <div
            className="grid md:grid-cols-3 mt-10"
            style={{ borderTop: `2px solid ${border}`, borderBottom: `2px solid ${border}` }}
          >
            {projects.map((p, i) => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(p.name)}
                onMouseLeave={() => setHovered(null)}
                onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                className="p-8 flex flex-col justify-between min-h-[280px] group"
                style={{
                  borderRight: i < 2 ? `2px solid ${border}` : "none",
                  borderTop: i > 0 ? `2px solid ${border}` : "none",
                }}
              >
                <div className="flex justify-between items-start">
                  <span
                    className="text-xs font-bold uppercase tracking-wide px-2 py-1"
                    style={{ border: `1px solid ${border}`, opacity: 0.7 }}
                  >
                    {p.tag}
                  </span>
                  <EyeOff size={18} opacity={0.5} />
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase mt-8">{p.name}</h3>
                  <p className="text-sm mt-3 opacity-80 leading-relaxed">{p.copy}</p>
                </div>
                <ArrowUpRight
                  size={22}
                  className="mt-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            ))}
          </div>

          {hovered && (
            <img
              src={projects.find((p) => p.name === hovered)?.preview}
              alt={hovered}
              className="fixed pointer-events-none rounded-lg shadow-2xl z-50 w-64 h-40 object-cover"
              style={{
                top: mousePos.y + 20,
                left: mousePos.x + 20,
              }}
            />
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 md:px-16 py-20">
        <h2 className="text-4xl md:text-5xl font-black uppercase mb-10">Contact</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="text-sm font-semibold">
              Name
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full mt-1 px-4 py-3 text-sm outline-none"
                style={{ background: "transparent", border: `2px solid ${border}`, color: text }}
                placeholder="Your name"
              />
            </label>
            <label className="text-sm font-semibold">
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full mt-1 px-4 py-3 text-sm outline-none"
                style={{ background: "transparent", border: `2px solid ${border}`, color: text }}
                placeholder="you@email.com"
              />
            </label>
            <label className="text-sm font-semibold">
              Message
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full mt-1 px-4 py-3 text-sm outline-none resize-none"
                style={{ background: "transparent", border: `2px solid ${border}`, color: text }}
                placeholder="Let's talk about..."
              />
            </label>
            <button
              type="submit"
              className="mt-2 py-3 font-bold text-sm uppercase tracking-wide transition-opacity hover:opacity-85"
              style={{ background: text, color: bg }}
            >
              {sent ? "Message sent!" : "Submit"}
            </button>
          </form>

          <div className="flex flex-col gap-5">
            <iframe src="/JoeyMiral_Resume.pdf" title="Joey Miral Resume" className="flex-1 w-full min-h-[220px]" style={{ border: `2px solid ${border}` }} />
              <a href="/JoeyMiral_Resume.pdf" download="Joey_Miral_Resume.pdf" className="py-3 rounded-full text-sm font-semibold text-center" style={{ border: `1px solid ${border}` }} >
                  Download Resume
              </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="mt-6 px-6 md:px-16 py-14 rounded-t-[40px] flex flex-col items-center gap-6"
        style={{ background: INK, color: PAPER }}
      >
        <div className="flex items-center gap-5">
          {[
            { Icon: Facebook, href: "#" },
            { Icon: Linkedin, href: "#" },
            { Icon: Globe2, href: "#" },
            { Icon: Mail, href: "mailto:miraljoey291@gmail.com" },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-75 transition-opacity"
              style={{ background: PAPER }}
            >
              <Icon size={18} color={INK} />
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
