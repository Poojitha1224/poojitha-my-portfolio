import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Code2,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Home,
  UserRound,
  Layers3,
  Mail,
  Menu,
  Pause,
  Play,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import "./App.css";
import CustomCursor from "./CustomCursor";

const skills = [
  { name: "HTML", group: "Frontend" },
  { name: "CSS", group: "Frontend" },
  { name: "JavaScript", group: "Frontend" },
  { name: "React.js", group: "Frontend" },
  { name: "Node.js", group: "Backend" },
  { name: "Express.js", group: "Backend" },
  { name: "MongoDB", group: "Database" },
];

const projects = [
  {
    number: "01",
    title: "TaskPilot",
    category: "MERN STACK",
    group: "MERN Stack",
    subtitle: "Task & Project Management Application",
    description:
      "A full-stack task management application where users can create projects, organize boards, manage tasks and collaborate efficiently.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    link: "https://github.com/Poojitha1224",
    kind: "taskpilot",
    badge: "Full-Stack Project",
  },
  {
    number: "02",
    title: "Cat API",
    category: "API INTEGRATION",
    group: "API Integration",
    subtitle: "Random Cat Image Application",
    description:
      "A web application that fetches and displays random cat images using The Cat API, exploring API requests and dynamic content rendering.",
    stack: ["JavaScript", "Node.js", "The Cat API"],
    link: "https://github.com/Poojitha1224",
    kind: "catapi",
    badge: "API Project",
  },
];

const certificates = [
  "Artificial Intelligence Fundamentals",
  "Getting Started with Artificial Intelligence",
  "Project Management Fundamentals",
];

const portfolioMenuItems = [
  { label: "Home", detail: "Hero, Introduction & Vision", href: "#home", Icon: Home },
  { label: "About Me", detail: "Bio, Philosophy & Core Pillars", href: "#about", Icon: UserRound },
  { label: "Skills & Arsenal", detail: "MERN Stack & Development Skills", href: "#skills", Icon: Code2 },
  { label: "Featured Projects", detail: "TaskPilot, Cat API & More", href: "#projects", Icon: Layers3, badge: "02" },
  { label: "Education", detail: "BCA & IBM SkillsBuild Certifications", href: "#education", Icon: GraduationCap },
  { label: "Contact", detail: "Let's connect and collaborate", href: "#contact", Icon: Mail },
];

function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Keep the native cursor visible; this is a soft animated follower ring.
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const cursor = cursorRef.current;
    if (!cursor) return undefined;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let frameId;
    let visible = false;

    const move = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        currentX = targetX;
        currentY = targetY;
        visible = true;
        cursor.classList.add("cursor-visible");
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      frameId = window.requestAnimationFrame(animate);
    };

    const show = () => cursor.classList.add("cursor-visible");
    const hide = () => cursor.classList.remove("cursor-visible");
    const hoverOn = (event) => {
      if (event.target.closest("a, button, input, textarea, select, [role='button']")) {
        cursor.classList.add("cursor-hover");
      }
    };
    const hoverOff = (event) => {
      if (event.target.closest("a, button, input, textarea, select, [role='button']")) {
        cursor.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", hoverOn);
    document.addEventListener("pointerout", hoverOff);
    document.addEventListener("pointerenter", show);
    document.addEventListener("pointerleave", hide);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", hoverOn);
      document.removeEventListener("pointerout", hoverOff);
      document.removeEventListener("pointerenter", show);
      document.removeEventListener("pointerleave", hide);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor-follower" aria-hidden="true" />;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("All Projects");
  const [activeProject, setActiveProject] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  const projectFilters = ["All Projects", "MERN Stack", "API Integration"];
  const filteredProjects = projectFilter === "All Projects"
    ? projects
    : projects.filter((project) => project.group === projectFilter);

  useEffect(() => {
    setActiveProject(0);
  }, [projectFilter]);

  useEffect(() => {
    if (!autoSlide || filteredProjects.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveProject((current) => (current + 1) % filteredProjects.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [autoSlide, filteredProjects.length]);

  const showPreviousProject = () => {
    setActiveProject((current) => (current - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const showNextProject = () => {
    setActiveProject((current) => (current + 1) % filteredProjects.length);
  };

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleEscape = (event) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <CustomCursor />
      <header className="topbar">
        <div className="topbar-inner">
          <button
            className="menu-trigger"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
            <span>Menu</span>
          </button>

          <a className="brand" href="#home" onClick={closeMenu}>
            <span className="brand-mark">PK</span>
            <span className="brand-copy">
              <strong>Poojitha K</strong>
              <small>BCA STUDENT · FULL STACK DEVELOPER</small>
            </span>
          </a>

          <div className="availability-pill">
            <span className="status-dot" />
            <span>Open to Opportunities</span>
          </div>

          <nav className="main-nav">
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href="#education" onClick={closeMenu}>Education</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </nav>

          <button className="nav-hire" onClick={() => setResumeOpen(true)}>
            View Resume
          </button>
          <a className="nav-contact" href="#contact">
            Contact <ArrowUpRight size={16} />
          </a>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeMenu();
            }}
          >
            <motion.aside
              className="side-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              role="dialog"
              aria-modal="true"
              aria-label="Portfolio navigation"
            >
              <div className="drawer-header">
                <a className="drawer-brand" href="#home" onClick={closeMenu}>
                  <span className="brand-mark">PK</span>
                  <span className="brand-copy">
                    <strong>Poojitha K</strong>
                    <small>BCA STUDENT · FULL STACK DEVELOPER</small>
                  </span>
                </a>
                <button className="drawer-close" type="button" onClick={closeMenu} aria-label="Close menu">
                  <X size={23} />
                </button>
              </div>

              <div className="drawer-availability">
                <span className="status-dot" />
                Available for Internships &amp; Opportunities
              </div>

              <div className="drawer-content">
                <p className="drawer-section-label">EXPLORE PORTFOLIO SECTIONS</p>
                <nav className="drawer-links" aria-label="Portfolio sections">
                  {portfolioMenuItems.map(({ label, detail, href, Icon, badge }) => (
                    <a className="drawer-link" href={href} key={label} onClick={closeMenu}>
                      <span className="drawer-link-icon"><Icon size={25} /></span>
                      <span className="drawer-link-copy">
                        <strong>{label}</strong>
                        <small>{detail}</small>
                      </span>
                      {badge ? <span className="drawer-count">{badge}</span> : <ArrowRight className="drawer-chevron" size={18} />}
                    </a>
                  ))}
                  <button
                    className="drawer-link drawer-resume-link"
                    type="button"
                    onClick={() => { closeMenu(); setResumeOpen(true); }}
                  >
                    <span className="drawer-link-icon"><FileText size={24} /></span>
                    <span className="drawer-link-copy">
                      <strong>Resume &amp; CV</strong>
                      <small>View my profile and qualifications</small>
                    </span>
                    <ArrowRight className="drawer-chevron" size={18} />
                  </button>
                </nav>
              </div>

              <div className="drawer-footer">
                <a className="drawer-connect" href="mailto:poojitha.k1224@gmail.com" onClick={closeMenu}>
                  <Mail size={18} /> Let's Connect
                </a>
                <div className="drawer-socials">
                  <a href="https://github.com/Poojitha1224" target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 size={21} /></a>
                  <a href="https://linkedin.com/in/poojitha-k-" target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness size={21} /></a>
                  <a href="mailto:poojitha.k1224@gmail.com" aria-label="Email"><Mail size={21} /></a>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-watermark" aria-hidden="true">VISION</div>
          <div className="hero-grid page-width">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="availability-label">
                <span className="status-dot" />
                Open to Internships & Opportunities
              </div>
              <p className="eyebrow">HELLO, I'M</p>
              <h1>Poojitha <span>K</span></h1>
              <h2>Aspiring Full Stack Developer.</h2>
              <p className="hero-intro">
                I’m a BCA student who enjoys building clean, responsive and
                user-friendly web applications. I turn ideas into practical
                digital experiences with code and creativity.
              </p>
              <div className="terminal-line">
                <span className="terminal-prompt">&gt;</span>
                <span>Full Stack Developer</span>
                <span className="terminal-cursor" />
              </div>
              <p className="hero-detail">
                Exploring the <strong>MERN stack</strong> — MongoDB, Express.js,
                React.js and Node.js — while strengthening my problem-solving
                skills and learning to build meaningful real-world projects.
              </p>
              <div className="hero-actions">
                <a className="button button-dark" href="#projects">
                  Explore My Work <ArrowUpRight size={17} />
                </a>
                <button className="button button-light" onClick={() => setResumeOpen(true)}>
                  <FileText size={17} /> View Resume
                </button>
              </div>
              <div className="hero-socials">
                <a href="https://github.com/Poojitha1224" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a>
                <a href="https://linkedin.com/in/poojitha-k-" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a>
                <a href="mailto:poojitha.k1224@gmail.com">Email <ArrowUpRight size={13} /></a>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="portrait-frame">
                <img src="/profile.jpg" alt="Poojitha K" />
              </div>
              <div className="float-tag tag-top"><span className="status-dot" /> Creative Developer</div>
              <div className="float-tag tag-bottom"><Code2 size={17} /> Building with curiosity</div>
              <div className="visual-caption"><Sparkles size={15} /> Learning · Building · Growing</div>
            </motion.div>
          </div>
          <a className="scroll-cue" href="#about"><ArrowDown size={15} /> Scroll to explore</a>
        </section>

        <section className="about-section section-space" id="about">
          <div className="section-heading">
            <p className="eyebrow">A LITTLE INTRODUCTION</p>
            <h2>About <span>Me</span></h2>
            <p>A curious mind, a growing developer, and a love for learning.</p>
            <span className="heading-rule" />
          </div>

          <div className="about-layout page-width">
            <motion.article
              className="profile-window"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="window-topline">
                <div className="window-dots"><i /><i /><i /></div>
                <span>poojitha_profile.md</span>
                <span className="open-badge"><span className="status-dot" /> Open to Learn</span>
              </div>
              <div className="mini-profile">
                <img src="/profile.jpg" alt="Poojitha K" />
                <div>
                  <strong>Poojitha K</strong>
                  <span>BCA Student · Aspiring Full Stack Developer</span>
                </div>
              </div>
              <p className="about-lead">
                Hey! I’m <strong>Poojitha</strong> — a BCA student passionate
                about creating useful web experiences and continuously
                improving my development skills.
              </p>
              <p className="about-body">
                I’m learning frontend and backend development with HTML, CSS,
                JavaScript, React.js, Node.js, Express.js and MongoDB. Through
                projects like TaskPilot and Cat API, I’m gaining practical
                experience with application development and API integration.
              </p>
              <div className="about-highlights">
                <div><span>01</span><p><strong>Web Development</strong><small>Responsive interfaces and full-stack fundamentals</small></p></div>
                <div><span>02</span><p><strong>Learning by Building</strong><small>Turning concepts into hands-on projects</small></p></div>
                <div><span>03</span><p><strong>Career Goal</strong><small>Growing into a skilled full-stack developer</small></p></div>
              </div>
            </motion.article>

            <div className="stats-grid">
              <motion.div className="stat-card" whileHover={{ y: -5 }}>
                <span className="stat-icon icon-blue"><Code2 /></span>
                <small>CORE FOCUS</small>
                <strong>MERN Stack</strong>
                <p>React, Node & MongoDB</p>
              </motion.div>
              <motion.div className="stat-card" whileHover={{ y: -5 }}>
                <span className="stat-icon icon-violet"><Layers3 /></span>
                <small>PROJECTS</small>
                <strong>02</strong>
                <p>Academic & personal builds</p>
              </motion.div>
              <motion.div className="stat-card" whileHover={{ y: -5 }}>
                <span className="stat-icon icon-orange"><Zap /></span>
                <small>MINDSET</small>
                <strong>Curious</strong>
                <p>Always learning something new</p>
              </motion.div>
              <motion.div className="stat-card" whileHover={{ y: -5 }}>
                <span className="stat-icon icon-green"><GraduationCap /></span>
                <small>EDUCATION</small>
                <strong>BCA</strong>
                <p>2024 – 2027 · Bengaluru</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="skills-section section-space" id="skills">
          <div className="section-heading">
            <p className="eyebrow">MY TOOLKIT</p>
            <h2>Skills & <span>Technologies</span></h2>
            <p>Tools I’m learning and using to bring ideas to life.</p>
            <span className="heading-rule" />
          </div>
          <div className="skills-panel page-width">
            <div className="skills-panel-title"><Code2 /><div><strong>Technical Skills</strong><span>My current development toolkit</span></div></div>
            <div className="skills-list">
              {skills.map((skill) => (
                <div className="skill-chip" key={skill.name}>
                  <span className="skill-chip-dot" />
                  <strong>{skill.name}</strong>
                  <small>{skill.group}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="projects-section section-space" id="projects">
          <div className="section-heading">
            <p className="eyebrow">MY SELECTED WORK</p>
            <h2>Featured <span>Projects</span></h2>
            <p>A closer look at the applications I’ve been building.</p>
            <span className="heading-rule" />
          </div>

          <div className="project-filters" role="group" aria-label="Filter projects">
            {projectFilters.map((filter) => (
              <button
                type="button"
                key={filter}
                className={`project-filter ${projectFilter === filter ? "active" : ""}`}
                onClick={() => setProjectFilter(filter)}
              >
                {filter}{filter === "All Projects" ? ` (${projects.length})` : ""}
              </button>
            ))}
          </div>

          <div className="project-controls page-width">
            <div className="autoslide-status">
              <span className="status-dot" />
              <strong>{autoSlide && filteredProjects.length > 1 ? "Auto-Slide (3s)" : "Manual Browse"}</strong>
              <span>{autoSlide && filteredProjects.length > 1 ? "Hover over a card to pause" : "Use arrows to explore"}</span>
            </div>
            <div className="project-arrows">
              <button type="button" onClick={showPreviousProject} disabled={filteredProjects.length < 2} aria-label="Previous project"><ChevronLeft /></button>
              <button type="button" className="project-play" onClick={() => setAutoSlide((playing) => !playing)} disabled={filteredProjects.length < 2} aria-label={autoSlide ? "Pause auto slide" : "Play auto slide"}>{autoSlide ? <Pause /> : <Play />}</button>
              <button type="button" onClick={showNextProject} disabled={filteredProjects.length < 2} aria-label="Next project"><ChevronRight /></button>
            </div>
          </div>

          <div
            className="projects-viewport page-width"
            onMouseEnter={() => setAutoSlide(false)}
            onMouseLeave={() => setAutoSlide(true)}
          >
            <div className={`projects-grid active-project-${activeProject}`}>
            {filteredProjects.map((project, index) => (
              <motion.article
                className="project-card"
                key={project.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                whileHover={{ y: -7 }}
              >
                <div className={`project-cover ${project.kind}`}>
                  <div className="project-cover-ui">
                    {project.kind === "taskpilot" ? (
                      <>
                        <div className="mock-topbar"><span>TaskPilot</span><span>Workspace / My Boards</span><i /></div>
                        <div className="mock-dashboard">
                          <div className="mock-sidebar"><b>OVERVIEW</b><i /><i /><i /><i /></div>
                          <div className="mock-main"><div className="mock-welcome">Good morning, Poojitha <small>Your workspace at a glance</small></div><div className="mock-stats"><i /><i /><i /></div><div className="mock-task-title">Recent tasks</div><div className="mock-task-row"><b /> <i /> <em /></div><div className="mock-task-row"><b /> <i /> <em /></div><div className="mock-task-row"><b /> <i /> <em /></div></div>
                        </div>
                      </>
                    ) : (
                      <div className="cat-preview-content"><span className="cat-preview-kicker">A LITTLE CAT DISCOVERY</span><div className="cat-preview-face">🐈</div><strong>The Cat API</strong><small>Random images. Endless cuteness.</small><span className="cat-preview-button">Get a random cat <ArrowUpRight size={13} /></span></div>
                    )}
                  </div>
                  <span className="project-preview-badge"><span className="status-dot" /> Project Preview</span>
                  <span className="project-cover-label">{project.badge}</span>
                </div>
                <div className="project-card-body">
                  <div className="project-meta"><span>PROJECT {project.number}</span><span><Sparkles size={16} /> {project.category}</span></div>
                  <h3>{project.title}</h3>
                  <h4>{project.subtitle}</h4>
                  <p>{project.description}</p>
                  <div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                  <a href={project.link} target="_blank" rel="noreferrer" className="project-link">View GitHub <ArrowUpRight size={16} /></a>
                </div>
              </motion.article>
            ))}
            </div>
          </div>
          <div className="project-pagination page-width" aria-label="Project position">
            {filteredProjects.map((project, index) => (
              <button key={project.number} type="button" className={activeProject === index ? "active" : ""} onClick={() => setActiveProject(index)} aria-label={`Show ${project.title}`} />
            ))}
          </div>
        </section>

        <section className="education-section section-space" id="education">
          <div className="section-heading">
            <p className="eyebrow">MY JOURNEY</p>
            <h2>Education & <span>Certifications</span></h2>
            <p>Building a strong foundation, one step at a time.</p>
            <span className="heading-rule" />
          </div>
          <div className="education-layout page-width">
            <article className="education-card">
              <span className="education-icon"><GraduationCap /></span>
              <div className="education-content">
                <small>2024 — 2027 · BENGALURU</small>
                <h3>Bachelor of Computer Applications</h3>
                <p>Aditya Institute of Management Studies and Research</p>
                <span>Undergraduate student</span>
              </div>
            </article>
            <div className="cert-list">
              <h3><Sparkles size={18} /> IBM SkillsBuild Certifications</h3>
              {certificates.map((certificate, index) => (
                <div className="cert-row" key={certificate}>
                  <span>0{index + 1}</span>
                  <strong>{certificate}</strong>
                  <small>Earned</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section section-space" id="contact">
          <div className="contact-card page-width">
            <div>
              <p className="eyebrow">LET’S CONNECT</p>
              <h2>Have an idea?<br /><span>Let’s build it.</span></h2>
              <p>I’m always happy to connect, learn about opportunities and discuss projects.</p>
            </div>
            <div className="contact-links">
              <a href="mailto:poojitha.k1224@gmail.com"><Mail size={18} /><span><small>EMAIL</small>poojitha.k1224@gmail.com</span><ArrowUpRight size={17} /></a>
              <a href="https://github.com/Poojitha1224" target="_blank" rel="noreferrer"><Code2 size={18} /><span><small>GITHUB</small>Poojitha1224</span><ArrowUpRight size={17} /></a>
              <a href="https://linkedin.com/in/poojitha-k-" target="_blank" rel="noreferrer"><ExternalLink size={18} /><span><small>LINKEDIN</small>Visit my profile</span><ArrowUpRight size={17} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><a href="#home">Poojitha K.</a><span>Designed & built with care.</span><span>© 2026</span></footer>

      <AnimatePresence>
        {resumeOpen && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => { if (event.target === event.currentTarget) setResumeOpen(false); }}
          >
            <motion.div
              className="resume-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="resume-title"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
            >
              <button className="modal-close" onClick={() => setResumeOpen(false)} aria-label="Close resume"><X /></button>
              <div className="resume-modal-heading">
                <FileText size={34} />
                <div><h2 id="resume-title">Poojitha K — Resume</h2><p>BCA Student · Aspiring Full Stack Developer</p></div>
              </div>
              <div className="resume-actions">
                <a className="button button-dark" href="/resume.pdf" download="Poojitha_Resume.pdf"><Download size={17} /> Download PDF</a>
                <a className="button button-light" href="/resume.pdf" target="_blank" rel="noreferrer"><ExternalLink size={17} /> Open PDF</a>
              </div>
              <div className="resume-content">
                <section><h3>Professional Summary</h3><p>BCA student and aspiring Full Stack Developer interested in building responsive web applications using modern frontend and backend technologies.</p></section>
                <section><h3>Education</h3><strong>Aditya Institute of Management Studies and Research</strong><p>Bachelor of Computer Applications · 2024 – 2027 · Bengaluru</p></section>
                <section><h3>Technical Skills</h3><p>HTML, CSS, JavaScript, React.js, Node.js, Express.js and MongoDB.</p></section>
                <section><h3>Projects</h3><strong>TaskPilot</strong><p>Task and project management application built with the MERN stack.</p><strong>Cat API</strong><p>Random cat image application demonstrating API integration.</p></section>
                <section><h3>Certifications</h3><ul>{certificates.map((certificate) => <li key={certificate}>{certificate} — IBM SkillsBuild</li>)}</ul></section>
              </div>
              <p className="resume-note">For the complete, original resume, use Download PDF. Place your valid resume file at <code>public/resume.pdf</code>.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
