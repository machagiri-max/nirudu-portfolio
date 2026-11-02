import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { profile, projects, aiSkills, skills, certs, chunks } from './data.js'

const Hero3D = lazy(() => import('./Hero3D.jsx'))
const NeuralNet = lazy(() => import('./NeuralNet.jsx'))

/* ---------- helpers ---------- */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={'reveal ' + className} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

function Tilt({ children, className = '' }) {
  const ref = useRef()
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    ref.current.style.setProperty('--mx', `${x * 100}%`)
    ref.current.style.setProperty('--my', `${y * 100}%`)
    ref.current.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 8}deg)`
  }
  const leave = () => { ref.current.style.transform = '' }
  return <div ref={ref} className={'tilt ' + className} onMouseMove={move} onMouseLeave={leave}>{children}</div>
}

const Fallback = () => <div className="canvas-fallback" aria-hidden="true" />

/* ---------- ask widget ---------- */
const STOP = new Set(['the','a','an','is','are','of','to','in','do','does','you','your','what','how','with','and','for','me','about','can','did','have','has','i','it','on','tell'])
const tok = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w && !STOP.has(w))
function retrieve(q) {
  const qs = tok(q)
  if (!qs.length) return []
  return chunks
    .map((c) => {
      const words = new Set(tok(c.text))
      return { ...c, score: qs.filter((w) => words.has(w) || (w.length > 3 && [...words].some((x) => x.startsWith(w)))).length }
    })
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
}
const suggestions = ['What is ContractLens?', 'Do you know Docker and CI/CD?', 'Which databases do you use?', 'How can I contact you?']

function AskWidget() {
  const [q, setQ] = useState('')
  const [res, setRes] = useState(null)
  const ask = (text) => { setQ(text); setRes({ hits: retrieve(text) }) }
  return (
    <section className="ask" aria-labelledby="ask-h">
      <div className="ask-head">
        <span className="eyebrow">Live demo</span>
        <h2 id="ask-h">Ask my portfolio</h2>
        <p>The same idea I used in ContractLens: your question is matched against chunks of this page and the answer shows its sources. It runs in your browser with keyword matching, no LLM call.</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); ask(q) }} className="ask-form">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask about my projects, stack or experience" aria-label="Your question" />
        <button type="submit">Ask</button>
      </form>
      <div className="chips">{suggestions.map((s) => <button key={s} className="chip" onClick={() => ask(s)}>{s}</button>)}</div>
      {res && (
        <div className="answer" aria-live="polite">
          <div className="pipe">
            <span>Question</span><i />
            <span>Retrieved {res.hits.length} chunk{res.hits.length === 1 ? '' : 's'}</span><i />
            <span>Answer</span>
          </div>
          {res.hits.length ? (
            <>
              <p className="a-text">{res.hits[0].text}</p>
              <p className="a-src">Sources: {[...new Set(res.hits.map((h) => h.src))].join(', ')}</p>
            </>
          ) : (
            <p className="a-text">Not specified on this page. Try asking about a project, my stack or how to reach me.</p>
          )}
        </div>
      )}
    </section>
  )
}

/* ---------- sections ---------- */
const marquee = ['Python', 'FastAPI', 'Django', 'React', 'PostgreSQL', 'Redis', 'Docker', 'GitHub Actions', 'LangChain', 'RAG', 'ChromaDB', 'OpenAI', 'Nginx', 'Grafana']
const stats = [['<1ms', 'cached redirects'], ['97%+', 'IDS accuracy'], ['900→120MB', 'Docker image'], ['4', 'shipped projects']]

function Project({ p, i }) {
  return (
    <Reveal delay={i * 80} className={p.featured ? 'span2' : ''}>
      <Tilt className={'project' + (p.featured ? ' featured' : '')}>
        <header>
          <div>
            <span className="num">0{i + 1}</span>
            <h3>{p.title}</h3>
            <p className="tag">{p.tag}</p>
          </div>
          <div className="links">
            {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer">Live ↗</a>}
            {p.code && <a href={p.code} target="_blank" rel="noopener noreferrer">Code ↗</a>}
          </div>
        </header>
        <p className="blurb">{p.blurb}</p>
        <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
        <div className="stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
      </Tilt>
    </Reveal>
  )
}

export default function App() {
  return (
    <>
      <div className="bg-glow" aria-hidden="true" />
      <nav className="nav">
        <a href="#top" className="brand">MN<span>.</span></a>
        <div>
          <a href="#work">Work</a><a href="#ai">AI skills</a><a href="#stack">Stack</a>
          <a href="#contact" className="nav-cta">Contact</a>
        </div>
      </nav>

      <main id="top">
        <header className="hero">
          <div className="hero-text">
            <p className="status"><span className="dot" /> Open to Software Engineer roles</p>
            <h1>I build <span className="grad">backends</span> people actually use, and wire <span className="grad">AI</span> into them.</h1>
            <p className="lead">I'm {profile.name}, a CSE (Data Science) graduate from Hyderabad. I ship end to end: database design, APIs, Docker, CI/CD and getting it live.</p>
            <div className="cta">
              <a className="btn primary" href="#work">See my projects</a>
              <a className="btn" href={`mailto:${profile.email}`}>Email me</a>
            </div>
          </div>
          <div className="hero-3d">
            <Suspense fallback={<Fallback />}><Hero3D /></Suspense>
          </div>
        </header>

        <div className="stats">
          {stats.map(([n, l]) => (<div key={l}><b>{n}</b><span>{l}</span></div>))}
        </div>

        <div className="marquee" aria-hidden="true">
          <div className="track">{[...marquee, ...marquee].map((m, i) => <span key={i}>{m}</span>)}</div>
        </div>

        <Reveal><AskWidget /></Reveal>

        <section id="work" className="block">
          <Reveal><span className="eyebrow">Selected work</span><h2>Projects</h2></Reveal>
          <div className="projects">{projects.map((p, i) => <Project key={p.title} p={p} i={i} />)}</div>
        </section>

        <section id="ai" className="block">
          <Reveal>
            <span className="eyebrow">What I use</span>
            <h2>AI skills</h2>
            <p className="sub">Features that stay grounded and testable. Drag the network to rotate it.</p>
          </Reveal>
          <div className="ai-wrap">
            <div className="ai-3d">
              <Suspense fallback={<Fallback />}><NeuralNet /></Suspense>
            </div>
            <div className="ai-grid">
              {aiSkills.map((s, i) => (
                <Reveal key={s.name} delay={i * 50}>
                  <div className="ai-item"><h3>{s.name}</h3><p>{s.note}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="stack" className="block">
          <Reveal><span className="eyebrow">Toolbox</span><h2>Tech stack</h2></Reveal>
          <div className="stack-grid">
            {Object.entries(skills).map(([k, v], i) => (
              <Reveal key={k} delay={i * 60}>
                <div className="stack-card">
                  <h3>{k}</h3>
                  <div className="pills">{v.map((s) => <span key={s}>{s}</span>)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="block two">
          <Reveal>
            <h2>Education</h2>
            <p className="edu"><strong>B.Tech, Computer Science & Engineering (Data Science)</strong><br />TKR College of Engineering, Hyderabad<br />2023 to 2026</p>
          </Reveal>
          <Reveal delay={100}>
            <h2>Certifications</h2>
            <ul className="plain">{certs.map((c) => <li key={c}>{c}</li>)}</ul>
          </Reveal>
        </section>

        <section id="contact" className="contact">
          <h2>Let's build something.</h2>
          <p>I'm looking for a Software Engineer role where I can write code that people actually use.</p>
          <p className="reach"><a href={`mailto:${profile.email}`}>{profile.email}</a><br />{profile.phone} · {profile.location}</p>
          <div className="cta">
            <a className="btn primary" href={`mailto:${profile.email}`}>Say hello</a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </section>
      </main>
      <footer className="foot">© {new Date().getFullYear()} {profile.name}</footer>
    </>
  )
}
