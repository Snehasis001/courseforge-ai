'use client'
import Link from 'next/link'

const FEATURES = [
  { icon: '🧠', title: 'Gemini AI Powered', desc: 'Google Gemini generates complete structured course outlines with chapters, topics, and learning objectives in seconds.', color: 'var(--cyan)' },
  { icon: '🔒', title: 'Clerk Authentication', desc: 'Enterprise-grade security with SSO, MFA, and role-based access. Zero data breach incidents.', color: 'var(--violet)' },
  { icon: '⚡', title: 'NeonDB + Drizzle ORM', desc: 'Scalable PostgreSQL database with 40% faster data retrieval through optimized Drizzle ORM queries.', color: 'var(--amber)' },
  { icon: '🎬', title: 'YouTube Integration', desc: 'Automatically finds relevant YouTube videos for each chapter to enrich the learning experience.', color: 'var(--cyan)' },
  { icon: '🚀', title: 'One-Click Publish', desc: 'Instantly publish your course and share it with the world. Full control over visibility.', color: 'var(--violet)' },
  { icon: '📊', title: 'Course Analytics', desc: 'Track your course performance with detailed analytics on views, engagement, and more.', color: 'var(--amber)' },
]

const TECH = [
  { name: 'Next.js 15', color: '#fff' },
  { name: 'React 18', color: '#61dafb' },
  { name: 'Gemini AI', color: '#4285f4' },
  { name: 'Clerk Auth', color: '#6c47ff' },
  { name: 'NeonDB', color: '#00e5b4' },
  { name: 'Drizzle ORM', color: '#c5f74f' },
  { name: 'Firebase', color: '#ffca28' },
  { name: 'Tailwind CSS', color: '#38bdf8' },
]

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', overflowX: 'hidden' }}>
      {/* Orb background */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)', animation: 'orb1 18s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(182,109,255,0.06) 0%, transparent 70%)', animation: 'orb2 22s ease-in-out infinite' }} />
      </div>

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 40px',
        background: 'rgba(8,12,18,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg, #00e5ff, #0066ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>✦</div>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#f0f4f8' }}>CourseForge <span style={{ color: '#00e5ff' }}>AI</span></span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/sign-in">
            <button style={{ padding: '9px 22px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border2)', borderRadius: 50, color: 'var(--text2)', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Outfit', transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)' }}
              onMouseOut={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.borderColor = 'var(--border2)' }}>
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="btn-primary" style={{ padding: '9px 22px', fontSize: 13 }}>
              Get Started Free
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 80px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 24, animation: 'fadeUp 0.5s ease' }}>
          <span className="tag-badge">✦ Powered by Google Gemini AI</span>
        </div>

        <h1 style={{ fontSize: 'clamp(40px, 8vw, 84px)', fontWeight: 700, lineHeight: 1.05, marginBottom: 24, letterSpacing: '-2.5px', maxWidth: 900, animation: 'fadeUp 0.5s 0.1s ease both' }}>
          Generate Complete<br />
          <span className="grad-text">AI-Powered Courses</span><br />
          in Seconds
        </h1>

        <p style={{ fontSize: 18, color: 'var(--text2)', maxWidth: 560, marginBottom: 40, lineHeight: 1.7, animation: 'fadeUp 0.5s 0.2s ease both' }}>
          Transform any topic into a structured, professional online course — complete with chapters, descriptions, video links, and more.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp 0.5s 0.3s ease both' }}>
          <Link href="/sign-up">
            <button className="btn-primary" style={{ padding: '15px 40px', fontSize: 16 }}>
              Start Generating — Free ✦
            </button>
          </Link>
          <Link href="/sign-in">
            <button style={{ padding: '15px 32px', fontSize: 15, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border2)', borderRadius: 50, color: 'var(--text2)', cursor: 'pointer', fontFamily: 'Outfit', fontWeight: 600, transition: 'all 0.3s' }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)'; e.currentTarget.style.color = 'var(--text)' }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text2)' }}>
              Sign In →
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 48, marginTop: 72, flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp 0.5s 0.4s ease both' }}>
          {[{ n: '80%', l: 'Faster content creation' }, { n: '25K+', l: 'Courses generated' }, { n: '40%', l: 'Better data retrieval' }].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--cyan)', letterSpacing: '-1px' }}>{s.n}</div>
              <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '100px 40px', position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="tag-badge" style={{ marginBottom: 16, display: 'inline-flex' }}>Features</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-1.5px' }}>
            Everything you need to build <span style={{ color: 'var(--cyan)' }}>& launch</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="glass-card" style={{ padding: 28 }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: f.color }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section style={{ padding: '60px 40px 100px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: 'var(--text3)', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 24 }}>
          Built with production-grade stack
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', maxWidth: 700, margin: '0 auto 60px' }}>
          {TECH.map(t => (
            <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 50, padding: '8px 18px' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: t.color }}>{t.name}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 16 }}>
            Ready to build your <span className="grad-text">first course?</span>
          </h2>
          <p style={{ color: 'var(--text2)', marginBottom: 28, fontSize: 15 }}>
            Join educators and creators using CourseForge AI. No credit card required.
          </p>
          <Link href="/sign-up">
            <button className="btn-primary" style={{ padding: '15px 48px', fontSize: 16 }}>
              Start for Free — No Credit Card
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 40px', position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: 'linear-gradient(135deg, #00e5ff, #0066ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>✦</div>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>CourseForge AI</span>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text3)' }}>Built with Next.js 15 · Google Gemini · NeonDB · Clerk · Firebase</p>
      </footer>
    </div>
  )
}
