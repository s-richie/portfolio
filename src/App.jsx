import { useState, useEffect, useRef } from 'react'
import Typed from 'typed.js'
import './App.css'

/* ───────── Data ───────── */
const NAV = [
  ['home', 'Home'],
  ['about', 'About'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['contact', 'Contact'],
]
const SECTION_IDS = ['home', 'about', 'projects', 'skills', 'certificates', 'contact']

const SOCIALS = {
  facebook: { href: 'https://www.facebook.com/richelle.suniga.5', icon: 'bxl-facebook-circle', title: 'Visit my Facebook profile' },
  github: { href: 'https://github.com/s-richie', icon: 'bxl-github', title: 'Visit my GitHub profile' },
  instagram: { href: 'https://www.instagram.com/suniga_ash', icon: 'bxl-instagram-alt', title: 'Visit my Instagram profile' },
  tiktok: { href: 'https://www.tiktok.com/@not_ash.dev', icon: 'bxl-tiktok', title: 'Visit my TikTok profile' },
}

const PROJECTS = [
  {
    key: 'enrollment',
    icon: 'bx bx-code',
    title: 'Online Enrollment Form',
    short: 'A website for Upang enabling online enrollment, file submission, and messaging.',
    images: ['/img/online-enrollment.png'],
    tech: ['Visual Studio Code', 'HTML', 'CSS', 'JavaScript', 'PHP'],
    desc: 'A full-featured web application built for Upang College that allows students to enroll online. The system supports document and file submission, real-time messaging between students and administrators, and streamlines the entire enrollment workflow digitally eliminating the need for students to visit campus just to enroll.',
    github: 'https://github.com/s-richie/online_enrollment_form',
  },
  {
    key: 'dama',
    icon: 'bx bxs-dama',
    title: 'Dama Master',
    short: 'A two-player dama app displaying winners, losers, and scores.',
    images: ['/img/dama.png'],
    tech: ['Java', 'Netbeans IDE', 'Figma'],
    desc: 'A two-player dama application that enforces all standard dama rules from castling to en passant. It tracks game results including winners, losers, and cumulative scores, making it great for competitive play between two users on the same device.',
    github: 'https://github.com/s-richie/dama-master',
  },
  {
    key: 'venuevista',
    icon: 'bx bxs-book',
    title: 'VenueVista',
    short: 'An Android app for event booking with category, location, and date selection.',
    images: ['/img/mobile1.jpg', '/img/mobile2.jpg', '/img/mobile3.jpg'],
    mobile: true,
    tech: ['Android', 'Kotlin', 'Firebase', 'XML'],
    desc: 'An Android mobile app that simplifies event venue booking...',
    github: 'https://github.com/s-richie/venue-vista-mobile',
  },
  {
    key: 'fetchchill',
    icon: 'bx bxs-dog',
    title: 'Fetch&Chill',
    short: 'An app for pet parents to monitor health and grooming.',
    images: ['/img/fetchill2.png', '/img/fetchill1.png'],
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    desc: "A dedicated mobile app for pet parents to keep track of their pets' health records, grooming schedules, vet appointments, and wellness milestones all in one convenient place. Built as both Frontend and Backend developer.",
    github: 'https://github.com/s-richie/FetchChill',
  },
  {
    key: 'openpc',
    icon: 'bx bx-laptop',
    title: 'OpenPC',
    short: 'A web-based application system designed to assist computer laboratory auditors in effectively monitoring and managing computer units.',
    images: ['/img/openpc.png', '/img/openpc2.png'],
    tech: ['Visual Studio Code', 'MERN', 'MongoDB'],
    desc: 'A web-based application system designed to assist computer laboratory auditors in effectively monitoring and managing computer units. The system provides real-time tracking of computer status, making lab audits faster, more accurate, and paperless.',
    github: 'https://github.com/s-richie/Open-Pc',
  },
]

const SKILLS = [
  { icon: 'bxl-html5', title: 'HTML' },
  { icon: 'bxl-java', title: 'Web Development', sub: 'Front-end & Back-end' },
  { icon: 'bxl-android', title: 'Android Studio', sub: 'Kotlin' },
  { icon: 'bx-atom', title: 'ReactJS' },
  { icon: 'bxl-css3', title: 'CSS' },
  { icon: 'bxl-javascript', title: 'JavaScript' },
  { icon: 'bxl-php', title: 'PHP' },
  { icon: 'bxl-python', title: 'Python' },
  { icon: 'bxl-mongodb', title: 'MERN Stack', sub: 'MongoDB, Express.js, React, Node.js' },
  { icon: 'bx-data', title: 'MySQL', sub: 'Database Management' },
  { icon: 'bx-server', title: 'Backend Development' },
  { icon: 'bxl-git', title: 'Git' },
  { icon: 'bxl-github', title: 'GitHub' },
  { icon: 'bxl-visual-studio', title: 'Visual Studio Code' },
  { icon: 'bx-layout', title: 'UI/UX' },
  { icon: 'bx-palette', title: 'Digital Art' },
  { icon: 'bx-wrench', title: 'Troubleshooting' },
  { icon: 'bx-bulb', title: 'Problem Solving' },
  { icon: 'bx-group', title: 'Teamwork' },
]

const CERTS = [
  {
    title: 'Design Thinking Workshop: Exploring Research Innovation Through the Use of IT Solution',
    img: '/img/cert1.jpg',
    desc: 'This workshop provided valuable insights into the application of design thinking principles to enhance research forum processes, fostering innovation, collaboration, and impactful results.',
  },
  {
    title: 'Site Success Ladder',
    img: '/img/cert2.jpg',
    desc: 'For achieving and completing the Level 1 Requirement last A.Y. 2023-2024 during the CITE Success Ladder 2024.',
  },
  {
    title: 'Site Success Ladder',
    img: '/img/cert3.jpg',
    desc: 'For achieving and completing the Level 2 Requirement last A.Y. 2024-2025 during the CITE Success Ladder 2025.',
  },
  {
    title: 'Capture the Flag',
    img: '/img/cert4.jpg',
    desc: 'For actively participating in the "Capture the Flag: Basic Training Seminar" held on September 29, 2024 at PHINMA-UPang.',
  },
  {
    title: 'Certified Cybersecurity Professional (CCP)',
    img: '/img/cert5.png',
    desc: 'For successfully completing the Certified Cybersecurity Professional (CCP) certification module from Appkademiya. Issued on October 19, 2026 and digitally verified.',
  },
  {
    title: 'AI Governance, Risk and Compliances',
    img: '/img/cert7.png',
    desc: 'For successfully completing the AI Governance, Risk and Compliances certification from Appkademiya. Issued on October 23, 2026.',
  },
  {
    title: 'Beyond the Hack: How Cybersecurity Works in the Real World',
    img: '/img/cert8.png',
    desc: 'For actively participating in the "Beyond the Hack: How Cybersecurity Works in the Real World" online webinar by Appkademiya. Issued on October 24, 2026.',
  },
  {
    title: 'Cybersecurity in FinTech',
    img: '/img/cert6.png',
    desc: 'For actively participating in the "Cybersecurity in FinTech" online webinar by Appkademiya. Issued on October 25, 2026.',
  },
]

/* ───────── Small helpers ───────── */
function SocialLinks({ order }) {
  return (
    <div className="social-links">
      {order.map((k) => (
        <a key={k} href={SOCIALS[k].href} target="_blank" rel="noopener noreferrer" title={SOCIALS[k].title}>
          <i className={`bx ${SOCIALS[k].icon}`}></i>
        </a>
      ))}
    </div>
  )
}

// Returns touch handlers that call onNext / onPrev on a horizontal swipe
function useSwipe(onNext, onPrev) {
  const startX = useRef(0)
  return {
    onTouchStart: (e) => { startX.current = e.changedTouches[0].screenX },
    onTouchEnd: (e) => {
      const dx = e.changedTouches[0].screenX - startX.current
      if (Math.abs(dx) > 50) (dx < 0 ? onNext : onPrev)()
    },
  }
}

/* ───────── App ───────── */
function App() {
  const typedRef = useRef(null)
  const toastTimer = useRef(null)

  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [showTop, setShowTop] = useState(false)

  const [project, setProject] = useState(null) // project object or null
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [certIndex, setCertIndex] = useState(null) // number or null

  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' })

  /* Typed.js */
  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Web Developer', 'Frontend', 'Computer Security', 'Cloud Programming'],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    })
    return () => typed.destroy()
  }, [])

  /* Scroll: active nav link + scroll-to-top button */
  useEffect(() => {
    const onScroll = () => {
      let current = 'home'
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) current = id
      })
      setActive(current)
      setShowTop(window.scrollY > 200)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Lock page scroll while a modal is open */
  useEffect(() => {
    document.body.style.overflow = project || certIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [project, certIndex])

  /* Keyboard: Esc closes, arrows move through certificates */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setProject(null); setCertIndex(null) }
      if (certIndex !== null) {
        if (e.key === 'ArrowLeft') setCertIndex((i) => (i - 1 + CERTS.length) % CERTS.length)
        if (e.key === 'ArrowRight') setCertIndex((i) => (i + 1) % CERTS.length)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [certIndex])

  const goTo = (e, id) => {
    e.preventDefault()
    setActive(id)
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  /* Project modal */
  const openProject = (p) => { setProject(p); setGalleryIndex(0) }
  const galleryGo = (i) => {
    const n = project.images.length
    setGalleryIndex((i + n) % n)
  }
  const projectSwipe = useSwipe(
    () => project && project.images.length > 1 && galleryGo(galleryIndex + 1),
    () => project && project.images.length > 1 && galleryGo(galleryIndex - 1),
  )

  /* Certificate modal */
  const certGo = (i) => setCertIndex((i + CERTS.length) % CERTS.length)
  const certSwipe = useSwipe(
    () => certGo(certIndex + 1),
    () => certGo(certIndex - 1),
  )
  const cert = certIndex !== null ? CERTS[certIndex] : null

  /* Contact form */
  const showToast = (msg, type = 'success') => {
    clearTimeout(toastTimer.current)
    setToast({ show: true, msg, type })
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 4000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setSending(true)
    try {
      const body = JSON.stringify(Object.fromEntries(new FormData(form)))
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body,
      })
      const result = await res.json()
      if (result.success) {
        showToast("Message sent! I'll get back to you soon.", 'success')
        form.reset()
      } else {
        showToast('Something went wrong. Please try again.', 'error')
        console.log(result)
      }
    } catch (err) {
      showToast('Network error. Please check your connection.', 'error')
      console.log(err)
    }
    setSending(false)
  }

  return (
    <>
      {/* ── Header ── */}
      <header className="header">
        <a href="#home" className="logo" onClick={(e) => goTo(e, 'home')}>Suniga</a>
        <button id="toggle-btn" aria-label="Menu" onClick={() => setMenuOpen((o) => !o)}>
          <i className="bx bx-menu"></i>
        </button>
        <nav className={`navbar${menuOpen ? ' active' : ''}`}>
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={(e) => goTo(e, id)}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* ── Home ── */}
      <section className="home" id="home">
        <div className="home-container">
          <div className="home-content">
            <h3>Hello, I'm</h3>
            <h1>Richelle Suniga</h1>
            <h3>A <span className="typed-text" ref={typedRef}></span></h3>
            <p>I am a Cyber Security student with a strong interest in backend development, web technologies, and secure application development. I have experience building web and mobile applications using HTML, ReactJS, Kotlin, and Android Studio. Passionate about continuous learning, I enjoy solving problems, exploring new technologies, and creating practical solutions that deliver meaningful user experiences.</p>
            <SocialLinks order={['facebook', 'github', 'instagram', 'tiktok']} />
            <a
              href="https://drive.google.com/file/d/1bKb0I1xqfKuph3EWbFw4I0XwoiPUvBm3/view?usp=sharing"
              className="btn" target="_blank" rel="noopener noreferrer"
            >
              Download Resume
            </a>
          </div>
          <div className="home-image">
            <img src="/img/circle%20pfp.png" alt="Suniga's Photo" />
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="about" id="about">
        <div className="about-img">
          <img src="/img/design2.png" alt="Profile" loading="lazy" />
        </div>
        <div className="about-text">
          <h2>About <span>Me</span></h2>
          <h4>Cyber Security</h4>
          <p>My passion for technology began in junior high school when I was introduced to Arduino, sparking my curiosity about programming and innovation. This inspired me to pursue a degree in Cyber Security, where I continue to strengthen my knowledge of information security, software development, and secure computing practices. Through academic projects and hands-on experience, I have developed skills in web and mobile application development while continuously expanding my technical expertise. I am eager to grow as a developer, contribute to impactful projects, and build secure, reliable digital solutions.</p>
          <a href="#contact" className="btn" onClick={(e) => goTo(e, 'contact')}>Connect with Me</a>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="projects" id="projects">
        <h2 className="section-title">My <span>Projects</span></h2>
        <div className="project-grid">
          {PROJECTS.map((p) => (
            <div className="project-card" key={p.key}>
              <i className={p.icon}></i>
              <h3>{p.title}</h3>
              <p>{p.short}</p>
              <button className="btn" onClick={() => openProject(p)}>Learn More</button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Project modal ── */}
      <div
        className={`proj-overlay${project ? ' open' : ''}`}
        onClick={(e) => e.target === e.currentTarget && setProject(null)}
      >
        {project && (
          <div className="proj-modal">
            <button className="proj-modal-close" onClick={() => setProject(null)} aria-label="Close">×</button>

            <div className={`proj-gallery${project.mobile ? ' mobile-frame' : ''}`} {...projectSwipe}>
              {project.images.length > 0 ? (
                <>
                  {project.images.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className={`${i === galleryIndex ? 'active' : ''}${project.mobile ? ' mobile-view' : ''}`}
                    />
                  ))}
                  {project.images.length > 1 && (
                    <>
                      <button className="gallery-prev" onClick={() => galleryGo(galleryIndex - 1)} aria-label="Previous">❮</button>
                      <button className="gallery-next" onClick={() => galleryGo(galleryIndex + 1)} aria-label="Next">❯</button>
                    </>
                  )}
                </>
              ) : (
                <div className="proj-gallery-placeholder">
                  <i className={project.icon}></i>
                  <span>Screenshots coming soon</span>
                </div>
              )}
            </div>

            {project.images.length > 1 && (
              <div className="gallery-dots">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    className={`gallery-dot${i === galleryIndex ? ' active' : ''}`}
                    onClick={() => galleryGo(i)}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            )}

            <h2>{project.title}</h2>
            <div className="proj-tech">
              {project.tech.map((t) => <span className="tech-badge" key={t}>{t}</span>)}
            </div>
            <p className="proj-desc">{project.desc}</p>
            <div className="proj-actions">
              <a className="btn-github" href={project.github} target="_blank" rel="noopener noreferrer">
                <i className="bx bxl-github"></i> View on GitHub
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ── Skills ── */}
      <section className="skills" id="skills">
        <h2 className="section-title">My <span>Skills</span></h2>
        <div className="skill-grid">
          {SKILLS.map((s) => (
            <div className="skill-card" key={s.title}>
              <i className={`bx ${s.icon}`}></i>
              <h3>{s.title}</h3>
              {s.sub && <h4>{s.sub}</h4>}
            </div>
          ))}
        </div>
      </section>

      {/* ── Certificates  */}
      <section className="certificates" id="certificates">
        <h2 className="section-title">My <span>Certificates</span></h2>
        <div className="certificate-grid">
          {CERTS.map((c, i) => (
            <div className="certificate-card" key={i}>
              <h3 className="cert-span"><span>{c.title}</span></h3>
              <button className="btn view-btn" onClick={() => setCertIndex(i)}>View Image</button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Certificate modal ── */}
      <div
        className={`proj-overlay${cert ? ' open' : ''}`}
        onClick={(e) => e.target === e.currentTarget && setCertIndex(null)}
      >
        {cert && (
          <div className="proj-modal">
            <button className="proj-modal-close" onClick={() => setCertIndex(null)} aria-label="Close">×</button>
            <div className="cert-image-wrap" {...certSwipe}>
              <img src={cert.img} alt={cert.title} />
              <button className="gallery-prev" onClick={() => certGo(certIndex - 1)} aria-label="Previous">❮</button>
              <button className="gallery-next" onClick={() => certGo(certIndex + 1)} aria-label="Next">❯</button>
            </div>
            <div className="gallery-dots">
              {CERTS.map((_, i) => (
                <button
                  key={i}
                  className={`gallery-dot${i === certIndex ? ' active' : ''}`}
                  onClick={() => certGo(i)}
                  aria-label={`Certificate ${i + 1}`}
                />
              ))}
            </div>
            <h2>{cert.title}</h2>
            <p className="proj-desc">{cert.desc}</p>
          </div>
        )}
      </div>

      {/* ── Contact ── */}
      <section className="contact" id="contact">
        <div className="contact-text">
          <h2>Contact <span>Me</span></h2>
          <h4>Let's Code Together</h4>
          <p>Reach out for collaborations, inquiries, or just a chat. I'm excited to connect!</p>
          <ul className="contact-list">
            <li><i className="bx bxs-send"></i> richelleanne0621@gmail.com</li>
            <li><i className="bx bxs-phone"></i> 09202431680</li>
          </ul>
          <SocialLinks order={['facebook', 'instagram', 'github']} />
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="access_key" value="cae9d0cb-b65c-40a9-9d50-64fea31730d6" />
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" name="name" placeholder="Your Name" required />
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" name="email" placeholder="Your Email" required />
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="_subject" placeholder="Subject" />
            <label htmlFor="message">Your Message</label>
            <textarea id="message" name="message" placeholder="Your Message" rows="8" required></textarea>
            <button type="submit" className="btn" disabled={sending}>
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* ── Toast ── */}
      <div className={`toast ${toast.type}${toast.show ? ' show' : ''}`}>
        <i className={`bx ${toast.type === 'success' ? 'bx-check-circle' : 'bx-x-circle'}`}></i>
        <span>{toast.msg}</span>
      </div>

      {/* ── Footer ── */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Suniga. All rights reserved.</p>
        <a
          href="#home"
          className="scroll-top"
          aria-label="Scroll to top"
          style={{ display: showTop ? 'block' : 'none' }}
          onClick={(e) => goTo(e, 'home')}
        >
          <i className="bx bx-up-arrow-alt"></i>
        </a>
      </footer>
    </>
  )
}

export default App